import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import Footer from '@/components/Footer';
import ConvexClientProvider from '@/components/providers/ConvexClientProvider';
import { Inter } from 'next/font/google';
import './globals.css';

export const metadata: Metadata = {
	title: 'Skriptr | Interactive Code Editor',
	description:
		'A SaaS interactive code editor on your browser built with Next.js 15.',
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<ClerkProvider
			publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
		>
			<html lang="en">
				<body
					className={`${inter.className} antialiased min-h-screen flex flex-col text-gray-100 bg-gradient-to-b from-indigo-900/50 to-indigo-950/10`}
				>
					<ConvexClientProvider>{children}</ConvexClientProvider>
					<Footer />
				</body>
			</html>
		</ClerkProvider>
	);
}
