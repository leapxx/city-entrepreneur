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

interface MarketProps {
    market: Commodity[];
    onBuy: (commodityId: string, quantity: number) => void;
    playerMoney: number;
}

const Market: React.FC<MarketProps> = ({ market, onBuy, playerMoney }: MarketProps) => {
    const { t, language } = useLanguage();
    const [quantities, setQuantities] = React.useState<{ [key: string]: number }>({});

    const handleQuantityChange = (commodityId: string, value: number) => {
        setQuantities({ ...quantities, [commodityId]: value });
    };

    const handleBuy = (commodityId: string) => {
        onBuy(commodityId, quantities[commodityId] || 1);
        setQuantities({ ...quantities, [commodityId]: 0 });
    };
    const commodityList = translations[language].commodityList;

    return (
        <div className="market bg-blue-50 p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-800">{t('market')}</h2>
            <ScrollArea className="h-[500px]">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-blue-600">{t('commodity')}</TableHead>
                            <TableHead className="text-blue-600">{t('current_price')}</TableHead>
                            <TableHead className="text-blue-600 hidden sm:table-cell">{t('last_price')}</TableHead>
                            <TableHead className="text-blue-600">{t('quantity')}</TableHead>
                            <TableHead className="text-blue-600">{t('operation')}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {market.map(commodity => {
                            const priceChange = commodity.lastPrice !== undefined ? commodity.price - commodity.lastPrice : 0;
                            const priceColor = priceChange > 0 ? 'text-red-500' : priceChange < 0 ? 'text-green-500' : 'text-gray-500';
                            return (
                                <TableRow key={commodity.id}>
                                    <TableCell className="whitespace-nowrap">{commodityList[commodity.id]}</TableCell>
                                    <TableCell className={`${priceColor} whitespace-nowrap`}>
                                        {commodity.price.toFixed(2)}
                                        {priceChange !== 0 && (
                                            priceChange > 0 ? <ArrowUpIcon className="inline ml-1" /> : <ArrowDownIcon className="inline ml-1" />
                                        )}
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell whitespace-nowrap">
                                        {commodity.lastPrice !== undefined ? `${commodity.lastPrice.toFixed(2)}` : t('no_data')}
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            type="number"
                                            value={quantities[commodity.id] || 0}
                                            onChange={(e) => handleQuantityChange(commodity.id, parseInt(e.target.value) || 0)}
                                            className="w-full"
                                            min={0}
                                            max={Math.floor(playerMoney / commodity.price)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleBuy(commodity.id)} className="bg-green-500 hover:bg-green-600 w-full text-sm px-2 py-1">{t('buy')}</Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </ScrollArea>
        </div>
    );
};

export default Market;