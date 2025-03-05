'use client';

import { useCodeEditorStore } from '@/store/useCodeEditorStore';
import { useEffect, useRef, useState } from 'react';
import { THEMES } from '../_constants';
import { AnimatePresence, motion } from 'framer-motion';
import {
	FaCloud,
	FaGithubAlt,
	FaLaptopCode,
	FaMoon,
	FaSun,
} from 'react-icons/fa';
import { CircleOff, Palette } from 'lucide-react';
import useMounted from '@/hooks/useMounted';

const THEME_ICONS: Record<string, React.ReactNode> = {
	'vs-dark': <FaMoon className="size-4" />,
	'vs-light': <FaSun className="size-4" />,
	'github-dark': <FaGithubAlt className="size-4" />,
	monokai: <FaLaptopCode className="size-4" />,
	'solarized-dark': <FaCloud className="size-4" />,
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
				className="group w-48 relative flex items-center gap-3 px-4 py-2.5 border border-white/25 rounded-lg bg-black transition-all duration-200 hover:border-white hover:bg-white/5"
			>
				<Palette className="size-4 text-white/75 transition-colors group-hover:text-white" />
				<span className="min-w-[100px] text-sm font-bold text-left tracking-tight text-white/75 transition-colors group-hover:text-white">
					{currentTheme?.label}
				</span>
				<div
					className="size-3 relative border rounded-full border-white/75 transition-colors group-hover:border-white"
					style={{ background: currentTheme?.color }}
				/>
			</motion.button>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: 8, scale: 0.96 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 8, scale: 0.96 }}
						transition={{ duration: 0.2 }}
						className="w-full min-w-[240px] absolute top-full left-0 py-2 mt-2 border rounded-xl border-white/25 bg-black shadow-2xl backdrop-blur-xl z-50"
					>
						<div className="px-2 pb-2 mb-2 border-b border-white/25">
							<p className="px-2 text-xs font-medium text-white/40">
								Select Theme
							</p>
						</div>
						{THEMES.map((t, index) => (
							<motion.button
								key={t.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: index * 0.1 }}
								className={`group w-full relative flex items-center gap-3 px-3 py-2.5 hover:bg-neutral-900/50 transition-all duration-200 ${theme === t.id ? 'bg-neutral-900/40 text-emerald-400' : 'text-neutral-500'}`}
								onClick={() => setTheme(t.id)}
							>
								<div
									className={`flex items-center justify-center size-8 rounded-lg transition-all duration-200 ${theme === t.id ? 'bg-neutral-500/10 text-emerald-400' : 'bg-neutral-800/50 text-white/20'} group-hover:text-white group-hover:scale-110`}
								>
									{THEME_ICONS[t.id] || <CircleOff className="size" />}
								</div>
								<span className="flex-1 text-sm text-left transition-colors group-hover:text-white">
									{t.label}
								</span>
								<div
									className="relative size-3 border border-white/25 rounded-full transition-colors group-hover:border-white/50"
									style={{ background: t.color }}
								/>
								{theme === t.id && (
									<motion.div
										className="absolute inset-0 border border-emerald-500/20"
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
