import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import { searchParams } from "./types/types";

export default function Home({ searchParams }: searchParams) {
  return (
    <div className="">
      <Dashboard searchParams={searchParams} />
    </div>
  );
}
