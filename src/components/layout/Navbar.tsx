'use client';

import React from 'react';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

const Navbar = () => {
    const { t } = useLanguage();

    return (
        <nav className="w-full bg-card/95 backdrop-blur-sm border-b-2 fixed top-0 z-40">
            <div className="container mx-auto px-4">
                <div className="h-16 flex items-center justify-between">
                    {/* Logo 和标题 - 添加可点击链接 */}
                    <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-xl">💰</span>
                        </div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                            {t('title')}
                        </h1>
                    </Link>

                    {/* 导航链接 */}
                    <div className="hidden md:flex items-center space-x-6">
                        <NavLink href="#game">{t('nav_play')}</NavLink>
                        <NavLink href="#tutorial">{t('nav_tutorial')}</NavLink>
                        <NavLink href="#about">{t('nav_about')}</NavLink>
                    </div>

                    {/* 右侧工具栏 */}
                    <div className="flex items-center space-x-4">
                        <LanguageSwitcher />
                    </div>
                </div>
            </div>
        </nav>
    );
};

// 导航链接组件
const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <a
        href={href}
        className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm font-medium"
    >
        {children}
    </a>
);

export default Navbar; 