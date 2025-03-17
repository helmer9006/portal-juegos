import { ReactNode } from "react";

interface GamesLayoutProps {
  children: ReactNode;
}

export default function GamesLayout({ children }: GamesLayoutProps) {
  return <div>{children}</div>;
}
