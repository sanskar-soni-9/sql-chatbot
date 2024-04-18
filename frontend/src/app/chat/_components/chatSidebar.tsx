import SecondaryButton from "@/components/SecondaryButton";
import { structChat } from "@/contexts/chatsContext";
import Link from "next/link";
import { FC } from "react";

interface ChatSideBarProps {
  chats: structChat[];
}

const ChatSideBar: FC<ChatSideBarProps> = ({ chats }) => {
  return (
    <nav className="w-[20%] px-2 py-4 flex flex-col gap-3">
      <SecondaryButton isLink href="/chat">
        + New Chat
      </SecondaryButton>
      {chats.map(({ id, title }) => (
        <Link
          key={id}
          href={`/chat/${id}`}
          className="hover:opacity-75 text-center"
        >
          {title}
        </Link>
      ))}
    </nav>
  );
};

export default ChatSideBar;
