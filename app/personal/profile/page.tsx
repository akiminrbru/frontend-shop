"use client";

import { Container } from "@/shared/components";
import { Button } from "@/shared/components/ui";
import { signOut } from "next-auth/react";

export default function Profile() {
	return (
		<div className="mt-10">
			<Container>
				<div className="flex justify-between">
					<h2 className="text-2xl">Профиль</h2>
					<Button onClick={() => signOut({ callbackUrl: "/" })}>Выйти</Button>
				</div>
			</Container>
		</div>
	);
}
