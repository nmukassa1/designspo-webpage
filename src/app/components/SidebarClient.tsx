import SidebarNav from "./SidebarNav";

function SidebarClient() {
    return ( 
        <aside className="h-full overflow-scroll px-2 fixed md:w-[18%] md:left-0 -left-[100%] transition ease-in duration-300">
            <SidebarNav />
        </aside>
     );
}

export default SidebarClient;