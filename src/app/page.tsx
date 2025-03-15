import Image from "next/image";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import { searchParams } from "./types/types";

export default function Home({ searchParams }: searchParams) {
  
  return (
    <div className="h-screen overflow-hidden">
      <Header />
      <Dashboard searchParams={searchParams} />
    </div>
  );
}
