import { hashSync } from "bcrypt";
import { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

import { prisma } from "@/prisma/prisma-client";

export const authOptions: AuthOptions = {
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID || "",
			clientSecret: process.env.GITHUB_SECRET || "",
			profile(profile) {
				return {
					id: profile.id,
					name: profile.name || profile.login,
					email: profile.email,
					image: profile.avatar_url,
				};
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async signIn({ user, account }) {
			try {
				if (!user.email) {
					return false;
				}

				const findUser = await prisma.user.findFirst({
					where: {
						OR: [
							{ provider: account?.provider, providerId: account?.providerAccountId },
							{ email: user.email },
						],
					},
				});

				if (findUser) {
					await prisma.user.update({
						where: {
							id: findUser.id,
						},
						data: {
							provider: account?.provider,
							providerId: account?.providerAccountId,
						},
					});

					return true;
				}

				await prisma.user.create({
					data: {
						email: user.email,
						fullName: user.name || "User #" + user.id,
						password: hashSync(user.id.toString(), 10),
						provider: account?.provider,
						providerId: account?.providerAccountId,
					},
				});

				return true;
			} catch (error) {
				console.error("Error [SIGNIN]", error);
				return false;
			}
		},
	},
};
