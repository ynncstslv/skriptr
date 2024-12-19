import { currentUser } from '@clerk/nextjs/server';
import { ConvexHttpClient } from 'convex/browser';
import React from 'react';
import { api } from '../../../../convex/_generated/api';
import Link from 'next/link';
import { Blocks, Code2, Sparkles } from 'lucide-react';
import ThemeSelector from './ThemeSelector';
import LanguageSelector from './LanguageSelector';
import { SignedIn } from '@clerk/nextjs';
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
			<div className="flex items-center justify-center mb-4 px-8 py-6 rounded-lg bg-gray-950/50 shadow-xl backdrop-blur-xl lg:justify-between">
				<div className="hidden items-center gap-16 lg:flex">
					<Link href="/" className="group relative flex items-center gap-3">
						<div className="absolute -inset-2 rounded-lg blur-3xl opacity-0 bg-gradient-to-r from-indigo-800 to-indigo-900/80 transition-all duration-500 group-hover:opacity-100" />
						<div className="relative p-2 rounded-xl ring-1 ring-gray-700 bg-gradient-to-br from-gray-900 to-gray-950 transition-all group-hover:ring-gray-500">
							<Blocks className="size-6 text-indigo-300 transform -rotate-6 transition-transform duration-500 group-hover:rotate-0" />
						</div>
						<div className="flex flex-col">
							<span className="block text-xl font-semibold tracking-wide text-transparent bg-gradient-to-r from-indigo-300 via-indigo-200 to-purple-300 bg-clip-text">
								Skriptr
							</span>
							<span className="block text-xs font-medium tracking-wider text-gray-300">
								Interactive Code Editor
							</span>
						</div>
					</Link>
					<nav className="flex items-center space-x-1">
						<Link
							href="/snippets"
							className="group relative flex items-center gap-2 px-4 py-1.5 text-gray-200 border rounded-lg border-gray-300 shadow-lg bg-gray-950 overflow-hidden transition-all duration-300 hover:border-indigo-600 hover:bg-indigo-950"
						>
							<div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 to-indigo-500/70 transition-opacity opacity-0 group-hover:opacity-100" />
							<Code2 className="size-4 relative z-10 transition-colors group-hover:text-indigo-100" />
							<span className="relative text-sm font-light tracking-wide z-10 transition-colors group-hover:text-indigo-100">
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
					<SignedIn>
						<RunButton />
					</SignedIn>
					{!convexUser?.isPro && (
						<Link
							href="/pricing"
							className="group flex items-center gap-2 px-4 py-1.5 border rounded-lg border-yellow-500/40 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 transition-all duration-300 hover:border-yellow-500/50 hover:from-yellow-500/30 hover:to-orange-500/30"
						>
							<Sparkles className="size-4 text-yellow-400 group-hover:text-yellow-300" />
							<span className="text-sm font-light tracking-wide text-yellow-400 group-hover:text-yellow-300">
								Pro
							</span>
						</Link>
					)}
					<div className="h-7 pl-4 border-l border-gray-700">
						<HeaderProfileButton />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Header;
