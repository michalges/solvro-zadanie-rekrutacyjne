import { Cocktail } from "@/app/types";

import Card from "./card";
import CocktailCard from "./card";

export default async function Page() {
  const data = await fetch("https://cocktails.solvro.pl/api/v1/cocktails");
  const cocktails = await data.json();

  return (
    <div className="p-4">
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {cocktails.data.map((cocktail: Cocktail) => (
          <Card key={cocktail.id} cocktail={cocktail} />
        ))}
      </div>
    </div>
  );
}
