import { prisma } from "./prisma-client";
import slugify from "slugify";

async function up() {
	await prisma.category.createMany({
		data: [
			{
				name: "Смартфоны",
				slug: slugify("Смартфоны", { lower: true }),
			},
			{
				name: "Ноутбуки",
				slug: slugify("Ноутбуки", { lower: true }),
			},
		],
	});

	await prisma.brand.createMany({
		data: [
			{
				name: "Poco",
			},
			{
				name: "Samsung",
			},
			{
				name: "Apple",
			},
			{
				name: "Honor",
			},
		],
	});

	await prisma.product.createMany({
		data: [
			{
				title: "Смартфон POCO X6 5G 12/512Gb",
				slug: slugify("Смартфон POCO X6 5G 12/512Gb", { lower: true }),
				previewImage: "/assets/products/poco.webp",
				price: 30000,
				brandId: 1,
				categoryId: 1,
			},
			{
				title: "Смартфон Samsung S24+ 12/512GB",
				slug: slugify("Смартфон Samsung S24+ 12/512GB", { lower: true }),
				previewImage: "/assets/products/samsung.webp",
				price: 60000,
				brandId: 2,
				categoryId: 1,
			},
			{
				title: "Смартфон Apple iPhone 15 512Gb",
				slug: slugify("Смартфон Apple iPhone 15 512Gb", { lower: true }),
				price: 100000,
				previewImage: "/assets/products/iphone.webp",
				brandId: 3,
				categoryId: 1,
			},
			{
				title: "Ноутбук Honor MagicBook 14, 14/R7/16Gb/512Gb/DOS (5301AFVP)",
				slug: slugify("Ноутбук Honor MagicBook 14, 14/R7/16Gb/512Gb/DOS (5301AFVP)", {
					lower: true,
				}),
				previewImage: "/assets/products/honor.webp",
				price: 53980,
				brandId: 4,
				categoryId: 2,
			},
			{
				title: "Ноутбук Apple MacBook Air 13 Midnight, 13.6/M3/8Gb/256Gb/KB-EU,RU (MRXV3)",
				slug: slugify(
					"Ноутбук Apple MacBook Air 13 Midnight, 13.6/M3/8Gb/256Gb/KB-EU,RU (MRXV3)",
					{ lower: true }
				),
				previewImage: "/assets/products/macbook.webp",
				price: 113800,
				brandId: 3,
				categoryId: 2,
			},
		],
	});

	await prisma.review.createMany({
		data: [
			{
				productId: 1,
				comment: "Хороший товар, но не самый лучший",
				rating: 4,
			},
			{
				productId: 1,
				comment: "Отличный товар, все хорошо",
				rating: 5,
			},
			{
				productId: 1,
				comment: "Такой себе товар конечно, но хорошо работает",
				rating: 3,
			},
		],
	});
}

async function down() {
	await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Brand" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
}

async function main() {
	try {
		await down();
		await up();
	} catch (error) {
		console.error(error);
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (error) => {
		console.error(error);
		await prisma.$disconnect();
		process.exit(1);
	});
