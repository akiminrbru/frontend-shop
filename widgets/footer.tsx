import { Container } from "@/shared/components";
import React from "react";

export const Footer = () => {
	return (
		<footer className="mt-auto h-52 bg-[--color-black]">
			<Container className="py-10">
				<p className="text-white">© 2024. Все права защищены</p>
			</Container>
		</footer>
	);
};
