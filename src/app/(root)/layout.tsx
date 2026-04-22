import { Header } from "@/components/header";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-hidden">
      <Header />
      {children}
    </div>
  );
}

export default layout;
