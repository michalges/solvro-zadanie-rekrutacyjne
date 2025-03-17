export interface Ingredient {
  id: number;
  name: string;
  description: string | null;
  alcohol: boolean;
  type: string | null;
  percentage: number | null;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Cocktail {
  id: number;
  name: string;
  category: string;
  glass: string;
  instructions: string;
  imageUrl: string;
  alcoholic: boolean;
  createdAt: string;
  updatedAt: string;
  ingredients: (Ingredient & { measure: string })[];
}
