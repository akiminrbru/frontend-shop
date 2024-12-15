// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { DefaultUser } from "next-auth";

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			name: string;
			image: string;
		};
	}

	interface User extends DefaultUser {
		id: number;
	}
}
