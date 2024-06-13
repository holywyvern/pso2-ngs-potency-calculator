import { createContext, useContext, useState } from "react";

export interface ClipboardState {
  augments: number[] | null;
  copyAugments(augments: number[]): void;
}

export function useClipboardState() {
  const [augments, setAugments] = useState<number[] | null>(null);
  const copyAugments = (augments: number[]) => {
    setAugments(augments);
  };
  return { augments, copyAugments } satisfies ClipboardState;
}

export const ClipboardContext = createContext<ClipboardState | null>(null);

export function useClipboard() {
  return useContext(ClipboardContext)!;
}
