"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { Cocktail } from "@/app/types";
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

const CocktailCard: React.FC<{ cocktail: Cocktail }> = ({ cocktail }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(cocktail.id));
  }, [cocktail.id]);

  const handleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
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
            <div className="container flex h-full max-h-full w-full flex-col overflow-auto p-4 md:flex-row-reverse">
              <DrawerHeader className="space-y-3 md:w-1/3">
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
                <div>
                  <h3 className="text-md font-medium">Instructions</h3>
                  <p className="text-sm">{cocktail.instructions}</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-md font-medium">Ingredients</h3>
                  <div className="">
                    {cocktail.ingredients.map((ingredient, index) => (
                      <p key={index} className="text-sm">
                        <span>{ingredient.measure}</span>
                        <span>{ingredient.name}</span>
                      </p>
                    ))}
                  </div>
                </div>
              </DrawerHeader>
              <Image
                src={cocktail.imageUrl}
                alt={cocktail.name}
                className="rounded-2xl md:w-1/3"
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
};

export default CocktailCard;
