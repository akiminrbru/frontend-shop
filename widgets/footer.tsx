import { Container } from "@/shared/components";
import Link from "next/link";
import React from "react";

export const Footer = () => {
	return (
		<footer className="mt-auto h-52 bg-[--color-black] text-[--color-white]">
			<Container className="py-10 flex gap-16">
				<p>© 2024. Все права защищены</p>
				<div className="flex flex-col gap-3">
					<h2>Компания</h2>
					<ul className="text-[--color-gray]">
						<Link href={"/blog"}>Блог</Link>
					</ul>
				</div>
			</Container>
		</footer>
	);
};
