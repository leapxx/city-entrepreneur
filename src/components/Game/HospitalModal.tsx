import React from 'react';
import { Button } from '@/components/ui/button';
import Modal from '@/components/ui/Modal';
import { useLanguage } from '@/contexts/LanguageContext';

interface HospitalModalProps {
    isOpen: boolean;
    onClose: () => void;
    onHeal: () => void;
    playerHealth: number;
}

const HospitalModal: React.FC<HospitalModalProps> = ({ isOpen, onClose, onHeal, playerHealth }) => {
    const { t } = useLanguage();
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={t('hospital')}>
            <div className="space-y-4">
                <p className="text-lg">{t('current_health')}: {playerHealth}</p>
                <p>{t('treatment_cost')}: 100</p>
                <p>{t('recovery_health')}: 10</p>
                <Button onClick={() => {
                    onHeal();
                    onClose();
                }}>{t('accept_treatment')}</Button>
            </div>
        </Modal>
    );
};

export default HospitalModal;