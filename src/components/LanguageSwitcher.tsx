'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useLanguage();

    const languages = [
        { code: 'zh', label: '中文', flag: '🇨🇳' },
        { code: 'en', label: 'English', flag: '🇺🇸' }
    ];

    const currentLang = languages.find(lang => lang.code === language);
    const nextLang = languages.find(lang => lang.code !== language);

    return (
        <div className="relative group">
            <Button
                onClick={() => setLanguage(nextLang?.code as 'en' | 'zh')}
                variant="outline"
                size="sm"
                className={cn(
                    "min-w-[120px] gap-2 transition-all duration-300",
                    "hover:bg-accent/50 focus:ring-2 focus:ring-primary/20",
                    "border-2 shadow-sm"
                )}
                aria-label={`Switch language to ${nextLang?.label}`}
            >
                <span className="text-lg" aria-hidden="true">
                    {currentLang?.flag}
                </span>
                <span className="font-medium">
                    {currentLang?.label}
                </span>
            </Button>

            {/* 语言切换提示 */}
            <div className="absolute hidden group-hover:block top-full mt-2 p-2 bg-popover 
                          rounded-md shadow-lg border-2 text-sm text-muted-foreground
                          whitespace-nowrap">
                {language === 'en'
                    ? 'Click to switch to Chinese'
                    : '点击切换为英文'}
            </div>
        </div>
    );
};

// 导出一个带有固定位置的包装组件
export const FixedLanguageSwitcher: React.FC = () => (
    <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
    </div>
);

export default LanguageSwitcher;
