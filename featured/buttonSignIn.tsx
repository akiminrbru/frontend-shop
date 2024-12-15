"use client";

import {
	Sheet,
	SheetContent,
	SheetTrigger,
	Skeleton,
	SheetTitle,
	SheetDescription,
} from "@/shared/components/ui";
import { User, UserCheck } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

type Props = {};

export const ButtonSignIn = (props: Props) => {
	const { data: session, status } = useSession();

	console.log("status", status);

	if (status == "loading") {
		return (
			<div className="flex flex-col items-center gap-1 w-12">
				<Skeleton className="w-5 h-5" />
				<Skeleton className="w-11 h-5" />
			</div>
		);
	}

	return session ? (
		<Link className="flex flex-col items-center gap-1" href={"/personal/profile"}>
			<UserCheck size={20} />
			Профиль
		</Link>
	) : (
		<Sheet>
			<SheetTrigger className="flex flex-col items-center gap-1 w-12">
				<User size={20} />
				Войти
			</SheetTrigger>
			<SheetContent className="bg-[--color-black] flex items-center justify-center">
				<div className="flex flex-col gap-4 w-full">
					<SheetTitle className="text-2xl text-white">
						Войдите или <br /> зарегистрируйтесь
					</SheetTitle>
					<SheetDescription></SheetDescription>
					<button
						className="flex gap-2 items-center justify-center border py-2 px-4 rounded-3xl stroke-white"
						onClick={() =>
							signIn("github", {
								callbackUrl: "/",
								redirect: true,
							})
						}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="32"
							height="32"
							viewBox="0 0 24 24"
							fill="none"
							stroke="#ffffff"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-github">
							<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
							<path d="M9 18c-4.51 2-5-2-7-2" />
						</svg>
						<span className="text-white">Войти с помощью GitHub</span>
					</button>
				</div>
			</SheetContent>
		</Sheet>
	);
};
