import SidebarNav from "./SidebarNav";

function Sidebar() {
    return ( 
        <aside className="h-full overflow-scroll px-2 fixed lg:w-[18%] lg:translate-x-[0] translate-x-[-100%] w-full text-center lg:text-left bg-white transition ease-in duration-300 z-99">
            <SidebarNav />
        </aside>
     );
}

export default Sidebar;