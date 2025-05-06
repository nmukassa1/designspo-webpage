import Header from "@/app/components/Header";
import Provider from "./Provider";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Provider>
        <Header />
        {children}
      </Provider>
    </>
  );
}
