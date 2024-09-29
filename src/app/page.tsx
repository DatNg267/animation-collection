import { PATHS } from "@/constants/paths";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col gap-4">
        {Object.values(PATHS).map((path) => (
          <Link key={path} href={path}>
            {path}
          </Link>
        ))}
      </div>
    </main>
  );
}
