import { IPost } from "@/shared/types/post";
import { Clock3 } from "lucide-react";
import Link from "next/link";
import React from "react";

export const BlogCard: React.FC<IPost> = ({
	id,
	title,
	slug,
	description,
	imageUrl,
	tag,
	readTime,
	createdAt,
}) => {
	return (
		<Link href={`/blog/${slug}`} className="flex flex-col gap-3">
			<div>
				<div className="flex items-center gap-2">
					<Clock3 />
					{readTime && readTime} мин
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<h2 className="text-2xl font-bold">{title && title}</h2>
				<p>{description && description}</p>
			</div>
			{/* <Image src={imageUrl} width={500} height={400} alt={title && title} /> */}
		</Link>
	);
};
