"use client";

import { Message } from "@/components/message/message";
import { type Message as AiMessage } from "ai";
import { useEffect, useRef } from "react";

export interface Props {
  messages: AiMessage[];
}

export const Messages: React.FC<Props> = ({ messages }: Props) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef?.current?.scrollIntoView();
  }, [messages]);

  return (
    <div className="pt-8">
      {messages.length === 0 ? (
        <div className="mx-auto max-w-2xl px-4 bg-background p-8 text-center">
          Escribe algo abajo para empezar a dialogar con Open AI API
        </div>
      ) : (
        messages.map((message: AiMessage) => (
          <Message key={message.id} message={message} />
        ))
      )}
      <div className="p-0 m-0" ref={bottomRef} />
    </div>
  );
};
