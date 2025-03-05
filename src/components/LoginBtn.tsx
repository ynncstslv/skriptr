import { SignInButton } from '@clerk/nextjs';
import { LogIn } from 'lucide-react';

function LoginBtn() {
	return (
		<SignInButton mode="modal">
			<button className="flex items-center gap-3 px-4 py-2.5 text-sm tracking-wider border border-blue-500 rounded-lg bg-gradient-to-br from-blue-900 to-blue-950/20 transition-all duration-200 hover:border-blue-600 hover:from-blue-950 hover:to-blue-950/10">
				<LogIn className="size-4" />
				<span>Sign In</span>
			</button>
		</SignInButton>
	);
}

export default LoginBtn;
