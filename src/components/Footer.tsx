import { Blocks } from 'lucide-react';
import Link from 'next/link';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
	return (
		<footer className="relative mt-auto border-t border-indigo-800">
			<div className="h-px absolute -top-px inset-x-0 bg-gradient-to-r from-indigo-950 via-indigo-300 to-indigo-950" />
			<>
				<div className="max-w-7xl mx-auto px-4 py-8">
					<div className="flex flex-col items-center justify-between gap-4 md:flex-row">
						<div className="flex items-center gap-2 text-gray-500">
							<div className="flex items-center gap-3">
								<Blocks className="size-5 md:size-7" />
								<span className="font-semibold tracking-wide md:text-xl">
									Skriptr
								</span>
							</div>
							<span className="text-sm font-light tracking-wide md:text-md">
								{' '}
								| For developers. By developers.
							</span>
						</div>
						<div className="flex flex-col items-center justify-center gap-6 text-gray-500 md:flex-row md:justify-between">
							<span className="text-xs md:text-sm">
								All Rights Reserved © 2024 ynncstslv
							</span>
							<div className="flex flex-two gap-4">
								<Link
									href="https://github.com/ynncstslv/"
									target="_blank"
									className="hover:text-indigo-200 transition-colors"
								>
									<FaGithub className="size-5 md:size-7" />
								</Link>
								<Link
									href="https://linkedin.com/in/ynncstslv/"
									target="_blank"
									className="hover:text-indigo-200 transition-colors"
								>
									<FaLinkedin className="size-5 md:size-7" />
								</Link>
								<Link
									href="https://instagram.com/ynncstslv/"
									target="_blank"
									className="hover:text-indigo-200 transition-colors"
								>
									<FaInstagram className="size-5 md:size-7" />
								</Link>
							</div>
						</div>
					</div>
				</div>
			</>
		</footer>
	);
}

export default Footer;
