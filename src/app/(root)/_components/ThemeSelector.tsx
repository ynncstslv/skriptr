'use client';

import { useCodeEditorStore } from '@/store/useCodeEditorStore';
import { useEffect, useRef, useState } from 'react';
import { FaGithubAlt, FaLaptopCode, FaRegMoon, FaRegSun } from 'react-icons/fa';
import { GiSolarSystem, GiVampireDracula } from 'react-icons/gi';
import { THEMES } from '../_constants';
import useMounted from '@/hooks/useMounted';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleOff, Palette } from 'lucide-react';

const THEME_ICONS: Record<string, React.ReactNode> = {
	'vs-dark': <FaRegMoon className="size-4" />,
	'vs-light': <FaRegSun className="size-4" />,
	dracula: <GiVampireDracula className="size-4" />,
	'github-dark': <FaGithubAlt className="size-4" />,
	monokai: <FaLaptopCode className="size-4" />,
	'solarized-dark': <GiSolarSystem className="size-4" />,
};

function ThemeSelector() {
	const [isOpen, setIsOpen] = useState(false);

	const { theme, setTheme } = useCodeEditorStore();
	const currentTheme = THEMES.find((t) => t.id === theme);

	const dropdownRef = useRef<HTMLDivElement>(null);

	const mounted = useMounted();

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	if (!mounted) return null;

	return (
		<div className="relative" ref={dropdownRef}>
			<motion.button
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
				onClick={() => setIsOpen(!isOpen)}
				className="group relative flex items-center px-4 py-1.5 border rounded-lg border-gray-300 shadow-lg transition-all duration-200 bg-gray-900 hover:border-indigo-600 hover:bg-indigo-950"
			>
				<div className="absolute inset-0 rounded-lg opacity-0 bg-gradient-to-r from-indigo-950/40 to-indigo-950 transition-opacity group-hover:opacity-100" />
				<Palette className="size-4 text-gray-300 transition-colors z-10 group-hover:text-white" />
				<span className="min-w-[80px] px-2.5 text-sm font-light tracking-wide text-gray-300 transition-colors z-10 group-hover:text-white">
					{currentTheme?.label}
				</span>
				<div
					className="size-4 relative border rounded-full border-gray-300 transition-colors group-hover:border-white"
					style={{ background: currentTheme?.color }}
				/>
			</motion.button>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: 8, scale: 0.96 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 8, scale: 0.96 }}
						transition={{ duration: 0.4 }}
						className="w-full min-w-[240px] absolute top-full left-0 mt-2 py-2 border rounded-xl border-indigo-300 z-50 shadow-xl bg-gray-950/50 backdrop-blur-xl"
					>
						<div className="mb-2 px-2 pb-2 border-b border-indigo-300">
							<p className="px-2 text-xs font-light tracking-wider text-indigo-300">
								Select Theme
							</p>
						</div>
						{THEMES.map((t, index) => (
							<motion.button
								key={t.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: index * 0.1 }}
								onClick={() => setTheme(t.id)}
								className={`group w-full relative flex items-center gap-3 px-4 py-2.5 transition-all duration-200 hover:bg-indigo-950/10 ${theme === t.id ? 'bg-gray-950 text-indigo-200' : 'text-gray-500'}`}
							>
								<div className="absolute inset-0 bg-gradient-to-r from-indigo-950/50 to-indigo-950 opacity-0 transition-opacity group-hover:opacity-100" />
								<div
									className={`size-8 flex items-center justify-center rounded-lg transition-all duration-200 group-hover:scale-110 group-hover:text-indigo-200/40 group-hover:bg-indigo-900 ${theme === t.id ? 'bg-indigo-600 text-indigo-300' : 'bg-gray-800/50 text-gray-500'}`}
								>
									{THEME_ICONS[t.id] || <CircleOff className="w-4 h-4" />}
								</div>
								<span className="flex-1 text-left transition-colors z-10 group-hover:text-indigo-200/40">
									{t.label}
								</span>
								<div
									className="size-4 relative border rounded-full border-gray-300 transition-colors group-hover:border-white"
									style={{ background: t.color }}
								/>
								{theme === t.id && (
									<motion.div
										transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
									/>
								)}
							</motion.button>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

export default ThemeSelector;
