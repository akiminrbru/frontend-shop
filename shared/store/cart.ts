import { create } from "zustand";
import { Api } from "../services/api-client";
import { CartItemDTO } from "../services/dto/cart.dto";

export interface CartState {
	loading: boolean;
	error: boolean;
	totalAmount: number;
	items: CartItemDTO[];

	/* Получение товаров из корзины */
	fetchCartItems: () => Promise<void>;

	/* Запрос на добавление товара в корзину */
	addCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
	items: [],
	error: false,
	loading: true,
	totalAmount: 0,

	fetchCartItems: async () => {
		try {
			set({ loading: true, error: false });
			const data = await Api.cart.getCart();
			set(data);
		} catch (error) {
			console.error(error);
			set({ error: true });
		} finally {
			set({ loading: false });
		}
	},

	addCartItem: async (id: number) => {
		try {
			set({ loading: true, error: false });
			const data = await Api.cart.addCartItem(id);
			set(data);
		} catch (error) {
			console.error(error);
			set({ error: true });
		} finally {
			set({ loading: false });
		}
	},
}));
