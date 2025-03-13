import Image from "next/image";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import { Button } from "../../components/ui/button";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
  return (
    <nav className="flex justify-center border-b-1 border-gray-200">
      <div className="container flex w-full items-center p-4">
        <div className="flex w-full items-center space-x-4">
          <Link href="/" className="" passHref>
            <div className="relative aspect-square h-10">
              <Image
                src="/placeholder.png"
                layout="intrinsic"
                width={128}
                height={128}
                alt="Logo"
                className=""
              />
            </div>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href="/" className="font-semibold">
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Cocktails</NavigationMenuTrigger>
                <NavigationMenuContent className="min-w-36">
                  <NavigationMenuLink href="/cocktails">
                    Browse All
                  </NavigationMenuLink>
                  <NavigationMenuLink>Favorites</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <ModeToggle />
      </div>
    </nav>
  );
}
