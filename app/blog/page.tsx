import { Container } from "@/shared/components";
import { BlogPage } from "@/widgets";

export default function Blog() {
	return (
		<div className="my-10">
			<Container className="flex flex-col gap-10">
				<h2 className="text-5xl font-bold">Блог</h2>
				<BlogPage />
			</Container>
		</div>
	);
}
