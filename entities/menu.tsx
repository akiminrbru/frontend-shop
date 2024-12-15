"use client";
import { fetcher } from "@/shared/services";
import { Category } from "@prisma/client";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import { ChevronRight, Menu as MenuIcon } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Container } from "@/shared/components";
import { useMenuStore } from "@/shared/store";

export const Menu = () => {
	const menuIsOpen = useMenuStore((state) => state.menuIsOpen);
	const toggleMenu = useMenuStore((state) => state.toggleMenu);
	const closeMenu = useMenuStore((state) => state.toggleMenu);

	const { data, error, isLoading } = useSWR<Category[]>("/api/catalog", fetcher);

	if (isLoading) {
		<div>Загрузка...</div>;
	}

	if (error) {
		<div>Произошла ошибка</div>;
	}

	return (
		<>
			<div
				className="flex items-center gap-2 rounded-3xl bg-[--color-black] px-5 py-3 cursor-pointer"
				onClick={toggleMenu}>
				<MenuIcon color="white" />
				<span className="text-white font-medium">Каталог</span>
			</div>
			<div
				className={cn(
					"hidden w-full bg-white absolute left-0 right-0 top-[88px] bottom-0",
					{
						block: menuIsOpen,
					}
				)}>
				<Container className="flex flex-col gap-2">
					{data?.map((category) => (
						<Link
							className="w-[300px] p-2 flex items-center justify-between rounded-lg hover:bg-[#F0F5F3] hover:text-[purple]"
							key={category.id}
							href={`/catalog/${category.slug}/`}
							onClick={closeMenu}>
							{category.name}
							<ChevronRight color="gray" />
						</Link>
					))}
				</Container>
			</div>
		</>
	);
};
