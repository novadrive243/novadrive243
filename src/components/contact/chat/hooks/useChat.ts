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
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);
  
  useEffect(() => {
    const createThread = async () => {
      try {
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

  const getAssistantResponse = useCallback(async (userMessage: string): Promise<string> => {
    const cachedResponse = cachedResponsesRef.current.get(userMessage);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    if (useFallback || !threadIdRef.current || !ASSISTANT_ID) {
      const fallback = getFallbackResponse(userMessage);
      cachedResponsesRef.current.set(userMessage, fallback);
      return fallback;
    }
    
    try {
      setIsLoading(true);
      
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();
      
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
      
      let runStatus = 'queued';
      while (runStatus !== 'completed' && runStatus !== 'failed' && runStatus !== 'cancelled') {
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
      
      cachedResponsesRef.current.set(userMessage, botResponse);
      
      return botResponse;
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Error calling OpenAI Assistant API:', error);
        
        setUseFallback(true);
        
        toast({
          title: language === 'fr' ? "Mode hors ligne activé" : "Offline mode activated",
          description: language === 'fr' 
            ? "L'assistant est passé en mode local. Les réponses sont préprogrammées." 
            : "The assistant has switched to local mode. Responses are pre-programmed.",
          variant: "destructive",
        });
        
        const fallbackResponse = getFallbackResponse(userMessage);
        
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
    
    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      text: inputValue.trim(),
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    
    const processingBotMessage: Message = {
      id: messages.length + 2,
      type: "bot",
      text: language === 'fr' ? "..." : "...",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, processingBotMessage]);
    
    try {
      const assistantResponse = await getAssistantResponse(userMessage.text);
      
      setMessages((prev) => 
        prev.map(msg => 
          msg.id === processingBotMessage.id 
            ? { ...msg, text: assistantResponse } 
            : msg
        )
      );
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Error getting OpenAI Assistant response:', error);
        
        const fallbackResponse = getFallbackResponse(userMessage.text);
        
        setMessages((prev) => 
          prev.map(msg => 
            msg.id === processingBotMessage.id 
              ? { ...msg, text: fallbackResponse } 
              : msg
          )
        );
        
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
    
    const processingBotMessage: Message = {
      id: messages.length + 2,
      type: "bot",
      text: language === 'fr' ? "..." : "...",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, processingBotMessage]);
    
    try {
      const assistantResponse = await getAssistantResponse(text);
      
      setMessages((prev) => 
        prev.map(msg => 
          msg.id === processingBotMessage.id 
            ? { ...msg, text: assistantResponse } 
            : msg
        )
      );
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Error getting OpenAI Assistant response:', error);
        
        const fallbackResponse = getFallbackResponse(text);
        
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
