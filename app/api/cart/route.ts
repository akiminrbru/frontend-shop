import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	try {
		const token = req.cookies.get("cartToken")?.value;

		if (!token) {
			return NextResponse.json({ totalAmount: 0, items: [] });
		}

		let userCart = await prisma.cart.findFirst({
			where: {
				token: token,
			},
			include: {
				items: {
					include: {
						productItem: {
							include: {
								category: true,
								brand: true,
							},
						},
					},
				},
			},
		});

		return NextResponse.json(userCart);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Не удалось получить корзину" }, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	try {
		let token = req.cookies.get("cartToken")?.value;

		if (!token) {
			token = crypto.randomUUID();
		}

		let userCart = await prisma.cart.findFirst({
			where: {
				token: token,
			},
		});

		if (!userCart) {
			userCart = await prisma.cart.create({
				data: {
					token: token,
				},
			});
		}

		const productItemId = (await req.json()).productItemId;

		const findCartItem = await prisma.cartItem.findFirst({
			where: {
				cartId: userCart.id,
				productItemId: productItemId,
			},
		});

		let addedCartItem;

		if (findCartItem) {
			addedCartItem = await prisma.cartItem.update({
				where: {
					id: findCartItem.id,
				},
				data: {
					quantity: {
						increment: 1,
					},
				},
			});
		} else {
			addedCartItem = await prisma.cartItem.create({
				data: {
					cartId: userCart.id,
					productItemId: productItemId,
				},
			});
		}

		const resp = NextResponse.json(addedCartItem);
		resp.cookies.set("cartToken", token);
		return resp;
	} catch (error) {
		console.log("[CART_POST] Server error", error);
		return NextResponse.json({ message: "Не удалось создать корзину" }, { status: 500 });
	}
}

export async function DELETE(req: NextRequest) {
	try {
		const token = req.cookies.get("cartToken")?.value;

		if (!token) {
			return NextResponse.json({ error: "Отсутствует токен" }, { status: 500 });
		}

		const id = (await req.json()).id;

		console.log(id);

		let cartItem = await prisma.cartItem.findFirst({
			where: {
				id: id,
			},
		});

		if (!cartItem) {
			return NextResponse.json({ error: "Товар не найден" });
		}

		await prisma.cartItem.delete({
			where: {
				id: id,
			},
		});

		return NextResponse.json("Товар удален");
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Не удалось удалить товар" }, { status: 500 });
	}
}

export async function PATCH(req: NextRequest) {
	try {
		const id = (await req.json()).id;
		const type: "minus" | "plus" = (await req.json()).type;
		const token = req.cookies.get("cartToken")?.value;

		if (!token) {
			return NextResponse.json({ error: "Отсутствует токен" }, { status: 500 });
		}

		console.log("id", id);
		console.log("type", type);

		let cartItem = await prisma.cartItem.findFirst({
			where: {
				id: id,
			},
		});

		if (!cartItem) {
			return NextResponse.json({ error: "Товар не найден" });
		}

		if (type === "minus") {
			await prisma.cartItem.update({
				where: {
					id: id,
				},
				data: {
					quantity: {
						decrement: 1,
					},
				},
			});
		}

		if (type === "plus") {
			await prisma.cartItem.update({
				where: {
					id: id,
				},
				data: {
					quantity: {
						increment: 1,
					},
				},
			});
		}

		return NextResponse.json("Количество товара обновлено");
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ message: "Не удалось обновить количество товара" },
			{ status: 500 }
		);
	}
}
