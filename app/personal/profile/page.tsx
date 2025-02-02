"use client";

import { Container } from "@/shared/components";
import { Button } from "@/shared/components/ui";
import { useAuth } from "@/shared/hooks";

export default function Profile() {
	const { logout } = useAuth();

	return (
		<div className="mt-10">
			<Container>
				<div className="flex justify-between">
					<h2 className="text-2xl">Профиль</h2>
					<Button onClick={() => logout()}>Выйти</Button>
				</div>
			</Container>
		</div>
	);
}
