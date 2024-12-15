import { BASE_URL } from "../constants/constants";
import { CartDTO } from "./dto/cart.dto";

export const getCart = async (): Promise<CartDTO> => {
	return await fetch(`${BASE_URL}/api/cart`, { method: "GET" }).then((r) => r.json());
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
