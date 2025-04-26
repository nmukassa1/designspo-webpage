import { searchParams } from "../types/types";
import Collections from "./Collections";
import Sidebar from "./Sidebar";

function Dashboard({ searchParams }: searchParams) {
  return (
    <div id="dashboard" className="">
      <Sidebar />
      <Collections searchParams={searchParams} />
    </div>
  );
}

export default Dashboard;
