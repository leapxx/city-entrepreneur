import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Modal from '@/components/ui/Modal';
import { useLanguage } from '@/contexts/LanguageContext';

interface BankModalProps {
    isOpen: boolean;
    onClose: () => void;
    cash: number;
    balance: number;
    wealth: number;
    loan: number;
    onDeposit: (amount: number) => void;
    onWithdraw: (amount: number) => void;
    onLoan: (amount: number) => void;
    onRepay: (amount: number) => void;
}

const BankModal: React.FC<BankModalProps> = ({ isOpen, onClose, cash, balance, wealth, loan, onDeposit, onWithdraw, onLoan, onRepay }) => {
    const { t } = useLanguage();
    const [amount, setAmount] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const maxDeposit = cash; // 最大存款额
    const maxWithdraw = balance; // 最大取款额
    const maxLoan = wealth; // 最大贷款额

    const showError = (message: string) => {
        setError(message);
        setTimeout(() => setError(null), 3000); // 3秒后清除错误消息
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            setAmount(value);
        }
    };

    const handleAction = (action: 'deposit' | 'withdraw' | 'loan' | 'repay') => {
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount <= 0) {
            showError(t('invalid_amount'));
            return;
        }

        switch (action) {
            case 'deposit':
                if (numAmount > maxDeposit) {
                    showError(t('insufficient_funds_to_deposit'));
                    return;
                }
                onDeposit(numAmount);
                break;
            case 'withdraw':
                if (numAmount > maxWithdraw) {
                    showError(t('insufficient_funds_to_withdraw'));
                    return;
                }
                onWithdraw(numAmount);
                break;
            case 'loan':
                if (numAmount > maxLoan * 10) {
                    showError(t('insufficient_funds_to_loan'));
                    return;
                }
                onLoan(numAmount);
                break;
            case 'repay':
                if (numAmount > loan) {
                    showError(t('insufficient_funds_to_repay'));
                    return;
                }
                onRepay(numAmount);
                break;
        }
        setAmount('');
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={t('bank')}>
            <div className="space-y-4">
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">{t('tips')}:</strong>
                        <span className="block sm:inline"> {error}</span>
                    </div>
                )}
                <p className="text-lg">{t('bank_balance')}: {balance.toFixed(2)}</p>
                <p className="text-lg">{t('current_cash')}: {cash.toFixed(2)}</p>
                <p className="text-lg">{t('current_loan')}: {loan.toFixed(2)}</p>
                <Input
                    type="text"
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder={t('input_amount')}
                />
                <div className="flex space-x-2">
                    <Button onClick={() => handleAction('deposit')}>{t('deposit')}</Button>
                    <Button onClick={() => handleAction('withdraw')}>{t('withdraw')}</Button>
                    <Button onClick={() => handleAction('loan')}>{t('loan')}</Button>
                    <Button onClick={() => handleAction('repay')}>{t('repay')}</Button>
                </div>
            </div>
        </Modal>
    );
};

export default BankModal;