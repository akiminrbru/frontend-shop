"use client";
import { BlogCard } from "@/entities";
import { fetcher } from "@/shared/services";
import { IPost } from "@/shared/types/post";
import React from "react";
import useSWR from "swr";

export const BlogPage = () => {
	const { data, error, isLoading } = useSWR<IPost[]>("/blog", fetcher);

	if (isLoading) {
		return <div>Загрузка...</div>;
	}

	if (error) {
		return <div>Произошла ошибка</div>;
	}

	return (
		<div className="flex flex-col gap-5">
			{data && data.map((item) => <BlogCard key={item.id} {...item} />)}
		</div>
	);
};
