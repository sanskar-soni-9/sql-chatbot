"use client";

import Image from "next/image";
import { useState } from "react";

const ChatPage = () => {
  const [question, setQuestion] = useState("");

  return (
    <div className="w-full h-full">
      <main className="container mx-auto h-full flex flex-col items-center gap-4 bg-secondary/50">
        <div className="h-full"></div>
        <div className="flex items-center ps-6 pe-3 bg-transparent resize-none rounded-xl border-2 border-border mb-8 min-h-16 min-w-[300px] sm:min-w-[600px] md:min-w-[700px] lg:w-[700px] xl:[w-[800px]]">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="border-2 ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring text-md flex w-full resize-none rounded-md border-none bg-transparent py-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 h-[40px]"
            autoFocus
            placeholder="Ask for SQL query."
          />
          <div className="hover:opacity-50 cursor-pointer bg-light/90 rounded-md p-0.5">
            <Image
              src="/icons/airplane-icon.svg"
              alt="send icon"
              width={25}
              height={25}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
