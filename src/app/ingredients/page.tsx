import { Ingredient } from "@/app/types";

export default async function Page() {
  const data = await fetch("https://cocktails.solvro.pl/api/v1/ingredients");
  const ingredients = await data.json();

  return (
    <div className="p-4">
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {ingredients.data.map((ingredient: Ingredient) => (
          <p>{ingredient.name}</p>
        ))}
      </div>
    </div>
  );
}
