"use client";

import { useEffect, useState } from "react";

import { Cocktail } from "@/app/types";

import Card from "../_components/card";

export default function Page() {
  const [favoriteCocktails, setFavoriteCocktails] = useState<Cocktail[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      const data = await fetch("https://cocktails.solvro.pl/api/v1/cocktails");
      const cocktails = await data.json();
      const favoriteCocktails = cocktails.data.filter((cocktail: Cocktail) =>
        favorites.includes(cocktail.id),
      );

      setFavoriteCocktails(favoriteCocktails);
    };

    fetchFavorites();
  }, []);

  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="container grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {favoriteCocktails.map((cocktail: Cocktail) => (
          <Card key={cocktail.id} cocktail={cocktail} />
        ))}
      </div>
    </div>
  );
}
