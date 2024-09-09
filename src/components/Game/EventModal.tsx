import React from 'react';
import { Button } from '@/components/ui/button';
import Modal from '@/components/ui/Modal';
import { GameEvent } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

interface EventModalProps {
    isOpen: boolean;
    onClose: () => void;
    event: GameEvent;
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, event }) => {
    const { t } = useLanguage();
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={t('event')}>
            <div className="space-y-4">
                <p className="text-lg font-semibold">{event.description}</p>
                <p className="text-sm text-gray-600">{t('event_type')}: {getEventTypeText(event.type)}</p>
                <Button onClick={onClose}>{t('confirm')}</Button>
            </div>
        </Modal>
    );
};

function getEventTypeText(type: string): string {
    const { t } = useLanguage();
    switch (type) {
        case 'economic':
            return t('economic');
        case 'health':
            return t('health');
        case 'reputation':
            return t('reputation');
        case 'financial':
            return t('financial');
        default:
            return t('unknown');
    }
}

export default EventModal;