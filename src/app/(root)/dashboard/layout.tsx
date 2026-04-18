import Header from "@/components/layout/Header";
import QueryProvider from "./QueryProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Designspo - Dashboard",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <QueryProvider>{children}</QueryProvider>
    </>
  );
}
