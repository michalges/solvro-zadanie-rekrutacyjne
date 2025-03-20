import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { ModeToggle } from "./mode-toggle";

export function Navbar() {
  return (
    <nav className="bg-background/90 sticky top-0 z-50 flex w-full justify-center border-b px-4 backdrop-blur-sm backdrop-filter">
      <div className="container flex w-full items-center py-3 sm:py-4">
        <div className="flex w-full items-center space-x-4">
          <Link href="/" className="" passHref>
            <div className="relative flex aspect-square h-8 items-center sm:h-10">
              <Image
                src="/solvro-logo.svg"
                width={128}
                height={128}
                alt="Solvro cocktails logo - homepage"
                className="dark:invert"
              />
            </div>
          </Link>
          <div>
            <Link href="/" passHref>
              <Button variant="ghost">Home</Button>
            </Link>
            <Link href="/cocktails" passHref>
              <Button variant="ghost">Cocktails</Button>
            </Link>
          </div>
        </div>
        <ModeToggle />
      </div>
    </nav>
  );
}
