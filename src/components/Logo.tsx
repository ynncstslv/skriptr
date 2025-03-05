import { Blocks } from 'lucide-react';
import Link from 'next/link';

export default function Logo() {
	return (
		<>
			<Link href="/" className="group relative flex items-center gap-3">
				<div className="relative p-2 rounded-xl ring-1 ring-white/15 bg-gradient-to-br from-[] to-[] transition-all group-hover:ring-gray-300">
					<Blocks className="size-7 text-white transform -rotate-6 transition-transform duration-500 group-hover:rotate-0" />
				</div>
				<div className="flex flex-col">
					<span className="block text-xl font-extrabold tracking-tight">
						Skriptr
					</span>
					<span className="block text-xs font-mediu text-gray-300">
						Online Code Editor
					</span>
				</div>
			</Link>
		</>
	);
}
