import { LoginForm } from "@/features/auth";
import { Container } from "@/shared/components";

export default function Login() {
	return (
		<div className="my-10">
			<Container className="flex flex-col gap-10">
				<LoginForm />
			</Container>
		</div>
	);
}
