'use client';

import { useCodeEditorStore } from '@/store/useCodeEditorStore';
import { useEffect, useRef, useState } from 'react';
import { LANGUAGE_CONFIG } from '../_constants';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronDown, Lock, Sparkles } from 'lucide-react';
import useMounted from '@/hooks/useMounted';

function LanguageSelector({ hasAccess }: { hasAccess: boolean }) {
	const [isOpen, setIsOpen] = useState(false);
	const { language, setLanguage } = useCodeEditorStore();
	const dropdownRef = useRef<HTMLDivElement>(null);
	const mounted = useMounted();

	const currentLanguageObj = LANGUAGE_CONFIG[language];

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
				className={`group w-44 relative flex items-center gap-3 px-4 py-2.5 border border-white/25 rounded-lg bg-black transition-all duration-200 hover:border-white hover:bg-white/5 ${!hasAccess && language !== 'javascript' ? 'opacity-50 cursor-not-allowed' : ''}`}
			>
				<div className="size-5 p-0.5 rounded-md transition-transform group-hover:scale-110">
					<Image
						src={currentLanguageObj.logoPath}
						alt={currentLanguageObj.label}
						width={24}
						height={24}
						className="w-full h-full object-contain relative z-10"
					/>
				</div>
				<span className=" min-w-[85px] text-sm font-bold text-left tracking-tight text-white/75 transition-colors group-hover:text-white">
					{currentLanguageObj.label}
				</span>
				<ChevronDown
					className={`size-4 text-white/40 transition-all duration-300 group-hover:text-white ${isOpen ? 'rotate-180' : ''}`}
				/>
			</motion.button>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: 8, scale: 0.96 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 8, scale: 0.96 }}
						transition={{ duration: 0.2 }}
						className="w-64 absolute top-full left-0 py-2 mt-2 border rounded-xl border-white/25 bg-black shadow-2xl backdrop-blur-xl z-50"
					>
						<div className="px-2 pb-2 mb-2 border-b border-white/25">
							<p className="px-2 text-xs font-medium text-white/40">
								Select Language
							</p>
						</div>
						<div className="max-h-[280px] overflow-x-hidden overflow-y-auto">
							{Object.values(LANGUAGE_CONFIG).map((lang, index) => {
								const isLocked = !hasAccess && lang.id !== 'javascript';

								return (
									<motion.div
										key={lang.id}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ delay: index * 0.1 }}
										className="group relative"
									>
										<button
											className={`w-full relative flex items-center gap-3 px-3 py-2.5 transition-all duration-200 ${language === lang.id ? ' bg-neutral-900/45 text-emerald-400' : 'text-neutral-500'} ${isLocked ? 'opacity-40' : 'hover:bg-neutral-900/50'}`}
											disabled={isLocked}
											onClick={() => handleLanguageSelect(lang.id)}
										>
											<div
												className={`size-8 relative p-1.5 rounded-lg transition-transform group-hover:scale-110 ${language === lang.id ? 'bg-neutral-500/10' : 'bg-neutral-800/50'}`}
											>
												<Image
													src={lang.logoPath}
													alt={`${lang.label} logo`}
													width={24}
													height={24}
													className="w-full h-full object-contain relative z-10"
												/>
											</div>
											<span className="flex-1 text-sm text-left transition-colors group-hover:text-white">
												{lang.label}
											</span>
											{isLocked ? (
												<Lock className="size-4 text-neutral-500" />
											) : (
												language === lang.id && (
													<Sparkles className="size-4 text-emerald-400 animate-pulse" />
												)
											)}
										</button>
										{language === lang.id && (
											<motion.div
												className="absolute inset-0 border border-emerald-500/20"
												transition={{
													type: 'spring',
													bounce: 0.2,
													duration: 0.6,
												}}
											/>
										)}
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
