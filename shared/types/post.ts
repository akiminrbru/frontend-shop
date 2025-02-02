export interface IPost {
	id: number;
	title: string;
	slug: string;
	description: string;
	content: JSON | null;
	imageUrl: string;
	tag: string;
	readTime: number;
	createdAt: Date;
}
