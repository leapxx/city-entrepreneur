'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
    const { t } = useLanguage();
    const currentYear = new Date().getFullYear();

    return (
        <footer id="about" className="w-full bg-card/95 backdrop-blur-sm border-t-2">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* 左侧：关于游戏 */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-primary">
                            {t('footer_about')}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {t('footer_description')}
                        </p>
                    </div>

                    {/* 中间：快速链接 */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-primary">
                            {t('footer_quickLinks')}
                        </h3>
                        <ul className="space-y-2">
                            <FooterLink href="#privacy">{t('footer_privacy')}</FooterLink>
                            <FooterLink href="#terms">{t('footer_terms')}</FooterLink>
                            <FooterLink href="#contact">{t('footer_contact')}</FooterLink>
                        </ul>
                    </div>

                    {/* 右侧：联系方式 */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-primary">
                            {t('footer_contact')}
                        </h3>
                        <div className="space-y-2 text-sm text-muted-foreground">
                            <p>Email: support@millionaire-roadmap.net</p>
                            <div className="flex space-x-4">
                                <SocialLink href="#" icon="twitter" label="Twitter" />
                                <SocialLink href="#" icon="github" label="GitHub" />
                                <SocialLink href="#" icon="discord" label="Discord" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 版权信息 */}
                <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
                    <p>© {currentYear} Journey to Millionaire. {t('footer_rights')}</p>
                </div>
            </div>
        </footer>
    );
};

// 页脚链接组件
const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <li>
        <a
            href={href}
            className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
        >
            {children}
        </a>
    </li>
);

// 社交媒体链接组件
const SocialLink: React.FC<{ href: string; icon: string; label: string }> = ({ href, icon, label }) => (
    <a
        href={href}
        className="hover:text-primary transition-colors duration-200"
        aria-label={label}
    >
        <span className="sr-only">{label}</span>
        {icon === 'twitter' && '𝕏'}
        {icon === 'github' && '🐙'}
        {icon === 'discord' && '💬'}
    </a>
);

export default Footer; 