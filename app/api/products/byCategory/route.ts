import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const category = req.nextUrl.searchParams.get("category") || "";

	const products = await prisma.product.findMany({
		where: {
			category: {
				slug: {
					equals: category,
				},
			},
		},
		include: {
			category: true,
			brand: true,
		},
	});

	return NextResponse.json(products);
}
