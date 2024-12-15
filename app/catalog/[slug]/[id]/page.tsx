"use client";

import { Container } from "@/shared/components";
import { fetcher } from "@/shared/services";
import { IProduct } from "@/shared/types/product";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import useSWR from "swr";

export default function Page() {
	const pathname = usePathname();
	const id = pathname.split("-").at(-1);

	const { data, error, isLoading } = useSWR<IProduct>(`/api/products/byId?id=${id}`, fetcher);

	if (isLoading) {
		<div className="mt-10">Загрузка...</div>;
	}

	if (error) {
		<div className="mt-10">Произошла ошибка</div>;
	}

	const reviews = data?.reviews;

	console.log("Карточка товара", data);

	return (
		<div className="mt-10 mb-10">
			<Container className="flex gap-4">
				{data?.previewImage && data?.title && (
					<Image src={data.previewImage} width={400} height={400} alt={data.title} />
				)}
				<div>
					<h1 className="text-2xl mb-2">{data?.title}</h1>
					<span className="font-bold text-sm">{data?.brand?.name}</span>
				</div>
			</Container>
			{reviews && reviews.length > 0 && (
				<Container>
					<div className="flex flex-col gap-6 p-6 border border-gray-300 rounded-3xl">
						<h2 className="text-4xl">Отзывы</h2>

						<div className="flex flex-col gap-4">
							{reviews.map((review) => (
								<div key={review.id}>
									<div>
										{review.rating} {review.comment}
									</div>
								</div>
							))}
						</div>
					</div>
				</Container>
			)}
		</div>
	);
}
