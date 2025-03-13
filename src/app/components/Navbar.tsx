import Image from "next/image";
import Link from "next/link";

import { Button } from "../../components/ui/button";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
  return (
    <nav className="flex justify-center border-b-2 border-gray-200">
      <div className="container flex w-full items-center justify-between">
        <Link href="/" className="p-4" passHref>
          <Image
            src="/placeholder.png"
            width={128}
            height={128}
            alt="Picture of the author"
          />
        </Link>

        <div className="flex space-x-4 p-4">
          <Link href="/" passHref>
            <Button variant="ghost">Home</Button>
          </Link>
          <Link href="/cocktails" passHref>
            <Button variant="ghost">Koktajle</Button>
          </Link>
          <Link href="/" passHref>
            <Button variant="ghost">Ulubione</Button>
          </Link>
          <Link href="/" passHref>
            <Button variant="ghost">Szukaj</Button>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
