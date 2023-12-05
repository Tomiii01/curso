"use client";
import { Dispatch, SetStateAction, createContext, useState } from "react";

type Configuration = {
  temperature: number;
  maxLenght: number;
  frequencyPenalty: number;
  presencePenalty: number;
};

export const ConfigurationContext = createContext<Configuration>({
  temperature: 0.8,
  maxLenght: 256,
  frequencyPenalty: 0,
  presencePenalty: 0,
});

export const SetConfigurationContext = createContext<Dispatch<
  SetStateAction<Configuration>
> | null>(null);

interface Props {
  children: React.ReactNode;
}

export function ConfigurationContextProvider({ children }: Props) {
  const [configuration, setConfiguration] = useState<Configuration>({
    temperature: 0.8,
    maxLenght: 256,
    frequencyPenalty: 0,
    presencePenalty: 0,
  });

  return (
    <SetConfigurationContext.Provider value={setConfiguration}>
      <ConfigurationContext.Provider value={configuration}>
        {children}
      </ConfigurationContext.Provider>
    </SetConfigurationContext.Provider>
  );
}
