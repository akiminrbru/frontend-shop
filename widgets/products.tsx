"use client";
import React from "react";
import { ProductCard } from "@/entities";
import { Container } from "@/shared/components";
import { IProduct } from "@/shared/types/product";

interface Props {
	products: IProduct[];
}

export const Products: React.FC<Props> = ({ products }) => {
	return (
		<Container>
			<div className="flex flex-wrap gap-4">
				{products &&
					products.map((product) => (
						<ProductCard
							id={product.id}
							key={product.id}
							title={product.title}
							previewImage={product.previewImage}
							price={product.price}
							slug={product.slug}
							brand={product.brand.name}
							categorySlug={product.category.slug}
						/>
					))}
			</div>
		</Container>
	);
};
