import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalizeFirstLetter = (text: string): string => {
  if (!text) return text; // handle empty or null strings
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const getRandomNumber = (): number => {
  const min = 2.9;
  const max = 4.5;
  const random = Math.random() * (max - min) + min;
  return Math.round(random * 10) / 10;
};
