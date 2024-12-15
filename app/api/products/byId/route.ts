import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const id = Number(req.nextUrl.searchParams.get("id") || "");

	const product = await prisma.product.findFirst({
		where: {
			id: {
				equals: id,
			},
		},
		include: {
			category: true,
			brand: true,
			reviews: true,
		},
	});

	return NextResponse.json(product);
}
