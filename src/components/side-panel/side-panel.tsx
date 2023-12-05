"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ConfigurationContext,
  SetConfigurationContext,
} from "@/contexts/configuration/configuration-context";
import { Settings } from "lucide-react";
import { useContext } from "react";
import { ConfigSelector } from "../config-selector/config-selector";

export interface Props {
  title: string;
}

export const SidePanel = ({ title }: Props) => {
  const configuration = useContext(ConfigurationContext);
  const setConfiguration = useContext(SetConfigurationContext);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Settings className="h-4 w-4" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>
            {/* Right Sidebar */}
            <div className="container h-full py-6 ">
              <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
                <div className="hidden flex-col space-y-4 sm:flex md:order-2">
                  <ConfigSelector
                    defaultValue={[configuration.temperature]}
                    max={1}
                    min={0}
                    step={0.1}
                    label="Temperature"
                    onValueChange={(value) =>
                      setConfiguration?.({
                        ...configuration,
                        temperature: value[0],
                      })
                    }
                  />
                  <ConfigSelector
                    defaultValue={[configuration.maxLenght]}
                    max={1000}
                    min={0}
                    step={1}
                    label="Max Lenght"
                    onValueChange={(value) =>
                      setConfiguration?.({
                        ...configuration,
                        maxLenght: value[0],
                      })
                    }
                  />
                  <ConfigSelector
                    defaultValue={[configuration.frequencyPenalty]}
                    max={2}
                    min={-2}
                    step={0.1}
                    label="Frequency Penalty"
                    onValueChange={(value) =>
                      setConfiguration?.({
                        ...configuration,
                        frequencyPenalty: value[0],
                      })
                    }
                  />
                  <ConfigSelector
                    defaultValue={[configuration.presencePenalty]}
                    max={2}
                    min={-2}
                    step={0.1}
                    label="Presence Penalty"
                    onValueChange={(value) =>
                      setConfiguration?.({
                        ...configuration,
                        presencePenalty: value[0],
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
