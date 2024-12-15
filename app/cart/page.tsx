import { Container } from "@/shared/components";
import { CartPage } from "@/widgets";

export default function Cart() {
	return (
		<div className="mt-10">
			<Container>
				<h2 className="text-3xl font-bold">Корзина</h2>
				<CartPage />
			</Container>
		</div>
	);
}
