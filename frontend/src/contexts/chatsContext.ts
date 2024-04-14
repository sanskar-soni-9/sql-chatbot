import { createContext } from "react";

export interface structChat {
  id: string;
  messages:
    | {
        owner: "user" | "model";
        message: string;
      }[]
    | null;
}

interface chatsContextValue {
  chats: structChat[] | null;
  updateChats: (chats: structChat[]) => void;
}

const value = { chats: null, updateChats: () => {} };
const ChatsContext = createContext<chatsContextValue>(value);

export default ChatsContext;
