import { IBrand, ICart, ICartItem, ICategory, IProduct } from "@/shared/types";

export interface CartItemDTO extends ICartItem {
	productItem: IProduct & {
		category: ICategory;
		brand: IBrand;
	};
}

export interface CartDTO extends ICart {
	items: CartItemDTO[];
}
