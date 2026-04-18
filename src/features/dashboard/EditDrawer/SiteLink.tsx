import { useEditDrawerContext } from "./EditDrawerContext";

export default function SiteLink() {
  const { itemSelected } = useEditDrawerContext();
  return (
    <div>
      <a href={itemSelected?.siteUrl} target="_blank" className="underline">
        {itemSelected?.siteUrl || "No URL provided"}
      </a>
    </div>
  );
}
