export interface Recipe {
  _id: number;
  name: string;
  description: string;
  ingredients: string[];
  category: string;
  price: number;
  estimatedTime: string;
  imageUrl: string;
}
