import { useEditDrawerContext } from "./EditDrawerContext";

export default function SiteLink() {
  const { itemSelected } = useEditDrawerContext();
  return (
    <div>
      <a
        href={itemSelected?.siteUrl}
        target="_blank"
        className="text-sm text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground"
      >
        {itemSelected?.siteUrl || "No URL provided"}
      </a>
    </div>
  );
}
