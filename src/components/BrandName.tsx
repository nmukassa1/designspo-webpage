import Link from "next/link";

function BrandName({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="text-2xl font-bold">
      CURATEMAP
    </Link>
  );
}

export default BrandName;
