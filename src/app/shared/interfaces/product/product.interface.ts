import { ICategoryResponse } from "../category/category.interface";

export interface IProductRequest {
    category: ICategoryResponse;
    name: string;
    description: string;
    weight: string;
    price: number;
    imagePath: string;
    path: string;
    count: number;
    culinasia: boolean;
  favStatus: boolean;
}

export interface IProductResponse extends IProductRequest {
    id: number  | string}


