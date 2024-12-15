import { Button } from "@/shared/components/ui";
import { addCartItem } from "@/shared/services/cart";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Product {
	id: number;
	title: string;
	previewImage: string;
	brand: string;
	price: number;
	slug: string;
	categorySlug: string;
}

export const ProductCard: React.FC<Product> = ({
	id,
	title,
	previewImage,
	brand,
	price,
	slug,
	categorySlug,
}) => {
	const link = `/catalog/${categorySlug}/${slug}-${id}`;
	return (
		<div className="w-72 border border-gray-300 rounded-2xl overflow-hidden p-3">
			<Link href={link}>
				<Image
					className="w-full h-60"
					src={previewImage}
					width={200}
					height={200}
					alt={title}
				/>
			</Link>
			<div className="flex flex-col gap-2 pt-4">
				<span className="font-bold text-lg">{price.toLocaleString()} ₽</span>
				<span className="font-bold text-sm">{brand}</span>
				<Link href={link} className="text-sm">
					{title}
				</Link>
			</div>
			<div className="mt-4">
				<Button onClick={() => addCartItem(id)}>Купить</Button>
			</div>
		</div>
	);
};
