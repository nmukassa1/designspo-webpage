import Link from "next/link";

function BrandName({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="text-2xl font-bold tracking-tight md:text-3xl">
      Designspo
    </Link>
  );
}

export default BrandName;
