import { Brand, Cart, CartItem, Category, Product } from "@prisma/client";

export interface CartItemDTO extends CartItem {
	productItem: Product & {
		category: Category;
		brand: Brand;
	};
}

export interface CartDTO extends Cart {
	items: CartItemDTO[];
}
