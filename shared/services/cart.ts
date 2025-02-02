import { BASE_URL } from "../constants/main";
import { CartDTO } from "./dto/cart.dto";

export const getCart = async (): Promise<CartDTO> => {
	return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, { method: "GET" }).then((r) =>
		r.json()
	);
};

// export const updateItemQuantity = async (itemId: number, quantity: number): Promise<CartDTO> => {
// 	return (await axiosInstance.patch<CartDTO>("/cart/" + itemId, { quantity })).data;
// };

// export const removeCartItem = async (id: number): Promise<CartDTO> => {
// 	return (await axiosInstance.delete<CartDTO>("/cart/" + id)).data;
// };

export const addCartItem = async (id: number): Promise<CartDTO> => {
	return await fetch(`${BASE_URL}/api/cart`, {
		method: "POST",
		body: JSON.stringify({
			productItemId: id,
		}),
	}).then((r) => r.json());
};
