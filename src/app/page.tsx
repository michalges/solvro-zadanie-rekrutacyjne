import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex w-full grow flex-col items-center justify-center">
      <h1 className="text-6xl font-bold">Solvro cocktails</h1>
      <p>Welcome to the home page</p>
      <Button variant="outline">
        <Link href="/cocktails">Browse cocktails</Link>
      </Button>
    </div>
  );
}
