import { Blocks } from 'lucide-react';
import Link from 'next/link';
import { FaGithub, FaInstagram, FaLinkedin, FaRegUser } from 'react-icons/fa';

function Footer() {
	return (
		<footer className="relative mt-auto border-t border-gray-800/50">
			<div className="h-px absolute inset-x-0 -top-px bg-gradient-to-r from-transparent via-gray-500 to-transparent" />
			<div className="max-w-7xl px-4 py-6 mx-auto">
				<div className="flex flex-col items-center justify-between gap-4 md:flex-row">
					<div className="flex flex-col items-center text-gray-400 gap-1 md:items-start">
						<div className="hidden md:flex items-center gap-2">
							<Blocks className="size-5" />
							<span className="text-lg font-extrabold tracking-tighter">
								Skriptr
							</span>
						</div>
						<span className="text-xs text-gray-500">
							By developers. For developers.
						</span>
					</div>

					<div className="flex items-center gap-6">
						<Link href="https://ynncstslv.dev/">
							<FaRegUser className="size-4 text-gray-400 transition-colors hover:text-gray-300" />
						</Link>
						<Link href="https://github.com/ynncstslv/">
							<FaGithub className="size-4 text-gray-400 transition-colors hover:text-gray-300" />
						</Link>
						<Link href="https://linkedin.com/in/ynncstslv/">
							<FaLinkedin className="size-4 text-gray-400 transition-colors hover:text-gray-300" />
						</Link>
						<Link href="https://instagram.com/ynncstslv/">
							<FaInstagram className="size-4 text-gray-400 transition-colors hover:text-gray-300" />
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
