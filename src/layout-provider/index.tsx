"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Public from "./public";
import Private from "./private";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.includes("/auth")) {
    return <Public>{children}</Public>;
  }
  return <Private>{children}</Private>;
}

export default LayoutProvider;
