import React from 'react';
import type { Metadata } from 'next';
import './global.css';
import { LanguageProvider } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export const metadata: Metadata = {
    title: '百万富豪成长之路',
    description: '百万富豪成长之路',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="zh">
            <LanguageProvider>
                <body className="min-h-screen bg-background font-sans antialiased">
                    <div className="container mx-auto px-4 flex flex-col min-h-screen">
                        <header className="py-4 flex flex-col sm:flex-row justify-between items-center">
                            <h1 className="text-2xl font-bold mb-2 sm:mb-0">百万富豪成长之路</h1>
                            <LanguageSwitcher />
                        </header>
                        <main className="flex-grow">
                            {children}
                        </main>
                        <footer className="py-4 text-center text-sm">
                            <p>© {new Date().getFullYear()} 百万富豪成长之路</p>
                        </footer>
                    </div>
                </body>
            </LanguageProvider>
        </html>
    );
}
