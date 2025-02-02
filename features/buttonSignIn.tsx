"use client";

import { Skeleton } from "@/shared/components/ui";
import { useAuth } from "@/shared/hooks";
import { User, UserCheck } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

export const ButtonSignIn = (props: Props) => {
	const { isAuth, isLoading } = useAuth();

	if (isLoading)
		return (
			<div className="flex flex-col items-center gap-1">
				<Skeleton className="w-[20px] h-[20px] rounded-full" />
				<Skeleton className="w-[68px] h-[23px] rounded-full" />
			</div>
		);

	return isAuth ? (
		<Link className="flex flex-col items-center gap-1" href={"/personal/profile"}>
			<UserCheck size={20} />
			Профиль
		</Link>
	) : (
		<Link className="flex flex-col items-center gap-1" href={"/login"}>
			<User size={20} />
			Войти
		</Link>
	);
};
