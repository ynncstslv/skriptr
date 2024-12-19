'use client';

import { useCodeEditorStore } from '@/store/useCodeEditorStore';
import {
	Cat,
	CircleOff,
	Cloud,
	Droplet,
	Laptop,
	Moon,
	Palette,
	Sun,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { THEMES } from '../_constants';
import { AnimatePresence, motion } from 'framer-motion';

const THEME_ICONS: Record<string, React.ReactNode> = {
	'vs-dark': <Moon className="size-4" />,
	'vs-light': <Sun className="size-4" />,
	dracula: <Droplet className="size-4" />,
	'github-dark': <Cat className="size-4" />,
	monokai: <Laptop className="size-4" />,
	'solarized-dark': <Cloud className="size-4" />,
};

function ThemeSelector() {
	const [isOpen, setIsOpen] = useState(false);
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useCodeEditorStore();
	const currentTheme = THEMES.find((t) => t.id === theme);
	const dropdownRef = useRef<HTMLDivElement>(null);

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

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<div className="relative" ref={dropdownRef}>
			<motion.button
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
				onClick={() => setIsOpen(!isOpen)}
				className="group w-48 relative flex items-center px-4 py-1.5 border rounded-lg border-gray-600/30 shadow-lg transition-all duration-200 bg-gray-800/40 hover:border-white/20 hover:bg-indigo-900/10"
			>
				<div className="absolute inset-0 rounded-lg opacity-0 bg-gradient-to-r from-gray-700/5 to-gray-900/10 transition-opacity group-hover:opacity-100" />
				<Palette className="w-4 h-4 text-gray-600 transition-colors group-hover:text-white" />
				<span className="min-w-[80px] px-2.5 text-md font-medium text-gray-600 transition-colors group-hover:text-white">
					{currentTheme?.label}
				</span>
				<div
					className="w-4 h-4 relative border rounded-full border-gray-700 transition-colors group-hover:border-white/20"
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
						className="w-full min-w-[240px] absolute top-full left-0 mt-2 py-2 border rounded-xl border-gray-700 z-50 shadow-xl bg-gray-950 backdrop-blur-xl"
					>
						<div className="mb-2 px-2 pb-2 border-b border-gray-700">
							<p className="px-2 text-xs font-medium text-gray-600">
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
								className={`group w-full relative flex items-center gap-3 px-4 py-2.5 transition-all duration-200 hover:bg-indigo-900/20 ${theme === t.id ? 'bg-indigo-950/30 text-indigo-300' : 'text-gray-600'}`}
							>
								<div className="absolute inset-0 opacity-0 transition-opacity bg-gradient-to-r from-gray-950 to-indigo-950/50 group-hover:opacity-100" />
								<div
									className={`size-8 flex items-center justify-center rounded-lg transition-all duration-200 group-hover:scale-110 group-hover:text-indigo-200 group-hover:bg-indigo-900/40 ${theme === t.id ? 'bg-indigo-900 text-indigo-300' : 'bg-gray-900/60 text-gray-600'}`}
								>
									{THEME_ICONS[t.id] || <CircleOff className="w-4 h-4" />}
								</div>
								<span className="flex-1 text-left transition-colors z-10 group-hover:text-indigo-200">
									{t.label}
								</span>
								<div
									className="w-4 h-4 relative border rounded-full border-gray-700 transition-colors group-hover:border-white/20"
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
