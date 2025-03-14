"use client";

import { Filter, Search } from "lucide-react";
import { useEffect, useState } from "react";

import { Cocktail } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

import Card from "../_components/cocktail-card";

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showNonAlcoholic, setShowNonAlcoholic] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCocktails = async () => {
      const data = await fetch("https://cocktails.solvro.pl/api/v1/cocktails");
      const result = await data.json();
      const cocktailsWithIngredients = await Promise.all(
        result.data.map(async (cocktail: Cocktail) => {
          const ingredientData = await fetch(
            `https://cocktails.solvro.pl/api/v1/cocktails/${cocktail.id}`,
          );
          const ingredientResult = await ingredientData.json();
          return {
            ...cocktail,
            ingredients: ingredientResult.data.ingredients,
          };
        }),
      );
      setCocktails(cocktailsWithIngredients);
      setLoading(false);
    };

    fetchCocktails();
  }, []);

  const isFavorite = (cocktailId: number) => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    return favorites.includes(cocktailId);
  };

  const filteredCocktails = cocktails.filter((cocktail: Cocktail) => {
    const matchesSearchQuery = cocktail.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFavorites = !showFavorites || isFavorite(cocktail.id);
    const matchesNonAlcoholic = !showNonAlcoholic || !cocktail.alcoholic;

    return matchesSearchQuery && matchesFavorites && matchesNonAlcoholic;
  });

  return (
    <div className="flex w-full flex-col items-center justify-center px-4 pb-4">
      <div className="container flex w-full flex-row space-x-4 py-8">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="h-12 w-12">
              <Filter />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-80">
            <DialogHeader>
              <DialogTitle>Filters</DialogTitle>
              <DialogDescription></DialogDescription>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="favorites"
                  checked={showFavorites}
                  onCheckedChange={(checked) =>
                    setShowFavorites(checked === true)
                  }
                />
                <label
                  htmlFor="favorites"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Show favorites
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="non-alcoholic"
                  checked={showNonAlcoholic}
                  onCheckedChange={(checked) =>
                    setShowNonAlcoholic(checked === true)
                  }
                />
                <label
                  htmlFor="non-alcoholic"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Non-alcoholic only
                </label>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>

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
      </div>

      <div className="container grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading && (
          <>
            {[...Array(8)].map((_, index) => (
              <div key={index} className="space-y-4 px-4 py-6">
                <Skeleton className="h-6 w-1/3 rounded-md" />
                <Skeleton className="h-12 w-full rounded-md" />
                <Skeleton className="mt-8 h-96 w-full rounded-md" />
              </div>
            ))}
          </>
        )}
        {filteredCocktails.length > 0
          ? filteredCocktails.map((cocktail: Cocktail) => (
              <Card key={cocktail.id} cocktail={cocktail} />
            ))
          : !loading && (
              <p className="w-full text-xs">
                No cocktails found.<br></br>Please check your spelling or try
                different keywords.
              </p>
            )}
      </div>
    </div>
  );
}
