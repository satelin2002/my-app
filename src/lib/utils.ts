import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function absoluteUrl(path: string) {
  const nextPublicAppUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (!nextPublicAppUrl || nextPublicAppUrl.length === 0) {
    throw new Error("Missing NEXT_PUBLIC_APP_URL");
  }
  return `${nextPublicAppUrl}${path}`;
}
