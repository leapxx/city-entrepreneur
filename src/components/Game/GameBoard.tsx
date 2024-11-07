'use client';

import React, { useState, useEffect } from 'react';
import { useGame } from '@/hooks/useGame';
import Market from './Market';
import Inventory from './Inventory';
import StatusBar from './StatusBar';
import FunctionButtons from './FunctionButtons';
import BankModal from './BankModal';
import HospitalModal from './HospitalModal';
import EventModal from './EventModal';
import GameOverModal from './GameOverModal';
import WorkModal from './WorkModal';
import { Card, CardContent } from '@/components/ui/card';
import { getRandomEvent, getNothingEvent } from '@/utils/eventUtils';
import { GameEvent } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

const GameBoard: React.FC = () => {
    const { state, buy, sell, deposit, withdraw, loan, repay, heal, work, gameOver, gameWon, resetGame, applyEvent } = useGame();
    const { language } = useLanguage();
    const [showBankModal, setShowBankModal] = useState(false);
    const [showHospitalModal, setShowHospitalModal] = useState(false);
    const [showEventModal, setShowEventModal] = useState(false);
    const [currentEvent, setCurrentEvent] = useState<GameEvent | null>(null);
    const [showGameOverModal, setShowGameOverModal] = useState(false);
    const [showWorkModal, setShowWorkModal] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        if (gameOver || gameWon) {
            setShowGameOverModal(true);
        }
    }, [gameOver, gameWon]);

    const handleBankClick = () => {
        setShowBankModal(true);
    };

    const handleHospitalClick = () => {
        setShowHospitalModal(true);
    };

    const handleRestart = () => {
        resetGame(); // 调用 useGame 中的 resetGame 函数
        setShowGameOverModal(false);
    };

    const handleWork = () => {
        setShowWorkModal(true);
    };

    const handleRandomEvent = () => {
        if (Math.random() < 0.5) { // 修正为 50% 触发概率
            const event = getRandomEvent(language);
            setCurrentEvent(event);
            setShowEventModal(true);
            applyEvent(event); // 应用事件效果
        } else {
            const event = getNothingEvent(language);
            setCurrentEvent(event);
            setShowEventModal(true);
            applyEvent(event); // 应用事件效果
        }
    };

    const handleCloseGameOverModal = () => {
        setShowGameOverModal(false);
    };

    return (
        <Card>
            <CardContent className="p-2 sm:p-6 space-y-2">
                {/* 游戏标题和说明 */}
                <div id="game" className="text-center space-y-2 rounded-xl p-2">
                    <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                        {t('gameTitle')}
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        {t('gameInstruction')}
                    </p>
                    <div className="text-sm text-primary/60">
                        {t('contactInfo')}
                        <a href="mailto:support@millionaire-roadmap.net"
                            className="text-primary hover:text-primary/80 underline decoration-dotted">
                            support@millionaire-roadmap.net
                        </a>
                    </div>
                </div>

                {/* 状态栏 */}
                <StatusBar player={state.player} week={state.week} />

                {/* 主游戏区域 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="game-panel backdrop-blur-sm border-primary/10">
                        <Market
                            market={state.market}
                            onBuy={buy}
                            playerMoney={state.player.money}
                        />
                    </div>
                    <div className="game-panel backdrop-blur-sm border-primary/10">
                        <Inventory
                            inventory={state.player.inventory}
                            market={state.market}
                            onSell={sell}
                        />
                    </div>
                </div>

                {/* 功能按钮 */}
                <div className="flex justify-center">
                    <FunctionButtons
                        onBankClick={() => setShowBankModal(true)}
                        onHospitalClick={() => setShowHospitalModal(true)}
                        onRandomEvent={handleRandomEvent}
                        onRestart={handleRestart}
                        onWork={handleWork}
                    />
                </div>

                {/* 游戏说明 */}
                <div id="tutorial" className="space-y-6 pt-6">
                    <h3 className="game-title flex items-center gap-2">
                        <span className="text-2xl">📖</span>
                        {t('howToPlay')}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* 基础玩法 */}
                        <div className="game-card">
                            <h4 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
                                <span>🎮</span> {t('tutorial_basics')}
                            </h4>
                            <ul className="space-y-2 text-muted-foreground">
                                <li className="flex items-start gap-2 hover:text-foreground transition-colors">
                                    <span className="text-primary">1.</span>
                                    {t('step1')}
                                </li>
                                <li className="flex items-start gap-2 hover:text-foreground transition-colors">
                                    <span className="text-primary">2.</span>
                                    {t('step2')}
                                </li>
                                <li className="flex items-start gap-2 hover:text-foreground transition-colors">
                                    <span className="text-primary">3.</span>
                                    {t('step3')}
                                </li>
                            </ul>
                        </div>

                        {/* 进阶技巧 */}
                        <div className="game-card">
                            <h4 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
                                <span>💡</span> {t('tutorial_advanced')}
                            </h4>
                            <ul className="space-y-2 text-muted-foreground">
                                <li className="flex items-start gap-2 hover:text-foreground transition-colors">
                                    <span className="text-primary">4.</span>
                                    {t('step4')}
                                </li>
                                <li className="flex items-start gap-2 hover:text-foreground transition-colors">
                                    <span className="text-primary">5.</span>
                                    {t('step5')}
                                </li>
                            </ul>
                        </div>

                        {/* 游戏目标 */}
                        <div className="game-card">
                            <h4 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
                                <span>🎯</span> {t('tutorial_goals')}
                            </h4>
                            <ul className="space-y-2 text-muted-foreground">
                                <li className="flex items-start gap-2 hover:text-foreground transition-colors">
                                    <span className="text-primary">6.</span>
                                    {t('step6')}
                                </li>
                                <li className="flex items-start gap-2 hover:text-foreground transition-colors">
                                    <span className="text-primary">7.</span>
                                    {t('step7')}
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* 提示和建议 */}
                    <div className="bg-accent/30 rounded-lg p-4">
                        <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                            <span>💪</span> {t('tutorial_tips')}
                        </h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                                <span className="text-success">✓</span>
                                {t('tip1')}
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-success">✓</span>
                                {t('tip2')}
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-success">✓</span>
                                {t('tip3')}
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-success">✓</span>
                                {t('tip4')}
                            </li>
                        </ul>
                    </div>
                </div>
            </CardContent>

            {/* 模态框 */}
            {showBankModal && (
                <BankModal
                    isOpen={showBankModal}
                    onClose={() => setShowBankModal(false)}
                    cash={state.player.money}
                    balance={state.bankAccount.savings}
                    wealth={state.player.wealth}
                    loan={state.bankAccount.loan}
                    onDeposit={deposit}
                    onWithdraw={withdraw}
                    onLoan={loan}
                    onRepay={repay}
                />
            )}
            {showHospitalModal && (
                <HospitalModal
                    isOpen={showHospitalModal}
                    onClose={() => setShowHospitalModal(false)}
                    cash={state.player.money}
                    onHeal={heal}
                    playerHealth={state.player.health}
                />
            )}
            {showWorkModal && (
                <WorkModal
                    isOpen={showWorkModal}
                    onClose={() => setShowWorkModal(false)}
                    reputation={state.player.reputation}
                    onWork={work}
                />
            )}
            {showEventModal && currentEvent && (
                <EventModal
                    isOpen={showEventModal}
                    onClose={() => setShowEventModal(false)}
                    event={currentEvent}
                />
            )}
            {(gameOver || gameWon) && (
                <GameOverModal
                    isOpen={showGameOverModal}
                    onClose={handleRestart}
                    won={gameWon}
                    finalWealth={state.player.wealth}
                    finalHealth={state.player.health}
                    finalReputation={state.player.reputation}
                    onRestart={handleRestart}
                />
            )}
        </Card>
    );
};

export default GameBoard;