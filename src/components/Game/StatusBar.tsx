'use client';

import React from 'react';
import { Player } from '@/types';
import { Card } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from "@/lib/utils";
import {
    HeartIcon,
    PersonIcon,
    TimerIcon,
    CircleIcon
} from "@radix-ui/react-icons";

interface StatusBarProps {
    player: Player;
    week: number;
}

const StatusBar: React.FC<StatusBarProps> = ({ player, week }) => {
    const { t } = useLanguage();
    const age = week + 17;

    // 计算各项属性的百分比
    const healthPercentage = (player.health / 100) * 100;
    const reputationPercentage = (player.reputation / 100) * 100;
    const agePercentage = ((age - 17) / 52) * 100; // 17-69岁的进度

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 左侧：主要状态 */}
            <Card className="backdrop-blur-sm border-primary/10 game-panel">
                <div className="flex flex-col space-y-3">
                    {/* 年龄和时间 */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <TimerIcon className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium">{t('age')}:</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-bold">{age}</span>
                            <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary transition-all duration-500"
                                    style={{ width: `${agePercentage}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* 健康值 */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <HeartIcon className="w-4 h-4 text-destructive" />
                            <span className="text-sm font-medium">{t('health')}:</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={cn(
                                "text-lg font-bold",
                                player.health <= 20 ? "text-destructive" :
                                    player.health <= 50 ? "text-warning" :
                                        "text-success"
                            )}>{player.health}</span>
                            <div className="relative w-32 h-2 bg-muted rounded-full">
                                <div
                                    className="h-full bg-primary transition-all duration-500"
                                    style={{ width: `${Math.max(0, Math.min(100, (player.health / 100) * 100))}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* 声望 */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <PersonIcon className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium">{t('reputation')}:</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={cn(
                                "text-lg font-bold",
                                player.reputation <= 20 ? "text-destructive" :
                                    player.reputation <= 50 ? "text-warning" :
                                        "text-success"
                            )}>{player.reputation}</span>
                            <div className="relative w-32 h-2 bg-muted rounded-full">
                                <div
                                    className="h-full bg-primary transition-all duration-500"
                                    style={{ width: `${reputationPercentage}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* 右侧：财务状态 */}
            <Card className="backdrop-blur-sm border-primary/10 game-panel">
                <div className="flex flex-col space-y-3">
                    {/* 总资产 */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <CircleIcon className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium">{t('assets')}:</span>
                        </div>
                        <span className={cn(
                            "text-lg font-bold font-mono",
                            player.wealth < 0 ? "text-destructive" : "text-success"
                        )}>
                            ${player.wealth.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                    </div>

                    {/* 现金 */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <CircleIcon className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium">{t('cash')}:</span>
                        </div>
                        <span className={cn(
                            "text-lg font-bold font-mono",
                            player.money < 0 ? "text-destructive" : "text-primary"
                        )}>
                            ${player.money.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                    </div>

                    {/* 进度提示 */}
                    <div className="mt-2 text-sm text-muted-foreground text-center">
                        {player.wealth >= 1000000 ? (
                            <span className="text-success">🎉 {t('game_won')}</span>
                        ) : (
                            <span>
                                {((player.wealth / 1000000) * 100).toFixed(2)}% {t('gameProgress')}
                            </span>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default StatusBar;