import { RegisterForm } from "@/features/auth";
import { Container } from "@/shared/components";

export default function Register() {
	return (
		<div className="my-10">
			<Container className="flex flex-col gap-10">
				<RegisterForm />
			</Container>
		</div>
	);
}
