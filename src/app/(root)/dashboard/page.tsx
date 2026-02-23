import DashboardPageClient from "./DashboardPageClient";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { tag?: string; page?: string };
}) {
  const tag = (searchParams.tag ?? null) as string | null;
  const page = searchParams.page ? Number(searchParams.page) : 1;

  return <DashboardPageClient tag={tag} page={page} />;
}
