import { ChildrenProps } from "@/lib/types";
import { twMerge } from "tailwind-merge";
type H1Props = {
  className: string;
} & ChildrenProps
export default function H1({ className, children }: H1Props) {
  return (
    <h1 className={twMerge("text-3xl lg:text-6xl font-bold tracking-tight", className)}>{children}</h1>
  )
}
