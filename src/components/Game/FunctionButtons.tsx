import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface FunctionButtonsProps {
    onBankClick: () => void;
    onHospitalClick: () => void;
    onRandomEvent: () => void;
    onRestart: () => void;
    onWork: () => void;
}

const FunctionButtons: React.FC<FunctionButtonsProps> = ({ onBankClick, onHospitalClick, onRandomEvent, onRestart, onWork }) => {
    const { t } = useLanguage();
    const handleButtonClick = (action: () => void) => {
        action();
        onRandomEvent(); // 每次点击按钮都有机会触发随机事件
    };

    return (
        <div className="function-buttons mt-4 flex flex-wrap justify-center gap-2">
            <Button variant="secondary" onClick={() => handleButtonClick(() => { })}>{t('second_hand_market')}</Button>
            <Button variant="secondary" onClick={() => handleButtonClick(() => { })}>{t('farmers_market')}</Button>
            <Button variant="secondary" onClick={() => handleButtonClick(() => { })}>{t('wholesale_market')}</Button>
            <Button variant="secondary" onClick={onBankClick}>{t('bank')}</Button>
            <Button variant="secondary" onClick={onHospitalClick}>{t('hospital')}</Button>
            <Button variant="secondary" onClick={() => handleButtonClick(() => { })}>{t('sales_department')}</Button>
            <Button variant="default" onClick={onWork}>{t('work')}</Button>
            <Button variant="destructive" onClick={onRestart}>{t('restart')}</Button>
        </div>
    );
};

export default FunctionButtons;