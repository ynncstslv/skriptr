import { Blocks } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
	return (
		<footer className="relative mt-auto border-t border-gray-800">
			<div className="h-px absolute -top-px inset-x-0 bg-gradient-to-r from-transparent via-indigo-300 to-transparent"></div>
			<div>
				<div className="max-w-7xl mx-auto px-4 py-8">
					<div className="flex flex-col items-center justify-between gap-4 md:flex-row">
						<div className="flex items-center gap-2 text-gray-600">
							<div className="flex items-center gap-3">
								<Blocks size={22} />
								<span className="font-extrabold text-lg">Skriptr</span>
							</div>
							<span className="text-sm"> | For developers. By developers.</span>
						</div>
						<div className="flex items-center justify-between gap-24 text-gray-600 md:gap-6">
							<span className="text-sm md:text-md">© 2024 ynncstslv</span>
							<div className="flex flex-row gap-4">
								<Link
									href="https://github.com/ynncstslv/"
									target="_blank"
									className="hover:text-indigo-300 transition-colors"
								>
									<FaGithub size={22} />
								</Link>
								<Link
									href="https://linkedin.com/in/ynncstslv/"
									target="_blank"
									className="hover:text-indigo-300 transition-colors"
								>
									<FaLinkedin size={22} />
								</Link>
								<Link
									href="https://instagram.com/ynncstslv/"
									target="_blank"
									className="hover:text-indigo-300 transition-colors"
								>
									<FaInstagram size={22} />
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
