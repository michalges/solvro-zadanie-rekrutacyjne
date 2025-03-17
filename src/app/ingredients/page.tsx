// import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { Ingredient } from "../types/types";

export default async function Page() {
  const data = await fetch("https://cocktails.solvro.pl/api/v1/ingredients");
  const ingredients = (await data.json()) as { data: Ingredient[] };

  return (
    <div className="justify flex">
      <div className="container mx-auto my-8 rounded-md border">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ingredients.data.map((ingredient: Ingredient) => (
              <TableRow key={ingredient.id}>
                <TableCell>{ingredient.name}</TableCell>
                <TableCell className="flex h-24 w-24 items-center justify-center">
                  {/* {ingredient.imageUrl && ingredient.imageUrl.trim() ? (
                    <Image
                      src={ingredient.imageUrl}
                      alt={ingredient.name}
                      width={500}
                      height={500}
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    "-"
                  )} */}
                </TableCell>
                <TableCell className="whitespace-normal">
                  {/* {ingredient.description ? ingredient.description : "-"} */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
