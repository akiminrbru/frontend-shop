import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiInstance } from "../services";
import useSWR from "swr";
import { useAuthStore } from "../store";

export function useAuth() {
	const isAuth = useAuthStore((state) => state.isAuth);
	const setIsAuth = useAuthStore((state) => state.setIsAuth);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		apiInstance
			.get("/auth/session")
			.then((response) => {
				setIsAuth(true);
				setIsLoading(false);
			})
			.catch((err) => {
				setIsAuth(false);
				setIsLoading(false);
			});
	}, [isAuth]);

	const logout = async () => {
		try {
			await apiInstance.post("/auth/logout");
			setIsAuth(false);
			router.push("/login");
		} catch (error) {
			console.error("Ошибка выхода", error);
		}
	};

	return { isAuth, logout, isLoading };
}
