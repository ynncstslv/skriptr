'use client';

import { useCodeEditorStore } from '@/store/useCodeEditorStore';
import { useEffect, useState } from 'react';
import { defineMonacoThemes, LANGUAGE_CONFIG } from '../_constants';
import { Editor } from '@monaco-editor/react';
import Image from 'next/image';
import { RotateCcw, Share, Type } from 'lucide-react';
import { motion } from 'framer-motion';
import useMounted from '@/hooks/useMounted';
import { useClerk } from '@clerk/nextjs';
import EditorPanelSkeleton from './EditorPanelSkeleton';
import ShareSnippetDialog from './ShareSnippetDialog';

function EditorPanel() {
	const clerk = useClerk();
	const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
	const { language, theme, fontSize, editor, setFontSize, setEditor } =
		useCodeEditorStore();

	const mounted = useMounted();

	useEffect(() => {
		const savedCode = localStorage.getItem(`editor-code-${language}`);
		const newCode = savedCode || LANGUAGE_CONFIG[language].defaultCode;

		if (editor) editor.setValue(newCode);
	}, [language, editor]);

	useEffect(() => {
		const savedFontSize = localStorage.getItem('editor-font-size');
		if (savedFontSize) setFontSize(parseInt(savedFontSize));
	}, [setFontSize]);

	const handleRefresh = () => {
		const defaultCode = LANGUAGE_CONFIG[language].defaultCode;
		if (editor) editor.setValue(defaultCode);

		localStorage.removeItem(`editor-code-${language}`);
	};

	const handleEditorChange = (value: string | undefined) => {
		if (value) localStorage.setItem(`editor-code-${language}`, value);
	};

	const handleFontSizeChange = (newSize: number) => {
		const size = Math.min(Math.max(newSize, 12), 24);
		setFontSize(size);

		localStorage.setItem('editor-font-size', size.toString());
	};

	if (!mounted) return null;

	return (
		<div className="relative">
			<div className="relative p-6 border border-white/10 rounded-xl backdrop-blur bg-black">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center gap-3">
						<div className="size-10 flex items-center justify-center rounded-lg ring-1 ring-white/20 bg-neutral-900/50">
							<Image
								src={`/${language}.png`}
								alt="Programming Language Logo"
								width={28}
								height={28}
							/>
						</div>
						<div>
							<h2 className="text-sm font-bold text-white">Code Editor</h2>
							<p className="text-xs text-white/40">
								Write & Execute your code.
							</p>
						</div>
					</div>
					<div className="flex items-center gap-3">
						<div className="flex items-center gap-3 px-3 py-2 rounded-lg ring-1 ring-white/20 bg-neutral-900/50">
							<Type className="size-4 text-neutral-400" />
							<div className="flex items-center gap-3">
								<input
									type="range"
									min="12"
									max="24"
									value={fontSize}
									onChange={(e) =>
										handleFontSizeChange(parseInt(e.target.value))
									}
									className="w-20 h-1 rounded-lg bg-neutral-900 cursor-pointer"
								/>
								<span className="min-w-[2rem] text-sm text-center text-neutral-400">
									{fontSize}
								</span>
							</div>
						</div>
						<motion.button
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.95 }}
							onClick={handleRefresh}
							className="p-2.5 rounded-lg ring-1 ring-white/20 bg-neutral-900/50 transititon-colors hover:bg-neutral-900"
							aria-label="Reset to default code"
						>
							<RotateCcw className="size-4 text-neutral-400" />
						</motion.button>
						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							onClick={() => setIsShareDialogOpen(true)}
							className="inline-flex items-center gap-2 px-4 py-2 border border-blue-500 rounded-lg bg-gradient-to-br from-blue-900 to-blue-950/20 overflow-hidden opacity-90 transition-opacity hover:opacity-100"
						>
							<Share className="size-4 text-white" />
							<span className="text-sm text-white">Share</span>
						</motion.button>
					</div>
				</div>
				<div className="relative group rounded-xl overflow-hidden ring-1 ring-white/[0.05]">
					{clerk.loaded && (
						<Editor
							height="600px"
							language={LANGUAGE_CONFIG[language].monacoLanguage}
							onChange={handleEditorChange}
							theme={theme}
							beforeMount={defineMonacoThemes}
							onMount={(editor) => setEditor(editor)}
							options={{
								minimap: { enabled: false },
								fontSize,
								automaticLayout: true,
								scrollBeyondLastLine: false,
								padding: { top: 12, bottom: 12 },
								renderWhitespace: 'selection',
								fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
								fontLigatures: true,
								cursorBlinking: 'smooth',
								smoothScrolling: true,
								contextmenu: true,
								renderLineHighlight: 'all',
								lineHeight: 1.6,
								letterSpacing: 0.5,
								roundedSelection: true,
								scrollbar: {
									verticalScrollbarSize: 8,
									horizontalScrollbarSize: 8,
								},
							}}
						/>
					)}
					{!clerk.loaded && <EditorPanelSkeleton />}
				</div>
			</div>
			{isShareDialogOpen && (
				<ShareSnippetDialog onClose={() => setIsShareDialogOpen(false)} />
			)}
		</div>
	);
}

export default EditorPanel;
