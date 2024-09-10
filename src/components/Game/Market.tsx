'use client';

import React from 'react';
import { Commodity } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ArrowUpIcon, ArrowDownIcon } from '@radix-ui/react-icons';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/locales/translations';
import { cn } from '@/lib/utils';

interface MarketProps {
    market: Commodity[];
    onBuy: (commodityId: string, quantity: number) => void;
    playerMoney: number;
}

const Market: React.FC<MarketProps> = ({ market, onBuy, playerMoney }: MarketProps) => {
    const { t, language } = useLanguage();
    const [quantities, setQuantities] = React.useState<{ [key: string]: string }>({});
    const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
    const [buyError, setBuyError] = React.useState<string | null>(null);

    const handleQuantityChange = (commodityId: string, value: string) => {
        setQuantities({ ...quantities, [commodityId]: value });
        validateQuantity(commodityId, value);
    };

    const validateQuantity = (commodityId: string, value: string) => {
        const quantity = parseInt(value);
        const commodity = market.find(c => c.id === commodityId);
        if (!commodity) return;

        const maxQuantity = Math.floor(playerMoney / commodity.price);

        if (isNaN(quantity) || quantity < 0) {
            setErrors({ ...errors, [commodityId]: t('invalid_quantity') });
        } else if (quantity > maxQuantity) {
            setErrors({ ...errors, [commodityId]: t('insufficient_funds') });
        } else {
            setErrors({ ...errors, [commodityId]: '' });
        }
    };

    const handleBuy = (commodityId: string) => {
        const commodity = market.find(c => c.id === commodityId);
        if (!commodity) return;

        console.log("commodity: ", commodity);

        const quantity = window.innerWidth < 768 ? 1 : (parseInt(quantities[commodityId]) || 1);
        console.log("quantity: ", quantity);

        const totalCost = commodity.price * quantity;

        if (totalCost > playerMoney) {
            setBuyError(t('insufficient_funds_to_buy'));
            setTimeout(() => setBuyError(null), 3000); // 3秒后清除错误消息
        } else if (!errors[commodityId]) {
            onBuy(commodityId, quantity);
            setQuantities({ ...quantities, [commodityId]: '' });
            setBuyError(null);
        }
    };

    const handleMaxQuantity = (commodityId: string) => {
        const commodity = market.find(c => c.id === commodityId);
        if (!commodity) return;
        const maxQuantity = Math.floor(playerMoney / commodity.price);
        console.log("maxQuantity: ", maxQuantity);
        setQuantities({ ...quantities, [commodityId]: maxQuantity.toString() });
        validateQuantity(commodityId, maxQuantity.toString());
    };

    const commodityList = translations[language].commodityList;

    return (
        <div className="market bg-blue-50 p-2 sm:p-4 rounded-lg">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 text-blue-800">{t('market')}</h2>
            {buyError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-2 sm:px-4 py-2 sm:py-3 rounded relative mb-2 sm:mb-4 text-sm sm:text-base" role="alert">
                    <strong className="font-bold">{t('tips')}:</strong>
                    <span className="block sm:inline"> {buyError}</span>
                </div>
            )}
            <div className="overflow-x-auto">
                <ScrollArea className="h-[calc(100vh-200px)] sm:h-[500px]">
                    <Table>
                        <TableHeader className="sticky top-0 bg-blue-50 z-10">
                            <TableRow>
                                <TableHead className="text-blue-600 whitespace-nowrap text-xs sm:text-sm">{t('commodity')}</TableHead>
                                <TableHead className="text-blue-600 whitespace-nowrap text-xs sm:text-sm">{t('current_price')}</TableHead>
                                <TableHead className="text-blue-600 whitespace-nowrap hidden xl:table-cell text-xs sm:text-sm">{t('last_price')}</TableHead>
                                <TableHead className="text-blue-600 whitespace-nowrap hidden xl:table-cell text-xs sm:text-sm">{t('quantity')}</TableHead>
                                <TableHead className="text-blue-600 whitespace-nowrap text-xs sm:text-sm">{t('operation')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {market.map(commodity => {
                                const priceChange = commodity.lastPrice !== undefined ? commodity.price - commodity.lastPrice : 0;
                                const priceColor = priceChange > 0 ? 'text-red-500' : priceChange < 0 ? 'text-green-500' : 'text-gray-500';
                                return (
                                    <TableRow key={commodity.id}>
                                        <TableCell className="whitespace-nowrap text-xs sm:text-sm">{commodityList[commodity.id]}</TableCell>
                                        <TableCell className={`${priceColor} whitespace-nowrap text-xs sm:text-sm`}>
                                            {commodity.price.toFixed(2)}
                                            {priceChange !== 0 && (
                                                priceChange > 0 ? <ArrowUpIcon className="inline ml-1 w-3 h-3 sm:w-4 sm:h-4" /> : <ArrowDownIcon className="inline ml-1 w-3 h-3 sm:w-4 sm:h-4" />
                                            )}
                                        </TableCell>
                                        <TableCell className="whitespace-nowrap hidden xl:table-cell text-xs sm:text-sm">
                                            {commodity.lastPrice !== undefined ? `${commodity.lastPrice.toFixed(2)}` : t('no_data')}
                                        </TableCell>
                                        <TableCell className="hidden xl:table-cell">
                                            <div className="flex flex-col">
                                                <div className="flex items-center">
                                                    <Input
                                                        type="number"
                                                        value={quantities[commodity.id] || ''}
                                                        onChange={(e) => handleQuantityChange(commodity.id, e.target.value)}
                                                        className={cn(
                                                            "w-12 md:w-14 lg:w-16 mr-1 md:mr-2 text-xs sm:text-sm",
                                                            errors[commodity.id] ? "border-red-500" : ""
                                                        )}
                                                        min={0}
                                                        max={Math.floor(playerMoney / commodity.price)}
                                                    />
                                                    <Button
                                                        onClick={() => handleMaxQuantity(commodity.id)}
                                                        className="bg-blue-500 hover:bg-blue-600 text-xs px-1 md:px-2 py-1"
                                                    >
                                                        {t('max')}
                                                    </Button>
                                                </div>
                                                {errors[commodity.id] && (
                                                    <span className="text-red-500 text-xs mt-1">{errors[commodity.id]}</span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() => handleBuy(commodity.id)}
                                                className="bg-green-500 hover:bg-green-600 w-full text-xs sm:text-sm px-1 sm:px-2 py-1"
                                            >
                                                {t('buy')}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </ScrollArea>
            </div>
        </div>
    );
};

export default Market;