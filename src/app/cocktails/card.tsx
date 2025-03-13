import React from "react";

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
  return (
    // <div className="rounded-md border p-4 shadow-md">
    //   <img src={cocktail.imageUrl} alt={cocktail.name} />
    //   <h2>{cocktail.name}</h2>
    //   <p>{cocktail.category}</p>
    //   <p>{cocktail.glass}</p>
    //   <p>{cocktail.instructions}</p>
    //   <p>{cocktail.alcoholic ? "Alcoholic" : "Non-Alcoholic"}</p>
    // </div>
    <Card className="">
      <CardHeader>
        <CardTitle>{cocktail.name}</CardTitle>
        <CardDescription>
          {cocktail.instructions.length > 50
            ? `${cocktail.instructions.substring(0, 50)}...`
            : cocktail.instructions}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <img
          src={cocktail.imageUrl}
          alt={cocktail.name}
          className="rounded-2xl"
        />
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Details</Button>
          </DrawerTrigger>
          <DrawerContent className="">
            <div className="container flex w-full flex-col p-4 md:flex-row-reverse">
              <DrawerHeader className="md:w-1/3">
                <DrawerTitle>{cocktail.name}</DrawerTitle>
                <Badge>{cocktail.category}</Badge>
                <DrawerDescription>{cocktail.instructions}</DrawerDescription>
              </DrawerHeader>
              <img
                src={cocktail.imageUrl}
                alt={cocktail.name}
                className="rounded-2xl md:w-1/3"
              />
            </div>
            {/* <div className="space-y-2 p-4">
              <div>
                <p className="text-sm">Served in:</p>
                <p className="text-md">{cocktail.glass}</p>
              </div>
              <div>
                <p className="text-sm">Alcoholic:</p>
                <p className="text-md">{cocktail.alcoholic ? "Yes" : "No"}</p>
              </div>
              <div>
                <p className="text-sm">Id:</p>
                <p className="text-md">{cocktail.id}</p>
              </div>
            </div> */}
            <DrawerFooter className="">
              <DrawerClose asChild>
                <Button variant="outline" className="mx-auto max-w-md min-w-sm">
                  Close
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Button>like</Button>
      </CardFooter>
    </Card>
  );
};

export default CocktailCard;
