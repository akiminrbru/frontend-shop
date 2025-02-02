import { Menu, Search } from "@/entities";
import { ButtonSignIn } from "@/features";
import { Container } from "@/shared/components";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Header = () => {
	return (
		<header className="py-5">
			<Container className="flex items-center gap-4">
				<div>
					<Link
						href={"/"}
						className="text-xl font-bold leading-[0rem] uppercase text-[--color-black]">
						супер
						<br />
						маркет
					</Link>
				</div>
				<Menu />
				<Search />
				<div className="flex items-center gap-3 ml-auto">
					<ButtonSignIn />
					<Link className="flex flex-col items-center gap-1" href={"#"}>
						<Heart size={20} />
						Избранное
					</Link>
					<Link className="flex flex-col items-center gap-1 text-sm" href={"/cart"}>
						<ShoppingCart size={20} />
						Корзина
					</Link>
				</div>
			</Container>
		</header>
	);
};
