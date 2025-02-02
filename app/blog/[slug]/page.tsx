"use client";

import { Container } from "@/shared/components";
import { fetcher } from "@/shared/services";
import { IPost } from "@/shared/types/post";
import { IProduct } from "@/shared/types/product";
import { usePathname } from "next/navigation";
import React from "react";
import useSWR from "swr";

export default function Page() {
	const pathname = usePathname();
	const slug = pathname.split("/").at(-1);

	const { data, error, isLoading } = useSWR<IPost>(
		`/blog/getProductBySlug/?slug=${slug}`,
		fetcher
	);

	if (isLoading) {
		<div className="mt-10">Загрузка...</div>;
	}

	if (error) {
		<div className="mt-10">Произошла ошибка</div>;
	}

	return (
		<div className="mt-10 mb-10">
			<Container className="flex gap-4">{data?.title}</Container>
		</div>
	);
}
