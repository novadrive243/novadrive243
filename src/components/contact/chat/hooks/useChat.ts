import { useState, useRef, useCallback, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { Message } from '../types';
import { ASSISTANT_ID, OPENAI_API_KEY, USE_FALLBACK_BY_DEFAULT } from '../constants';
import { useFallbackResponses } from './useFallbackResponses';

/**
 * A hook to manage chat functionality with OpenAI Assistant
 * 
 * @param language Current language ('fr' or 'en')
 * @returns Chat state and functions
 */
export const useChat = (language: 'fr' | 'en') => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      text: language === 'fr' 
        ? 'Bonjour! Comment puis-je vous aider aujourd\'hui?' 
        : 'Hello! How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const cachedResponsesRef = useRef<Map<string, string>>(new Map());
  const threadIdRef = useRef<string | null>(null);
  const [useFallback, setUseFallback] = useState(USE_FALLBACK_BY_DEFAULT);
  
  const { getFallbackResponse } = useFallbackResponses(language);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Cancel ongoing API calls when component unmounts
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);
  
  // Initialize thread when component mounts
  useEffect(() => {
    const createThread = async () => {
      try {
        // Don't try to create a thread if we're in fallback mode
        if (useFallback) return;
        
        const response = await fetch('https://api.openai.com/v1/threads', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'OpenAI-Beta': 'assistants=v2'  // Updated to v2
          },
          body: JSON.stringify({})
        });
        
        if (!response.ok) {
          console.error(`Failed to create thread: ${response.status}`);
          setUseFallback(true);
          return;
        }
        
        const data = await response.json();
        threadIdRef.current = data.id;
        console.log('Thread created:', threadIdRef.current);
      } catch (error) {
        console.error('Error creating thread:', error);
        setUseFallback(true);
        toast({
          title: language === 'fr' ? "Mode hors ligne" : "Offline mode",
          description: language === 'fr' 
            ? "Assistant en mode local. Les réponses sont préprogrammées." 
            : "Assistant in local mode. Responses are pre-programmed.",
          variant: "destructive",
        });
      }
    };
    
    createThread();
  }, [language, useFallback]);

  // Get response from OpenAI Assistant
  const getAssistantResponse = useCallback(async (userMessage: string): Promise<string> => {
    // Check cache first
    const cachedResponse = cachedResponsesRef.current.get(userMessage);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // If we're in fallback mode, return a fallback response directly
    if (useFallback || !threadIdRef.current || !ASSISTANT_ID || ASSISTANT_ID === "asst_YOUR_ASSISTANT_ID_HERE") {
      const fallback = getFallbackResponse(userMessage);
      cachedResponsesRef.current.set(userMessage, fallback);
      return fallback;
    }
    
    try {
      setIsLoading(true);
      
      // Cancel any ongoing API calls
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();
      
      // 1. Add the user message to the thread
      const messageResponse = await fetch(`https://api.openai.com/v1/threads/${threadIdRef.current}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'OpenAI-Beta': 'assistants=v2'  // Updated to v2
        },
        body: JSON.stringify({
          role: 'user',
          content: userMessage
        }),
        signal: abortControllerRef.current.signal
      });
      
      if (!messageResponse.ok) {
        throw new Error(`Failed to add message: ${messageResponse.status}`);
      }
      
      // 2. Run the assistant on the thread
      const runResponse = await fetch(`https://api.openai.com/v1/threads/${threadIdRef.current}/runs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'OpenAI-Beta': 'assistants=v2'  // Updated to v2
        },
        body: JSON.stringify({
          assistant_id: ASSISTANT_ID
        }),
        signal: abortControllerRef.current.signal
      });
      
      if (!runResponse.ok) {
        const errorData = await runResponse.json();
        console.error('Run assistant error:', errorData);
        throw new Error(`Failed to run assistant: ${runResponse.status}`);
      }
      
      const runData = await runResponse.json();
      const runId = runData.id;
      
      // 3. Poll for the run completion
      let runStatus = 'queued';
      while (runStatus !== 'completed' && runStatus !== 'failed' && runStatus !== 'cancelled') {
        // Wait for 1 second before polling again
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const statusResponse = await fetch(`https://api.openai.com/v1/threads/${threadIdRef.current}/runs/${runId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'OpenAI-Beta': 'assistants=v2'  // Updated to v2
          },
          signal: abortControllerRef.current.signal
        });
        
        if (!statusResponse.ok) {
          throw new Error(`Failed to get run status: ${statusResponse.status}`);
        }
        
        const statusData = await statusResponse.json();
        runStatus = statusData.status;
        
        if (runStatus === 'failed') {
          throw new Error("Assistant run failed");
        }
        
        if (runStatus === 'cancelled') {
          throw new Error("Assistant run was cancelled");
        }
      }
      
      // 4. Get the latest messages
      const messagesResponse = await fetch(`https://api.openai.com/v1/threads/${threadIdRef.current}/messages?limit=1`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'OpenAI-Beta': 'assistants=v2'  // Updated to v2
        },
        signal: abortControllerRef.current.signal
      });
      
      if (!messagesResponse.ok) {
        throw new Error(`Failed to get messages: ${messagesResponse.status}`);
      }
      
      const messagesData = await messagesResponse.json();
      const latestMessage = messagesData.data.find(msg => msg.role === 'assistant');
      
      if (!latestMessage) {
        throw new Error("No assistant message found");
      }
      
      const botResponse = latestMessage.content[0].text.value;
      
      // Cache the response
      cachedResponsesRef.current.set(userMessage, botResponse);
      
      return botResponse;
    } catch (error) {
      // Only display error if not aborted
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Error calling OpenAI Assistant API:', error);
        
        // Set fallback mode for future messages
        setUseFallback(true);
        
        // Show toast notification about switching to fallback mode
        toast({
          title: language === 'fr' ? "Mode hors ligne activé" : "Offline mode activated",
          description: language === 'fr' 
            ? "L'assistant est passé en mode local. Les réponses sont préprogrammées." 
            : "The assistant has switched to local mode. Responses are pre-programmed.",
          variant: "destructive",
        });
        
        // Get a fallback response
        const fallbackResponse = getFallbackResponse(userMessage);
        
        // Cache it
        cachedResponsesRef.current.set(userMessage, fallbackResponse);
        
        return fallbackResponse;
      }
      throw error;
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  }, [language, useFallback, getFallbackResponse]);
  
  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      text: inputValue.trim(),
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    
    // Processing indicator
    const processingBotMessage: Message = {
      id: messages.length + 2,
      type: "bot",
      text: language === 'fr' ? "..." : "...",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, processingBotMessage]);
    
    try {
      // Get response from OpenAI Assistant
      const assistantResponse = await getAssistantResponse(userMessage.text);
      
      // Update the processing message with the actual response
      setMessages((prev) => 
        prev.map(msg => 
          msg.id === processingBotMessage.id 
            ? { ...msg, text: assistantResponse } 
            : msg
        )
      );
    } catch (error) {
      // Only handle if not aborted
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Error getting OpenAI Assistant response:', error);
        
        // Use fallback response if OpenAI Assistant fails
        const fallbackResponse = getFallbackResponse(userMessage.text);
        
        // Update the processing message with the fallback response
        setMessages((prev) => 
          prev.map(msg => 
            msg.id === processingBotMessage.id 
              ? { ...msg, text: fallbackResponse } 
              : msg
          )
        );
        
        // Show toast notification about the issue
        toast({
          title: language === 'fr' ? "Problème de connexion" : "Connection issue",
          description: language === 'fr' 
            ? "Nous utilisons actuellement des réponses préprogrammées en raison d'un problème technique." 
            : "We're currently using pre-programmed responses due to a technical issue.",
          variant: "destructive",
        });
      }
    }
  }, [inputValue, messages, language, getAssistantResponse, getFallbackResponse]);
  
  const handleQuickReply = useCallback(async (text: string) => {
    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      text: text,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    
    // Processing indicator
    const processingBotMessage: Message = {
      id: messages.length + 2,
      type: "bot",
      text: language === 'fr' ? "..." : "...",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, processingBotMessage]);
    
    try {
      // Get response from OpenAI Assistant
      const assistantResponse = await getAssistantResponse(text);
      
      // Update the processing message with the actual response
      setMessages((prev) => 
        prev.map(msg => 
          msg.id === processingBotMessage.id 
            ? { ...msg, text: assistantResponse } 
            : msg
        )
      );
    } catch (error) {
      // Only handle if not aborted
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Error getting OpenAI Assistant response:', error);
        
        // Use fallback response if OpenAI Assistant fails
        const fallbackResponse = getFallbackResponse(text);
        
        // Update the processing message with the fallback response
        setMessages((prev) => 
          prev.map(msg => 
            msg.id === processingBotMessage.id 
              ? { ...msg, text: fallbackResponse } 
              : msg
          )
        );
      }
    }
  }, [messages, language, getAssistantResponse, getFallbackResponse]);

  return {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    messagesEndRef,
    handleSendMessage,
    handleQuickReply,
    useFallback
  };
};
