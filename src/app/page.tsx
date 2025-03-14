"use client";

import { useEffect, useState } from "react";

import { HeroParallax } from "@/components/ui/hero-parallax";

import { Cocktail } from "./types";

export default function Home() {
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    async function fetchCocktails() {
      const response = await fetch(
        "https://cocktails.solvro.pl/api/v1/cocktails",
      );
      const data = await response.json();
      const mappedCocktails = data.data.map((cocktail: Cocktail) => ({
        title: cocktail.name,
        thumbnail: cocktail.imageUrl,
      }));
      setCocktails(mappedCocktails);
    }

    fetchCocktails();
  }, []);

  return <HeroParallax products={cocktails} />;
}
