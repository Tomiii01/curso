"use client";
import { type Message as AiMessage } from "ai";
import clsx from "clsx";
import { format } from "date-fns";
import { Bot, UserCircle } from "lucide-react";

export interface Props {
  message: AiMessage;
}

export const Message: React.FC<Props> = ({ message }: Props) => {
  const isUser = message.role === "user";
  const container = clsx("flex gap-3 p-2", isUser && "justify-end");
  const avatar = clsx(isUser && "order-2");
  const body = clsx("flex flex-col gap-2", isUser && "items-end");

  return (
    <div className={container}>
      <div className={avatar}>
        <span className="relative inline-block">
          <div className="h-10 w-10 relative">
            {isUser ? <UserCircle /> : <Bot />}
          </div>
          <span className="absolute right-0 top-0 block h-2.5 w-2.5 rounded-full  bg-primary  ring-2 ring-white" />
        </span>
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">{message.role}</div>
          <div className="text-xs text-gray-400">
            {message.createdAt ? format(message.createdAt, "HH:mm") : ""}
          </div>
        </div>
        <div
          className={clsx(
            "relative ml-3 text-sm py-2 px-4 border bg-card text-card-foreground shadow-sm rounded-xl"

            //isUser ? "bg-white" : "bg-indigo-100"
          )}
        >
          <div>{message.content}</div>
        </div>
      </div>
    </div>
  );
};
