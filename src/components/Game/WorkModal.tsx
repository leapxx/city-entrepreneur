// WorkModal.tsx
// 工作界面，展示工作列表（工作列表是随机生成的），选择工作，工作完成后，获得金钱

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Modal from '@/components/ui/Modal';
import { Work } from '@/types';
import { newWorkList } from '@/utils/workUtils';
import { useLanguage } from '@/contexts/LanguageContext';

interface WorkModalProps {
    isOpen: boolean;
    onClose: () => void;
    onWork: (salary: number, healthCost: number) => void;
}

const WorkModal: React.FC<WorkModalProps> = ({ isOpen, onClose, onWork }) => {
    const { t, language } = useLanguage();
    const [workList, setWorkList] = useState<Work[]>(newWorkList);
    const [isWorking, setIsWorking] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const workCompletedRef = useRef(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    const handleSelectWork = (work: Work) => {
        // 根据工作的拒绝率判断是否被拒绝
        const isRejected = Math.random() < work.rejectionRate;

        if (isRejected) {
            // 如果被拒绝，显示消息并不开始工作
            alert(t('work_rejected'));
            return;
        }

        setIsWorking(true);
        setTimeLeft(work.duration);
        workCompletedRef.current = false;

        timerRef.current = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    if (timerRef.current) {
                        clearInterval(timerRef.current);
                    }
                    setIsWorking(false);
                    if (!workCompletedRef.current) {
                        workCompletedRef.current = true;
                        // 使用 setTimeout 来延迟调用 onWork
                        setTimeout(() => onWork(work.salary, work.healthCost), 0);
                    }
                    onClose();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={t('work')}>
            <div className="space-y-4">
                {!isWorking ? (
                    <>
                        <h3 className="text-lg font-semibold">{t('available_work')}:</h3>
                        <ul className="space-y-2">
                            {workList.map((work) => (
                                <li key={work.id} className="flex justify-between items-center">
                                    <span>{t(work.nameKey)} - {work.salary}</span>
                                    <Button onClick={() => handleSelectWork(work)}>{t('select')}</Button>
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <div className="text-center">
                        <p>{t('working')}</p>
                        <p>{t('remaining_time')}: {timeLeft} {t('seconds')}</p>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default WorkModal;

