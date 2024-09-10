'use client';

import React from 'react';
import { Player } from '@/types';
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';

interface StatusBarProps {
    player: Player;
    week: number;
}

const StatusBar: React.FC<StatusBarProps> = ({ player, week }) => {
    const { t } = useLanguage();

    return (
        <Card className="status-bar mb-4">
            <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 space-y-2 sm:space-y-0">
                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 w-full sm:w-auto">
                    <span className="font-bold">{week + 17} {t('age')}</span>
                    <span className={player.wealth <= 0 ? 'text-red-500' : ''}>{t('assets')}: {player.wealth.toFixed(2)}</span>
                </div>
                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                    <span className={player.money <= 0 ? 'text-red-500' : ''}>{t('cash')}: {player.money.toFixed(2)}</span>
                    <span className={player.health === 0 ? 'text-red-500' : ''}>{t('health')}: {player.health}</span>
                    <span className={player.reputation <= 0 ? 'text-red-500' : ''}>{t('reputation')}: {player.reputation}</span>
                </div>
            </CardContent>
        </Card>
    );
};

export default StatusBar;