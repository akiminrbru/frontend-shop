import { create } from "zustand";

interface State {
	menuIsOpen: boolean;
	closeMenu: () => void;
	openMenu: () => void;
	toggleMenu: () => void;
}

export const useMenuStore = create<State>((set) => ({
	menuIsOpen: false,
	closeMenu: () => set(() => ({ menuIsOpen: false })),
	openMenu: () => set(() => ({ menuIsOpen: true })),
	toggleMenu: () => set((state) => ({ menuIsOpen: !state.menuIsOpen })),
}));
