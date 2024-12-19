'use client';

import { useCodeEditorStore } from '@/store/useCodeEditorStore';
import { useEffect, useRef, useState } from 'react';
import { LANGUAGE_CONFIG } from '../_constants';
import useMounted from '@/hooks/useMounted';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDownIcon, Lock, Sparkles } from 'lucide-react';
import Image from 'next/image';

function LanguageSelector({ hasAccess }: { hasAccess: boolean }) {
	const [isOpen, setIsOpen] = useState(false);

	const { language, setLanguage } = useCodeEditorStore();
	const currentLanguage = LANGUAGE_CONFIG[language];

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

	const handleLanguageSelect = (langId: string) => {
		if (!hasAccess && langId !== 'javascript') return;

		setLanguage(langId);
		setIsOpen(false);
	};

	return (
		<div className="relative" ref={dropdownRef}>
			<motion.button
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
				onClick={() => setIsOpen(!isOpen)}
				className={`"group relative flex items-center px-4 py-1.5 border rounded-lg border-gray-300 shadow-lg transition-all duration-200 bg-gray-900 hover:border-indigo-600 hover:bg-indigo-900 ${!hasAccess && language !== 'javascript' ? 'opacity-50 cursor-not-allowed' : ''}`}
			>
				<div
					className="absolute inset-0 rounded-lg opacity-0 bg-gradient-to-r from-indigo-950/40 to-indigo-950 transition-opacity group-hover:opacity-100"
					aria-hidden="true"
				/>
				<div className="size-5 p-0.5 rounded-md bg-gray-800/50 transition-transform group-hover:scale-110">
					<Image
						width={24}
						height={24}
						src={currentLanguage.logoPath}
						alt={`${currentLanguage.label} logo`}
						className="w-full h-full object-contain relative z-10"
					/>
				</div>
				<span className="min-w-[80px] px-2.5 text-sm font-light tracking-wide text-gray-200 transition-colors z-10 group-hover:text-white">
					{currentLanguage.label}
				</span>
				<ChevronDownIcon
					className={`size-4 text-gray-500 transition-all duration-300 group-hover:text-white ${isOpen ? 'rotate-180' : ''}`}
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
								Select Language
							</p>
						</div>
						<div className="max-h-[280px] overflow-y-auto overflow-x-hidden">
							{Object.values(LANGUAGE_CONFIG).map((lang, index) => {
								const isLocked = !hasAccess && lang.id !== 'javascript';

								return (
									<motion.div
										key={lang.id}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ delay: index * 0.1 }}
										className="group relative px-2"
									>
										<button
											className={`group w-full relative flex items-center gap-3 px-4 py-2.5 transition-all duration-200 ${language === lang.id ? 'bg-indigo-950/50 text-indigo-200' : 'text-gray-500'} ${isLocked ? 'opacity-50' : 'hover:bg-indigo-950/10'}`}
											disabled={isLocked}
											onClick={() => handleLanguageSelect(lang.id)}
										>
											<div className="absolute inset-0 bg-gradient-to-r from-indigo-950/50 to-indigo-950 opacity-0 transition-opacity group-hover:opacity-100" />
											<div
												className={`size-8 flex items-center justify-center rounded-lg transition-all duration-200 group-hover:scale-110 group-hover:text-indigo-200 group-hover:bg-indigo-900/40 ${language === lang.id ? 'bg-indigo-900 text-indigo-200' : 'bg-gray-950 text-gray-500'}`}
											>
												<Image
													width={24}
													height={24}
													src={lang.logoPath}
													alt={`${lang.label} logo`}
													className="w-full h-full object-contain relative z-10"
												/>
											</div>
											<span className="flex-1 text-left transition-colors z-10 group-hover:text-indigo-200/40">
												{lang.label}
											</span>
											{language === lang.id && (
												<motion.div
													className="absolute inset-0 border-2 border-indigo-800/80 rounded-lg"
													transition={{
														type: 'spring',
														bounce: 0.2,
														duration: 0.6,
													}}
												/>
											)}
											{isLocked ? (
												<Lock className="size-4 text-gray-500" />
											) : (
												<Sparkles className="size-4 text-indigo-400 animate-pulse" />
											)}
										</button>
									</motion.div>
								);
							})}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

export default LanguageSelector;
