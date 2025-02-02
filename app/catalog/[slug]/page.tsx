"use client";

import { fetcher } from "@/shared/services";
import { IProduct } from "@/shared/types/product";
import { Products } from "@/widgets";
import { usePathname } from "next/navigation";
import React from "react";
import useSWR from "swr";

export default function Page() {
	const pathname = usePathname();
	const slug = pathname.split("/").at(-1);

	const { data, error, isLoading } = useSWR<IProduct[]>(
		`/catalog/getProductbyCategory?category=${slug}`,
		fetcher
	);

	if (isLoading) {
		<div>Загрузка...</div>;
	}

	if (error) {
		<div>Произошла ошибка</div>;
	}

	return <div>{data && <Products products={data} />}</div>;
}
