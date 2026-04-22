import { Camera, LayoutGrid, Search, Tags } from "lucide-react";

const features = [
  {
    title: "One-Click Capture",
    description: "Save any webpage instantly with the extension.",
    icon: Camera,
  },
  {
    title: "Beautiful Dashboard",
    description: "Access every saved reference in one visual library.",
    icon: LayoutGrid,
  },
  {
    title: "Smart Organization",
    description: "Categorize inspiration with tags and custom groupings.",
    icon: Tags,
  },
  {
    title: "Quick Search",
    description: "Find the exact inspiration you need in seconds.",
    icon: Search,
  },
];

export function FeatureCards() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {features.map((feature) => (
        <article
          key={feature.title}
          className="rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary">
            <feature.icon className="h-5 w-5 text-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
        </article>
      ))}
    </div>
  );
}

