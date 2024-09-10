import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import './global.css';
import { LanguageProvider } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export const metadata: Metadata = {
    title: 'Journey to Millionaire',
    description: 'Learn how to become a millionaire with our step-by-step guide and expert advice.',
    keywords: 'millionaire, wealth, financial success, investment, personal finance',
    openGraph: {
        title: 'Journey to Millionaire',
        description: 'Learn how to become a millionaire with our step-by-step guide and expert advice.',
        type: 'website',
        url: 'https://millionaire-roadmap.net',
        images: [
            {
                url: 'https://millionaire-roadmap.net/favicon.ico',
                width: 1200,
                height: 630,
                alt: 'Journey to Millionaire',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Journey to Millionaire',
        description: 'Learn how to become a millionaire with our step-by-step guide and expert advice.',
        images: ['https://millionaire-roadmap.net/favicon.ico'],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <LanguageProvider>
                <body className="min-h-screen bg-background font-sans antialiased">
                    <div className="container mx-auto px-4 flex flex-col min-h-screen">
                        <header className="py-4 flex flex-col sm:flex-row justify-between items-center">
                            <h1 className="text-2xl font-bold mb-2 sm:mb-0">Journey to Millionaire</h1>
                            <LanguageSwitcher />
                        </header>
                        <main className="flex-grow">
                            {children}
                        </main>
                        <footer className="py-4 text-center text-sm">
                            <p>© {new Date().getFullYear()} Journey to Millionaire</p>
                        </footer>
                    </div>
                </body>
            </LanguageProvider>
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-2YP4FVY01K"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-2YP4FVY01K');
                `}
            </Script>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
        </html>
    );
}
