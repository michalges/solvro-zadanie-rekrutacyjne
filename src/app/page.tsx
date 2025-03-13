"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
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
        link: "#", // Assuming there's no specific link for each cocktail
        thumbnail: cocktail.imageUrl, // Assuming the image URL is in the 'image' field
      }));
      setCocktails(mappedCocktails);
    }

    fetchCocktails();
  }, []);

  return <HeroParallax products={cocktails} />;
}

export const products = [
  {
    title: "Moonbeam",
    link: "https://gomoonbeam.com",
    thumbnail: "/placeholder.png",
  },
  {
    title: "Cursor",
    link: "https://cursor.so",
    thumbnail: "/placeholder.png",
  },
  {
    title: "Rogue",
    link: "https://userogue.com",
    thumbnail: "/placeholder.png",
  },

  {
    title: "Editorially",
    link: "https://editorially.org",
    thumbnail: "/placeholder.png",
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai",
    thumbnail: "/placeholder.png",
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail: "/placeholder.png",
  },

  {
    title: "Algochurn",
    link: "https://algochurn.com",
    thumbnail: "/placeholder.png",
  },
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com",
    thumbnail: "/placeholder.png",
  },
  {
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com",
    thumbnail: "/placeholder.png",
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail: "/placeholder.png",
  },
  {
    title: "Renderwork Studio",
    link: "https://renderwork.studio",
    thumbnail: "/placeholder.png",
  },

  {
    title: "Creme Digital",
    link: "https://cremedigital.com",
    thumbnail: "/placeholder.png",
  },
  {
    title: "Golden Bells Academy",
    link: "https://goldenbellsacademy.com",
    thumbnail: "/placeholder.png",
  },
  {
    title: "Invoker Labs",
    link: "https://invoker.lol",
    thumbnail: "/placeholder.png",
  },
  {
    title: "E Free Invoice",
    link: "https://efreeinvoice.com",
    thumbnail: "/placeholder.png",
  },
];
