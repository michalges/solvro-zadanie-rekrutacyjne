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

import { ModeToggle } from "./mode-toggle";

export default function Navbar() {
  return (
    <nav className="flex justify-center border-b">
      <div className="container flex w-full items-center p-4">
        <div className="flex w-full items-center space-x-4">
          <Link href="/" className="" passHref>
            <div className="relative aspect-square h-10">
              <Image
                src="/placeholder.png"
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
                <NavigationMenuLink href="/" className="font-medium">
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Cocktails</NavigationMenuTrigger>
                <NavigationMenuContent className="min-w-36">
                  <NavigationMenuLink href="/cocktails">
                    Browse All
                  </NavigationMenuLink>
                  <NavigationMenuLink href="/ingredients">
                    Ingredients
                  </NavigationMenuLink>
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
