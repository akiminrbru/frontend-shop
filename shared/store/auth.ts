import { create } from "zustand";

interface State {
	isAuth: boolean;
	setIsAuth: (isAuth: boolean) => void;
}

export const useAuthStore = create<State>((set) => ({
	isAuth: false,
	setIsAuth: (isAuth) => set(() => ({ isAuth: isAuth })),
}));
