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
    const [amount, setAmount] = useState<number>(0);

    const maxDeposit = cash; // 最大存款额
    const maxWithdraw = balance; // 最大取款额
    const maxLoan = wealth; // 最大贷款额

    const handleDeposit = () => {
        if (amount > maxDeposit) {
            alert(`${t('not_enough_money')}`);
            return;
        }
        onDeposit(amount);
        setAmount(0);
    };

    const handleWithdraw = () => {
        if (amount > maxWithdraw) {
            alert(`${t('not_enough_money')}`);
            return;
        }
        onWithdraw(amount);
        setAmount(0);
    };

    const handleLoan = () => {
        if (amount > maxLoan * 10) {
            alert(`${t('not_enough_money')}`);
            return;
        }
        onLoan(amount);
        setAmount(0);
    };

    const handleRepay = () => {
        if (amount > loan) {
            alert(`${t('not_enough_money')}`);
            return;
        }
        onRepay(amount);
        setAmount(0);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="银行">
            <div className="space-y-4">
                <p className="text-lg">{t('bank_balance')}: {balance.toFixed(2)}</p>
                <p className="text-lg">{t('current_cash')}: {cash.toFixed(2)}</p>
                <p className="text-lg">{t('current_loan')}: {loan.toFixed(2)}</p>
                <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    placeholder={t('input_amount')}
                />
                <div className="flex space-x-2">
                    <Button onClick={handleDeposit}>{t('deposit')}</Button>
                    <Button onClick={handleWithdraw}>{t('withdraw')}</Button>
                    <Button onClick={handleLoan}>{t('loan')}</Button>
                    <Button onClick={handleRepay}>{t('repay')}</Button>
                </div>
            </div>
        </Modal>
    );
};

export default BankModal;