"use client";

import { cn } from "@/shared/lib/utils";
import { fetcher } from "@/shared/services";
import { IProduct } from "@/shared/types";
import React from "react";
import useSWR from "swr";
import { useClickAway } from "react-use";
import { useDebounce } from "@/shared/hooks";

export const Search = () => {
	const [focused, setFocused] = React.useState<boolean>(false);
	const ref = React.useRef(null);
	const [searchValue, setSearchValue] = React.useState<string>("");
	const debouncedInputValue = useDebounce(searchValue);

	const { data, error, isLoading } = useSWR<IProduct[]>(
		debouncedInputValue ? `/catalog/searchProducts?search=${searchValue}` : null,
		fetcher
	);

	useClickAway(ref, () => {
		setFocused(false);
	});

	if (isLoading) {
		<div>Загрузка...</div>;
	}

	if (error) {
		<div>Произошла ошибка</div>;
	}

	return (
		<>
			{focused && <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />}
			<div className="w-full relative z-30" ref={ref}>
				<input
					onChange={(e) => setSearchValue(e.currentTarget.value)}
					value={searchValue}
					className={cn(
						"w-full border-2 px-4 py-2 border-[--color-black] rounded-2xl focus-visible:outline-none",
						{
							"rounded-b-none border-0": focused,
						}
					)}
					type="text"
					placeholder="Искать товары"
					onFocus={() => setFocused(true)}
				/>
				<div
					className={cn("absolute w-full bg-white rounded-b-2xl invisible", {
						visible: focused,
					})}>
					{data ? (
						<div className="p-3">
							{data.map((product) => (
								<div key={product.id}>{product.title}</div>
							))}
						</div>
					) : (
						<div>Ничего не найдено</div>
					)}
				</div>
			</div>
		</>
	);
};
