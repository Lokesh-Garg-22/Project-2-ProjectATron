import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge<string, string>({
  extend: {
    classGroups: {
      "bg-image": [{ bg: ["create-img"] }],
      "bg-position": [
        { bg: [(classPart: string) => /(\d)+%(_(\d)+%)*/.test(classPart)] },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function urlParse(url: string) {
  if (url.slice(0, 8) != "https://" && url.slice(0, 7) != "http://") {
    url = "https://" + url;
  }
  return url;
}
