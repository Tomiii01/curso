"use client";

import { Button } from "@/components/button/button";
import { Messages } from "@/components/messages/messages";
import { PromptForm } from "@/components/prompt-form/prompt-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ConfigurationContext } from "@/contexts/configuration/configuration-context";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import { useChat } from "ai/react";
import { useContext, useEffect, useState } from "react";

export default function Chat() {
  const [token, setToken] = useLocalStorage<string | null>("ai-token", null);
  const [tokenDialog, setTokenDialog] = useState<boolean>(
    token === null ? true : false
  );
  const [tokenInput, settokenInput] = useState(token ?? "");
  const { messages, handleSubmit, input, setInput, isLoading } = useChat({
    body: {
      token,
    },
  });
  const configuration = useContext(ConfigurationContext);

  useEffect(() => {
    setTokenDialog(token === null ? true : false);
  }, [token]);

  return (
    <>
      <main className="flex-1">
        <div>
          <div className="flex-1 overflow-y-auto">
            <Messages messages={messages} />
          </div>
          <div className="fixed inset-x-0 bottom-0 bg-gradient-to-b from-muted/10 from-10% to-muted/30 to-50%">
            <div className="mx-auto sm:max-w-2xl sm:px-4">
              <div className="space-y-4 bg-background px-4 py-2 shadow-lg sm:rounded-t-xl md:py-4">
                <PromptForm
                  onSubmit={async (e) =>
                    await handleSubmit(e, {
                      options: {
                        body: {
                          token,
                          configuration,
                        },
                      },
                    })
                  }
                  input={input}
                  setInput={setInput}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      {token === null ? (
        <div className="mx-auto max-w-2xl px-4 p-8 text-center">
          <Button
            onClick={() => {
              setTokenDialog(true);
            }}
          >
            Configurar Token OpenAI
          </Button>
        </div>
      ) : (
        ""
      )}
      <Dialog open={tokenDialog} onOpenChange={setTokenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ingresar OpenAI API Key</DialogTitle>
            <DialogDescription>
              No hemos encontrado una key para usar OpenAI. El token solo será
              guardado en la memoria de tu dispositivo.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={tokenInput}
            placeholder="OpenAI API key"
            onChange={(e) => settokenInput(e.target.value)}
          />
          <DialogFooter className="items-center">
            <Button
              onClick={() => {
                setToken(tokenInput);
                setTokenDialog(false);
              }}
            >
              Guardar Token
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
