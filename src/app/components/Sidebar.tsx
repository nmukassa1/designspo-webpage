import { getTags } from "../queries";
import CreateATagPlaceholder from "./CreateATagPlaceholder";
import NewTag from "./NewTag";
import SidebarNav from "./SidebarNav";

async function Sidebar({ userId }: { userId: string }) {
  // const userId = "8c43787a-6332-4f73-8ed3-f00a54f801e4";
  const tags = await getTags(userId);

  return (
    <aside className="flex flex-col h-full bg-white lg:bg-transparent overflow-scroll px-4 fixed lg:w-[18%] lg:translate-x-[0] translate-x-[-100%] w-full text-center lg:text-left transition ease-in duration-300 z-99">
      <SidebarNav tags={tags} />
      <NewTag />
    </aside>
  );
}

export default Sidebar;
