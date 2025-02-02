export interface ICart {
	id: number;
	userId: number | null;
	cartToken: string | null;
	totalAmount: number;
}

export interface ICartItem {
	id: number;
	cartId: number;
	productItemId: number;
	quantity: number;
}
