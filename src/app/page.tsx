"use client";

import { useEffect, useState } from "react";

import { HeroParallax } from "@/components/ui/hero-parallax";

import type { Cocktail } from "./types";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [cocktails, setCocktails] = useState<
    { title: string; thumbnail: string }[]
  >([]);

  useEffect(() => {
    async function fetchCocktails() {
      const response = await fetch(
        "https://cocktails.solvro.pl/api/v1/cocktails",
      );
      const data = (await response.json()) as { data: Cocktail[] };
      const mappedCocktails = data.data.map((cocktail: Cocktail) => ({
        title: cocktail.name,
        thumbnail: cocktail.imageUrl,
      }));
      setCocktails(mappedCocktails);
      setLoading(false);
    }

    fetchCocktails().catch((error: unknown) => {
      console.error("Failed to fetch cocktails:", error);
    });
  }, []);

  return loading ? (
    <HeroParallax products={cocktails} loading={true} />
  ) : (
    <HeroParallax products={cocktails} loading={false} />
  );
}
