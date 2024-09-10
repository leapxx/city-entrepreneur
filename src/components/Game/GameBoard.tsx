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

    const { t } = useLanguage();

    return (
        <Card className="game-board bg-gradient-to-br from-purple-100 to-pink-100">
            <CardContent className="p-4 sm:p-6">
                <div className="mb-4 text-center text-lg font-semibold text-gray-800">
                    {t('gameInstruction')}
                </div>
                <StatusBar player={state.player} week={state.week} />
                <div className="game-content grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
                    <div className="w-full mx-auto">
                        <Market market={state.market} onBuy={buy} playerMoney={state.player.money} />
                    </div>
                    <div className="w-full mx-auto">
                        <Inventory inventory={state.player.inventory} market={state.market} onSell={sell} />
                    </div>
                </div>
                <FunctionButtons
                    onBankClick={handleBankClick}
                    onHospitalClick={handleHospitalClick}
                    onRandomEvent={handleRandomEvent}
                    onRestart={handleRestart}
                    onWork={handleWork}
                />
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
            </CardContent>
        </Card>
    );
};

export default GameBoard;