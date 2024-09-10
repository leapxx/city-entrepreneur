import React from 'react';
import { Button } from '@/components/ui/button';
import Modal from '@/components/ui/Modal';
import { useLanguage } from '@/contexts/LanguageContext';

interface GameOverModalProps {
    isOpen: boolean;
    onClose: () => void;
    won: boolean;
    finalWealth: number;
    finalHealth: number;
    finalReputation: number;
    onRestart: () => void; // 新增的 prop
}

const GameOverModal: React.FC<GameOverModalProps> = ({ isOpen, onClose, won, finalWealth, finalHealth, finalReputation, onRestart }) => {
    const { t } = useLanguage();
    const handleRestart = () => {
        onRestart(); // 调用重新开始游戏的函数
        onClose(); // 关闭模态框
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={won ? t('game_won') : t('game_over')}>
            <div className="space-y-4">
                {won ? (
                    <p className="text-lg">{t('game_won_message')}</p>
                ) : finalHealth === 0 ? (
                    <p className="text-lg">{t('game_over_health_message')}</p>
                ) : (
                    <p className="text-lg">{t('game_over_message')}</p>
                )}
                <p className="text-md">{t('final_wealth')}: {finalWealth.toFixed(2)}</p>
                <p className="text-md">{t('final_health')}: {finalHealth}</p>
                <p className="text-md">{t('final_reputation')}: {finalReputation}</p>
                <Button onClick={handleRestart}>{t('restart')}</Button>
            </div>
        </Modal>
    );
};

export default GameOverModal;