import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg';
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    size = 'md'
}) => {
    const { t } = useLanguage();
    if (!isOpen) return null;

    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg'
    };

    return (
        <div className="fixed inset-0 z-50 animate-in fade-in duration-300">
            <div className="absolute inset-0 bg-background/80" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Card className={`w-full ${sizeClasses[size]} relative bg-card border-2 border-primary/20 shadow-[0_0_15px_rgba(0,0,0,0.2)] animate-in zoom-in-95 duration-300`}>
                    <Button
                        onClick={onClose}
                        className="absolute top-2 right-2 h-7 w-7 rounded-full hover:bg-destructive/20 hover:text-destructive transition-all duration-200 group"
                        variant="ghost"
                        aria-label="Close modal"
                    >
                        <span className="text-sm group-hover:scale-110 transition-transform">✕</span>
                    </Button>
                    <CardHeader className="space-y-1.5 pb-3 border-b border-primary/10 bg-card">
                        <CardTitle className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                            {title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="max-h-[70vh] overflow-y-auto pt-4 bg-card/95 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent hover:scrollbar-thumb-primary/30 transition-colors">
                        {children}
                    </CardContent>
                    <div className="flex justify-end gap-2 px-6 py-4 border-t border-primary/10 bg-muted/30">
                        <Button
                            onClick={onClose}
                            variant="outline"
                            className="hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                        >
                            {t('close')}
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Modal;