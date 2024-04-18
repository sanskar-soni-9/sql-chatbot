"use client";
import ChatsContext, { structChat } from "@/contexts/chatsContext";
import { ReactNode, useState } from "react";

const ContextWrapper = ({ children }: { children: ReactNode }) => {
  const [chats, setChats] = useState<structChat[]>([]);
  const updateChats = (chat: structChat[]) => {
    setChats([...chat]);
  };

  const value = { chats, updateChats };

  return (
    <ChatsContext.Provider value={value}>{children}</ChatsContext.Provider>
  );
};

export default ContextWrapper;
