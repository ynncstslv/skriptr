import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import ConvexClientProvider from '@/components/providers/ConvexClientProvider';
import Footer from '@/components/Footer';

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
});

export const metadata: Metadata = {
	title: 'Skriptr | Online Code Editor',
	description:
		'An online IDE SaaS offering multi-language support built with Next.js, React, TypeScript, Tailwind CSS, Clerk, and Convex.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body
					className={`min-h-screen flex flex-col ${geistSans.variable} ${geistMono.variable} antialiased text-gray-100 bg-gradient-to-b from-black/80 to-black`}
				>
					<ConvexClientProvider>{children}</ConvexClientProvider>
					<Footer />
				</body>
			</html>
		</ClerkProvider>
	);
}
