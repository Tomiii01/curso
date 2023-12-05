import { UseChatHelpers } from "ai/react";
import * as React from "react";
import Textarea from "react-textarea-autosize";

import { Button } from "@/components/button/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SendHorizontal } from "lucide-react";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export interface PromptProps
  extends Pick<UseChatHelpers, "input" | "setInput"> {
  onSubmit: (value: FormEvent<HTMLFormElement>) => Promise<void>;
  isLoading: boolean;
}

export function PromptForm({
  onSubmit,
  input,
  setInput,
  isLoading,
}: PromptProps) {
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (!input?.trim()) {
          return;
        }
        setInput("");
        await onSubmit(e);
      }}
    >
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12">
        <Textarea
          ref={inputRef}
          tabIndex={0}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enviar un mensaje"
          spellCheck={false}
          className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
        />
        <div className="absolute right-0 top-4 sm:right-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || input === ""}
              >
                <SendHorizontal />
                <span className="sr-only">Enviar Mensaje</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Enviar Mensaje</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </form>
  );
}
