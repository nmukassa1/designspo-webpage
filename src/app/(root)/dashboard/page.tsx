import Dashboard from "../../components/Dashboard";
import { searchParams } from "../../types/types";

export default function DashboardPage({ searchParams }: searchParams) {
  return (
    <div className="">
      <Dashboard searchParams={searchParams} />
    </div>
  );
}
