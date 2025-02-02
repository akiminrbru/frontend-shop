"use client";
import { Container } from "@/shared/components";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Verify() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const [seconds, setSeconds] = useState(3);

	useEffect(() => {
		if (seconds > 0) {
			const timer = setInterval(() => {
				setSeconds((prev) => prev - 1);
			}, 1000);

			// Очистка таймера при размонтировании компонента
			return () => clearInterval(timer);
		} else {
			router.push("/");
		}
	}, [seconds]);
	return (
		<div className="my-10">
			<Container className="flex flex-col gap-10 mt-10">
				{searchParams.get("verified") === "success" ? (
					<h1 className="text-3xl text-center ">Верификация прошла успешно</h1>
				) : (
					<h1 className="text-3xl text-center">Верификация не удалась</h1>
				)}
				<p className="text-center mt-5 text-xl">
					Редирект на главную произойдет через {seconds} секунд
				</p>
			</Container>
		</div>
	);
}
