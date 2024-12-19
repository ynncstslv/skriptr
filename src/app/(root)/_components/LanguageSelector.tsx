'use client';

import { useCodeEditorStore } from '@/store/useCodeEditorStore';
import { useEffect, useRef, useState } from 'react';
import { LANGUAGE_CONFIG } from '../_constants';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronDownIcon, Lock, Sparkles } from 'lucide-react';
import useMounted from '@/hooks/useMounted';

function LanguageSelector({ hasAccess }: { hasAccess: boolean }) {
	const [isOpen, setIsOpen] = useState(false);
	const { language, setLanguage } = useCodeEditorStore();
	const currentLanguageObj = LANGUAGE_CONFIG[language];
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

	const handleLanguageSelect = (langId: string) => {
		if (!hasAccess && langId !== 'javascript') return;

		setLanguage(langId);
		setIsOpen(false);
	};

	if (!mounted) return null;

	return (
		<div className="relative" ref={dropdownRef}>
			<motion.button
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
				onClick={() => setIsOpen(!isOpen)}
				className={`"group relative flex items-center px-4 py-1.5 border rounded-lg border-gray-600/30 shadow-lg transition-all duration-200 bg-gray-800/40 hover:border-white/20 hover:bg-indigo-900/10" ${!hasAccess && language !== 'javascript' ? 'opacity-50 cursor-not-allowed' : ''}`}
			>
				<div
					className="absolute inset-0 rounded-lg opacity-0 bg-gradient-to-r from-gray-700/5 to-gray-900/10 transition-opacity group-hover:opacity-100"
					aria-hidden="true"
				/>
				<div className="size-6 p-0.5 rounded-md bg-gray-800/50 transition-transform group-hover:scale-110">
					<Image
						src={currentLanguageObj.logoPath}
						alt="programming language logo"
						width={24}
						height={24}
						className="w-full h-full object-contain relative z-10"
					/>
				</div>
				<span className="min-w-[80px] px-3 text-md font-medium text-gray-600 transition-colors group-hover:text-white">
					{currentLanguageObj.label}
				</span>
				<ChevronDownIcon
					className={`size-4 text-gray-600 transition-all duration-300 group-hover:text-white/20 ${isOpen ? 'rotate-180' : ''}`}
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
											className={`group w-full relative flex items-center gap-3 px-4 py-2.5 transition-all duration-200 ${language === lang.id ? 'bg-indigo-950/30 text-indigo-300' : 'text-gray-600'} ${isLocked ? 'opacity-50' : 'hover:bg-indigo-900/20'}`}
											disabled={isLocked}
											onClick={() => handleLanguageSelect(lang.id)}
										>
											<div className="absolute inset-0 opacity-0 transition-opacity bg-gradient-to-r from-gray-950 to-indigo-950/50 group-hover:opacity-100" />
											<div
												className={`size-8 flex items-center justify-center rounded-lg transition-all duration-200 group-hover:scale-110 group-hover:text-indigo-200 group-hover:bg-indigo-900/40 ${language === lang.id ? 'bg-indigo-900 text-indigo-300' : 'bg-gray-900/60 text-gray-600'}`}
											>
												<Image
													width={24}
													height={24}
													src={lang.logoPath}
													alt={`${lang.label} logo`}
													className="w-full h-full object-contain relative z-10"
												/>
											</div>
											<span className="flex-1 text-left transition-colors z-10 group-hover:text-indigo-200">
												{lang.label}
											</span>
											{language === lang.id && (
												<motion.div
													className="absolute inset-0 border-2 border-gray-700 rounded-lg"
													transition={{
														type: 'spring',
														bounce: 0.2,
														duration: 0.6,
													}}
												/>
											)}
											{isLocked ? (
												<Lock className="w-4 h-4 text-gray-700" />
											) : (
												<Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
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
