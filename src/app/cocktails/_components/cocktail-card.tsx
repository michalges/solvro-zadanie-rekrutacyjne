"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import type { Cocktail } from "../../types/types";

export function CocktailCard({ cocktail }: { cocktail: Cocktail }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites: number[] = JSON.parse(
      localStorage.getItem("favorites") ?? "[]",
    ) as number[];
    setIsFavorite(favorites.includes(cocktail.id));
  }, [cocktail.id]);

  const handleFavorite = () => {
    let favorites: number[] = JSON.parse(
      localStorage.getItem("favorites") ?? "[]",
    ) as number[];
    if (favorites.includes(cocktail.id)) {
      favorites = favorites.filter((id: number) => id !== cocktail.id);
    } else {
      favorites.push(cocktail.id);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>{cocktail.name}</CardTitle>
        <CardDescription className="line-clamp-2">
          {cocktail.instructions}
        </CardDescription>
      </CardHeader>
      <div className="grow"></div>
      <CardContent>
        <Image
          src={cocktail.imageUrl}
          alt={cocktail.name}
          width={500}
          height={500}
          className="rounded-2xl"
        />
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Details</Button>
          </DrawerTrigger>
          <DrawerContent className="">
            <div className="flex h-full max-h-full flex-col items-center overflow-auto p-4 xl:flex-row-reverse xl:items-start xl:justify-center">
              <DrawerHeader className="space-y-4 xl:w-1/3">
                <div className="space-y-2">
                  <DrawerTitle className="text-3xl">
                    {cocktail.name}
                  </DrawerTitle>
                  <div className="flex space-x-2">
                    <Badge>{cocktail.category}</Badge>
                    <Badge>
                      {cocktail.alcoholic ? "Alcoholic" : "Non-alcoholic"}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-medium">Instructions</h3>
                  <p className="text-sm">{cocktail.instructions}</p>
                </div>
                <div className="mb-4 space-y-1">
                  <h3 className="text-xl font-medium">Ingredients</h3>
                  <div className="">
                    {cocktail.ingredients.map((ingredient) => (
                      <p key={ingredient.name} className="text-sm">
                        <span>{ingredient.measure}</span>
                        <span>{ingredient.name}</span>
                      </p>
                    ))}
                  </div>
                </div>
              </DrawerHeader>
              <DrawerDescription></DrawerDescription>
              <Image
                src={cocktail.imageUrl}
                alt={cocktail.name}
                className="rounded-2xl shadow-md xl:w-1/3"
                width={500}
                height={500}
              />
            </div>
            <DrawerFooter className="">
              <DrawerClose asChild>
                <Button variant="outline" className="mx-auto max-w-md min-w-48">
                  Close
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Button className="" onClick={handleFavorite}>
          <Heart fill={isFavorite ? "var(--primary-foreground)" : "none"} />
        </Button>
      </CardFooter>
    </Card>
  );
}
