"use client";
import { fetcher } from "@/shared/services";
import { CartDTO } from "@/shared/services/dto/cart.dto";
import { Heart, Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

async function deleteCartItem(url: string, { arg }: { arg: number }) {
	await fetch(url, {
		method: "DELETE",
		body: JSON.stringify({
			id: arg,
		}),
	});
}

async function updateCartItemQuantity(
	url: string,
	{ arg }: { arg: { id: number; type: "minus" | "plus" } }
) {
	await fetch(url, {
		method: "PATCH",
		body: JSON.stringify({
			id: arg.id,
			type: arg.type,
		}),
	});
}

export const CartPage = () => {
	const { data, error, isLoading } = useSWR<CartDTO>(`/api/cart/`, fetcher);
	const { trigger: deteleCartItem } = useSWRMutation("/api/cart/", deleteCartItem);
	const { trigger: updateQuantity } = useSWRMutation("/api/cart/", updateCartItemQuantity);

	if (isLoading) {
		return <div>Загрузка...</div>;
	}

	if (error) {
		return <div>Произошла ошибка</div>;
	}

	console.log(data);
	return (
		<>
			{data && data.items.length > 0 ? (
				<div className="flex flex-col gap-8 mt-10">
					{data?.items.map((cartItem) => (
						<div className="flex gap-4" key={cartItem.id}>
							<Image
								className="rounded-2xl"
								src={cartItem.productItem.previewImage}
								width={130}
								height={130}
								alt={cartItem.productItem.title}
							/>
							<div className="flex flex-col gap-2">
								<Link
									className="text-lg font-bold"
									href={`/catalog/${cartItem.productItem.category.slug}/${cartItem.productItem.slug}-${cartItem.productItem.id}`}>
									{cartItem.productItem.title}
								</Link>
								<span>{cartItem.productItem.brand.name}</span>
								<div className="mt-auto flex items-center gap-4">
									<button type="button">
										<Heart className="w-5 h-5" />
									</button>
									<button
										type="button"
										onClick={() => deteleCartItem(cartItem.id)}>
										<Trash className="w-5 h-5" />
									</button>
								</div>
							</div>
							<div className="flex items-start gap-9">
								<div className="flex items-center gap-4 bg-slate-200 rounded-2xl px-4 py-[6px]">
									<button
										type="button"
										disabled={cartItem.quantity <= 1}
										onClick={() =>
											updateQuantity({ id: cartItem.id, type: "minus" })
										}>
										<Minus className="w-5 h-5" />
									</button>
									<span>{cartItem.quantity}</span>
									<button
										type="button"
										onClick={() =>
											updateQuantity({ id: cartItem.id, type: "plus" })
										}>
										<Plus className="w-5 h-5" />
									</button>
								</div>
								<span className="font-bold">
									{cartItem.productItem.price * cartItem.quantity} ₽
								</span>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="flex flex-col justify-center items-center mt-10 gap-4">
					<h5 className="text-xl font-bold">В корзине пока пусто</h5>
					<p>Загляните на главную, чтобы выбрать товары или найдите нужное в поиске</p>
					<Link
						className="px-6 py-4 bg-[--color-black] text-white rounded-2xl"
						href={"/"}>
						На главную
					</Link>
				</div>
			)}
		</>
	);
};
