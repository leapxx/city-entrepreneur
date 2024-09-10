import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Modal from '@/components/ui/Modal';
import { useLanguage } from '@/contexts/LanguageContext';

interface HospitalModalProps {
    isOpen: boolean;
    onClose: () => void;
    cash: number;
    onHeal: (healCost: number, healAmount: number) => void;
    playerHealth: number;
}

const HospitalModal: React.FC<HospitalModalProps> = ({ isOpen, onClose, onHeal, playerHealth, cash }) => {
    const { t } = useLanguage();
    const [error, setError] = useState<string | null>(null);

    const baseHealCost = 1000;
    const baseHealAmount = 30;
    const maxHealAmount = 100 - playerHealth; // 最大治疗量不能超过 100 - playerHealth

    // 使用更极端的指数映射来增强健康值对花费的影响
    const healthFactor = Math.pow(1 - playerHealth / 100, 2); // 非线性增强，健康值低时，效果更明显

    // 治疗量越小，花费越大；健康值低时，花费接近 10,000,000
    const healCost = Math.max(1000, Math.floor(baseHealCost * (1 + healthFactor * 1000)));

    // 治疗量越小，效果越差；健康值越高，治疗效果越好，且不超过 maxHealAmount
    const healAmount = Math.max(1, Math.floor(Math.min(baseHealAmount * (1 - healthFactor), maxHealAmount)));

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={t('hospital')}>
            <div className="space-y-4">
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">{t('tips')}:</strong>
                        <span className="block sm:inline"> {error}</span>
                    </div>
                )}
                <p className="text-lg">{t('current_health')}: {playerHealth}</p>
                <p>{t('treatment_cost')}: {healCost}</p>
                <p>{t('recovery_health')}: {healAmount}</p>
                <Button onClick={() => {
                    if (cash >= healCost) {
                        onHeal(healCost, healAmount);
                        onClose();
                    } else {
                        setError(t('insufficient_funds_to_heal'));
                        setTimeout(() => setError(null), 3000); // 3秒后清除错误消息
                    }
                }}>{t('accept_treatment')}</Button>
            </div>
        </Modal>
    );
};

export default HospitalModal;