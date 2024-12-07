import Link from "next/link";
import { Paths } from "@/constants/paths";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col gap-4">
        {Object.values(Paths).map((path) => {
          if (typeof path === "string") {
            return (
              <Button key={path} className="justify-start">
                <Link href={path}>{path}</Link>
              </Button>
            );
          }
          return Object.values(path).map((p) => (
            <Button key={p} className="ml-8 justify-start">
              <Link key={p} href={p}>
                {p}
              </Link>
            </Button>
          ));
        })}
      </div>
    </main>
  );
}
