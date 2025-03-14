import Image from "next/image";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";

export default function Home() {
  return (
    <div className="h-screen overflow-hidden">
      <Header />
      <Dashboard />
    </div>
  );
}
