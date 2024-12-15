import { Brand, Category, Product, Review } from "@prisma/client";

export interface IProduct extends Product {
	category: Category;
	brand: Brand;
	reviews: Review[];
}
