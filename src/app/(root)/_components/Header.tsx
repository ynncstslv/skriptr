import { currentUser } from '@clerk/nextjs/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../convex/_generated/api';
import Link from 'next/link';
import { Blocks, Code2, Sparkles } from 'lucide-react';
import { SignedIn } from '@clerk/nextjs';
import ThemeSelector from './ThemeSelector';
import LanguageSelector from './LanguageSelector';
import RunButton from './RunButton';
import HeaderProfileButton from './HeaderProfileButton';

async function Header() {
	const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
	const user = await currentUser();

	const convexUser = await convex.query(api.users.getUser, {
		userId: user?.id || '',
	});

	// DELETE!
	console.log({ 'convexUser: ': convexUser });

	return (
		<div className="relative z-10">
			<div className="flex items-center justify-center mb-4 px-8 py-6 rounded-lg bg-[#0a0a0f]/80 backdrop-blur-xl lg:justify-between">
				<div className="hidden items-center gap-10 lg:flex">
					<Link href="/" className="relative flex items-center gap-3 group">
						<div className="absolute rounded-lg -inset-2 opacity-0 bg-gradient-to-r from-blue-500/50 to-indigo-500/60 blur-3xl transition-all duration-500 group-hover:opacity-100" />
						<div className="relative p-2 rounded-xl ring-1 ring-white/30 bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] transition-all group-hover:ring-white/40">
							<Blocks className="size-6 text-indigo-300 transform -rotate-6 transition-transform duration-500 group-hover:rotate-0" />
						</div>
						<div className="flex flex-col">
							<span className="block text-xl font-extrabold tracking-wide text-transparent bg-gradient-to-r from-indigo-300 via-indigo-200 to-purple-400 bg-clip-text">
								Skriptr
							</span>
							<span className="block text-xs font-medium tracking-wider text-indigo-300/60">
								Interactive Code Editor
							</span>
						</div>
					</Link>
					<nav className="flex items-center space-x-1">
						<Link
							href="/snippets"
							className="group relative flex items-center gap-2 px-4 py-1.5 text-gray-300 border rounded-lg border-gray-600/30 shadow-lg bg-gray-800/40 overflow-hidden transition-all duration-300 hover:border-white/20 hover:bg-indigo-500/10"
						>
							<div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 to-purple-500/20 transition-opacity opacity-0 group-hover:opacity-100" />
							<Code2 className="w-4 h-4 relative -rotate-6 z-10 transition-transform group-hover:rotate-0" />
							<span className="relative text-sm font-medium tracking-wider z-10 transition-colors group-hover:text-white">
								Snippets
							</span>
						</Link>
					</nav>
				</div>
				<div className="flex items-center gap-4">
					<div className="flex items-center gap-3">
						<ThemeSelector />
						<LanguageSelector hasAccess={Boolean(convexUser?.isPro)} />
					</div>
					{!convexUser?.isPro && (
						<Link
							href="/pricing"
							className="flex items-center gap-2 px-4 py-1.5 border rounded-lg border-amber-500/20 bg-gradient-to-r from-amber-500/10 to-orange-500/10 transition-all duration-300 hover:border-amber-500/40 hover:from-amber-500/20 hover:to-orange-500/20"
						>
							<Sparkles className="w-4 h-4 text-amber-400 hover:text-amber-300" />
							<span className="text-sm font-medium tracking-wider text-amber-400/90 hover:text-amber-300">
								Pro
							</span>
						</Link>
					)}
					<SignedIn>
						<RunButton />
					</SignedIn>
					<div className="h-7 pl-4 border-l border-gray-600">
						<HeaderProfileButton />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Header;
