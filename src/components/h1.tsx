import { ChildrenProps } from "@/lib/types";

export default function H1({ children }: ChildrenProps) {
  return (
    <h1 className="text-3xl lg:text-6xl font-bold tracking-tight">{children}</h1>
  )
}
