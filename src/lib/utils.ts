import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function urlParse(url: string) {
  if (url.slice(0, 8) != "https://" && url.slice(0, 7) != "http://") {
    url = "https://" + url;
  }
  return url;
}
