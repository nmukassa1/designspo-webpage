import Collections from "./Collections";
import Sidebar from "./Sidebar";

function Dashboard() {
    return ( 
        <div id="dashboard" className="h-full">
            <Sidebar />
            <Collections />
        </div>
     );
}

export default Dashboard;