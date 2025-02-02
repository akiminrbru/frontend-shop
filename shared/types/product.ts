import { ICategory } from "./category";
import { IBrand } from "./brand";
import { IReview } from "./review";

export interface IProduct {
	id: number;
	title: string;
	slug: string;
	previewImage: string;
	price: number;
	brandId: number;
	categoryId: number;
	category: ICategory;
	brand: IBrand;
	reviews: IReview[];
}
