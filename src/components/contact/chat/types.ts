
// Define types for the chat feature
export type MessageType = "user" | "bot";

export interface Message {
  id: number;
  type: MessageType;
  text: string;
  timestamp: Date;
}
