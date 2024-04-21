import SecondaryButton from "@/components/SecondaryButton";
import { structChat } from "@/contexts/chatsContext";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface ChatSideBarProps {
  chats: structChat[];
  isOpen: boolean;
  closeSideBar: () => void;
}

const ChatSideBar: FC<ChatSideBarProps> = ({ chats, isOpen, closeSideBar }) => {
  return (
    <nav
      className={`absolute z-50 lg:relative lg:flex lg:w-[20%] w-11/12 px-2 py-4 flex-col gap-3 bg-primary h-full ${isOpen ? "flex" : "hidden"}`}
    >
      <div className="flex items-center gap-2 w-full">
        <div className="w-full">
          <SecondaryButton isLink href="/chat">
            + New Chat
          </SecondaryButton>
        </div>
        <div
          className={`${isOpen ? "block" : "hidden"} lg:hidden cursor-pointer`}
          onClick={closeSideBar}
        >
          <Image
            src="/icons/close-icon.svg"
            alt="close icon"
            width={25}
            height={25}
          />
        </div>
      </div>
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
