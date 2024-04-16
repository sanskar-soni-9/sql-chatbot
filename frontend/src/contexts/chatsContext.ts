import { createContext } from "react";

export interface messageInterface {
  owner: "user" | "model";
  message: string;
}

export interface structChat {
  id: string;
  messages: messageInterface[];
}

interface chatsContextValue {
  chats: structChat[];
  updateChats: (chats: structChat[]) => void;
}

const value = { chats: [], updateChats: () => {} };
const ChatsContext = createContext<chatsContextValue>(value);

export default ChatsContext;
