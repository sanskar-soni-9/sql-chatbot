"use client";
import ChatsContext, { messageInterface } from "@/contexts/chatsContext";
import {
  getChat,
  getChats,
  getQuery,
  updateTitle,
} from "@/utils/backend-utils";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
  KeyboardEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ChatSideBar from "./_components/chatSidebar";

const ChatPage = () => {
  const router = useRouter();

  const [question, setQuestion] = useState("");
  const [chatIndex, setChatIndex] = useState(-1);
  const [messages, setMessages] = useState<messageInterface[]>([]);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const { chats, updateChats } = useContext(ChatsContext);

  const { chatId } = useParams();

  const bottomRef = useRef<HTMLDivElement>(null);

  const titleChangedRef = useRef(false);

  const getAndSetChatsMetadata = useCallback(async () => {
    const res = await getChats();
    if (!res) return;
    const resChats = res.data.map(({ id, title }) => ({
      id,
      title,
      messages: [],
    }));
    updateChats([...resChats]);
  }, [updateChats]);

  const getAndSetChatHistory = useCallback(async () => {
    if (chatId && typeof chatId === "string") {
      const chat = await getChat(chatId);
      if (!chat) return;
      const updatedChats = [...(chats || [])];
      const messages: messageInterface[] = [];
      chat.data.reverse().forEach(({ question, response }) => {
        messages.push({ owner: "user", message: question });
        messages.push({ owner: "model", message: response });
      });

      const chatIndex = updatedChats.findIndex(({ id }) => id === chat.chatId);
      if (chatIndex < 0) return;
      setChatIndex(chatIndex);

      updatedChats[chatIndex].messages = messages;
      updateChats([...updatedChats]);
      setMessages([...updatedChats[chatIndex].messages]);
    }
  }, [chatId, chats, updateChats]);

  useEffect(() => {
    if (!chats.length) {
      getAndSetChatsMetadata();
    } else {
      const chatIndex = chats.findIndex(({ id }) => id === chatId);

      if (chatIndex === -1 && typeof chatId === "string") {
        const updatedChats = [...chats];
        updatedChats.push({ id: chatId, title: "Chat", messages: [] });
        updateChats([...updatedChats]);
        getAndSetChatHistory();
      } else if (chatIndex > -1 && !chats[chatIndex].messages.length)
        getAndSetChatHistory();

      setMessages(chatIndex === -1 ? [] : [...chats[chatIndex].messages]);
      setChatIndex(chatIndex);
    }
  }, [
    chatId,
    chats,
    getAndSetChatsMetadata,
    getAndSetChatHistory,
    updateChats,
  ]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [messages]);

  const handleTextSubmit = useCallback(async () => {
    if (!chats) return;
    setQuestion("");
    const updatedChats = [...chats];
    if (chatIndex > -1) {
      updatedChats[chatIndex].messages.push({
        owner: "user",
        message: question,
      });
      updateChats([...updatedChats]);
    }

    const res = await getQuery({
      msg: question,
      chatId: typeof chatId === "string" ? chatId : "",
    });

    if (!chatId) router.push(`/chat/${res.chatId}`);
    if (chatIndex > -1) {
      updatedChats[chatIndex].messages.push({
        owner: "model",
        message: res.data,
      });
      updateChats([...updatedChats]);
    }
  }, [question, chatId, router, chats, chatIndex, updateChats]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && e.ctrlKey) handleTextSubmit();
    },
    [handleTextSubmit],
  );

  const handleTitleChange = useCallback(
    async (newTitle: string) => {
      const updatedChats = [...chats];
      updatedChats[chatIndex].title = newTitle;
      updateChats(updatedChats);
      titleChangedRef.current = true;
    },
    [chatIndex, chats, updateChats],
  );

  const updateChatTitle = useCallback(async () => {
    if (typeof chatId === "string")
      await updateTitle(chatId, chats[chatIndex].title);
  }, [chatId, chatIndex, chats]);

  const openSideBar = useCallback(() => {
    setIsSideBarOpen(true);
  }, []);

  const closeSideBar = useCallback(() => {
    setIsSideBarOpen(false);
  }, []);

  return (
    <div className="w-full h-full text-sm flex">
      <ChatSideBar
        chats={chats}
        isOpen={isSideBarOpen}
        closeSideBar={closeSideBar}
      />
      <main className="relative container mx-auto pt-3 w-full h-full flex flex-col items-center gap-4 bg-secondary/50">
        <div className="w-full px-5 flex items-center justify-between gap-4">
          <div
            className="lg:hidden top-5 left-5 cursor-pointer"
            onClick={openSideBar}
          >
            <Image
              src="/icons/hamburger-icon.svg"
              alt="menu icon"
              width={20}
              height={20}
            />
          </div>

          {chats.length && chatIndex > -1 ? (
            <div className="w-full">
              <input
                type="text"
                value={chats[chatIndex].title}
                onChange={(e) => handleTitleChange(e.target.value)}
                onBlur={() => updateChatTitle()}
                onKeyDown={(e) => (e.key === "Enter" ? updateChatTitle() : "")}
                className="w-full sm:w-1/2 max-w-[360px] mx-auto border-border ring-offset-primary placeholder:text-muted-foreground focus:none flex h-10 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-md border bg-primary px-4 py-2"
              />
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="w-8/12 h-full pt-5 overflow-y-scroll no-scrollbar text-xs">
          {messages.map(({ owner, message }, index) => (
            <div
              key={index}
              className="shrink-0 flex items-start gap-2 sm:gap-4 mb-6"
            >
              <div className="shrink-0 p-2 rounded-full bg-action">
                <Image
                  src={`/icons/${owner}-icon.svg`}
                  alt={`${owner} icon`}
                  width={14}
                  height={14}
                />
              </div>
              <p className="p-1">{message}</p>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <div className="flex items-center ps-4 pe-3 py-2 bg-transparent resize-none rounded-xl border-2 border-border mb-8 h-12 w-9/12 text-sm">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="border-2 ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring text-md flex w-full resize-none rounded-md border-none bg-transparent py-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 h-[40px] no-scrollbar"
            autoFocus
            placeholder="Ask for SQL query."
            onKeyDown={handleKeyDown}
          />
          <div
            className="hover:opacity-50 cursor-pointer bg-light/90 rounded-md p-0.5"
            onClick={handleTextSubmit}
          >
            <Image
              src="/icons/airplane-icon.svg"
              alt="send icon"
              width={22}
              height={22}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
