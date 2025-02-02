import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Footer, Header } from "@/widgets";
import NextTopLoader from "nextjs-toploader";
import { Providers } from "@/features";

const MTSText = localFont({
	src: [
		{
			path: "./fonts/MTSText-Regular.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "./fonts/MTSText-Medium.woff2",
			weight: "500",
			style: "normal",
		},
		{
			path: "./fonts/MTSText-Bold.woff2",
			weight: "700",
			style: "normal",
		},
		{
			path: "./fonts/MTSText-Black.woff2",
			weight: "900",
			style: "normal",
		},
	],
	variable: "--font-mts-text",
});

const MTSCompact = localFont({
	src: [
		{
			path: "./fonts/MTSCompact-Regular.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "./fonts/MTSCompact-Medium.woff2",
			weight: "500",
			style: "normal",
		},
		{
			path: "./fonts/MTSCompact-Bold.woff2",
			weight: "700",
			style: "normal",
		},
		{
			path: "./fonts/MTSCompact-Black.woff2",
			weight: "900",
			style: "normal",
		},
	],
	variable: "--font-mts-compact",
});

const MTSExtended = localFont({
	src: [
		{
			path: "./fonts/MTSExtended-Regular.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "./fonts/MTSExtended-Medium.woff2",
			weight: "500",
			style: "normal",
		},
		{
			path: "./fonts/MTSExtended-Bold.woff2",
			weight: "700",
			style: "normal",
		},
		{
			path: "./fonts/MTSExtended-Black.woff2",
			weight: "900",
			style: "normal",
		},
	],
	variable: "--font-mts-extended",
});

const MTSWide = localFont({
	src: [
		{
			path: "./fonts/MTSWide-Regular.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "./fonts/MTSWide-Medium.woff2",
			weight: "500",
			style: "normal",
		},
		{
			path: "./fonts/MTSWide-Bold.woff2",
			weight: "700",
			style: "normal",
		},
		{
			path: "./fonts/MTSWide-Black.woff2",
			weight: "900",
			style: "normal",
		},
	],
	variable: "--font-mts-wide",
});

export const metadata: Metadata = {
	title: "Shop",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${MTSCompact.variable} ${MTSText.variable} ${MTSWide.variable} ${MTSExtended.variable} antialiased flex flex-col min-h-screen`}>
				<Providers>
					<Header />
					{children}
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
