import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const search = req.nextUrl.searchParams.get("search") || "";

	const products = await prisma.product.findMany({
		where: {
			title: {
				contains: search,
				mode: "insensitive",
			},
		},
	});

	return NextResponse.json(products);
}
