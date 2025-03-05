import { currentUser } from '@clerk/nextjs/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../convex/_generated/api';
import Logo from '@/components/Logo';
import Link from 'next/link';
import { Code2, Sparkles } from 'lucide-react';
import ThemeSelector from './ThemeSelector';
import LanguageSelector from './LanguageSelector';
import { SignedIn } from '@clerk/nextjs';
import RunButton from './RunButton';
import HeaderProfileBtn from './HeaderProfileBtn';

async function Header() {
	const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
	const user = await currentUser();

	const convexUser = await convex.query(api.users.getUser, {
		userId: user?.id || '',
	});

	return (
		<div className="relative z-10">
			<div className="flex items-center justify-center p-6 mb-4 border border-white/10 rounded-lg bg-black backdrop-blur-xl lg:justify-between">
				<div className="hidden lg:flex lg:items-center lg:gap-14">
					<Logo />
					<nav className="flex items-center space-x-1">
						<Link
							href="/snippets"
							className="group relative flex items-center gap-2 px-4 py-1.5 rounded-lg text-white/50 border border-white/25 bg-black shadow-lg overflow-hidden transition-all duration-300 hover:border-purple-500 hover:bg-purple-500/20"
						>
							<Code2 className="size-4 relative z-10 transition-colors group-hover:text-purple-400" />
							<span className="relative text-sm font-medium z-10 transition-colors group-hover:text-purple-400">
								Snippets
							</span>
						</Link>
					</nav>
				</div>
				<div className="flex items-center gap-6">
					<div className="flex items-center gap-4">
						<ThemeSelector />
						<LanguageSelector hasAccess={Boolean(convexUser?.isPro)} />
					</div>
					<SignedIn>
						<RunButton />
					</SignedIn>
					{!convexUser?.isPro && (
						<Link
							href="/pricing"
							className="flex items-center gap-2 px-4 py-1.5 text-amber-600 rounded-lg border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-orange-500/15 transition-all duration-300 hover:text-amber-500 hover:border-amber-500/50 hover:from-amber-500/20 hover:to-orange-500/25"
						>
							<Sparkles className="size-4" />
							<span className="text-sm font-medium">Pro</span>
						</Link>
					)}
					<div className="pl-6 border-l border-white/15">
						<HeaderProfileBtn />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Header;
