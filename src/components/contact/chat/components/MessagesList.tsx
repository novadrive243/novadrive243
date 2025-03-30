
import React from 'react';
import { Message } from '../types';

interface MessagesListProps {
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

/**
 * Component to display the list of chat messages
 */
export const MessagesList: React.FC<MessagesListProps> = ({ 
  messages, 
  messagesEndRef 
}) => {
  return (
    <div className="flex flex-col space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.type === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[80%] rounded-lg p-3 ${
              message.type === "user"
                ? "bg-nova-gold text-nova-black"
                : "bg-nova-gray/30 text-nova-white"
            }`}
          >
            <p>{message.text}</p>
            <p className="text-xs opacity-70 mt-1">
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};
