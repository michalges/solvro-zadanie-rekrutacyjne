"use client";

import { Filter } from "lucide-react";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

import { Cocktail } from "@/app/types";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Card from "../_components/card";

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);

  useEffect(() => {
    const fetchCocktails = async () => {
      const data = await fetch("https://cocktails.solvro.pl/api/v1/cocktails");
      const result = await data.json();
      setCocktails(result.data);
    };

    fetchCocktails();
  }, []);

  const filteredCocktails = cocktails.filter((cocktail: Cocktail) =>
    cocktail.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex w-full flex-col items-center justify-center px-4 pb-4">
      <div className="container flex w-full flex-row space-x-4 py-8">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-12 w-12">
              <Filter />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Light</DropdownMenuItem>
            <DropdownMenuItem>Dark</DropdownMenuItem>
            <DropdownMenuItem>System</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex h-12 w-full flex-row items-center rounded-md border">
          <Search color="#848484" className="h-full w-12 p-3" />
          <input
            type="text"
            placeholder="Search for a cocktail..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-full w-full outline-none"
          />
        </div>
        {/* <Command className="h-12 border">
          <CommandInput
            placeholder="Search for a cocktail..."
            value={searchQuery}
            onValueChange={(value) => setSearchQuery(value)}
            className="h-full"
          />
           <CommandList>
            {filteredCocktails.length === 0 ? (
              <CommandEmpty>No results found.</CommandEmpty>
            ) : (
              <CommandGroup heading="Cocktails">
                {filteredCocktails.map((cocktail) => (
                  <CommandItem key={cocktail.id}>{cocktail.name}</CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command> */}
      </div>
      <div className="container grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredCocktails.map((cocktail: Cocktail) => (
          <Card key={cocktail.id} cocktail={cocktail} />
        ))}
      </div>
    </div>
  );
}
