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
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="game-title">{t('market')}</h2>
            </div>

            {buyError && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg relative mb-4" role="alert">
                    <strong className="font-medium">{t('tips')}:</strong>
                    <span className="block sm:inline ml-1">{buyError}</span>
                </div>
            )}

            <div className="overflow-x-auto">
                <ScrollArea className="h-[calc(100vh-200px)] sm:h-[500px]">
                    <Table>
                        <TableHeader className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
                            <TableRow>
                                <TableHead className="text-primary/80">{t('commodity')}</TableHead>
                                <TableHead className="text-primary/80">{t('current_price')}</TableHead>
                                <TableHead className="text-primary/80 hidden xl:table-cell">{t('last_price')}</TableHead>
                                <TableHead className="text-primary/80 hidden xl:table-cell">{t('quantity')}</TableHead>
                                <TableHead className="text-primary/80">{t('operation')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {market.map(commodity => {
                                const priceChange = commodity.lastPrice !== undefined ? commodity.price - commodity.lastPrice : 0;
                                const priceColor = priceChange > 0 ? 'text-destructive' : priceChange < 0 ? 'text-success' : 'text-muted-foreground';
                                return (
                                    <TableRow key={commodity.id} className="hover:bg-accent/50 transition-colors">
                                        <TableCell className="font-medium">
                                            {commodityList[commodity.id]}
                                        </TableCell>
                                        <TableCell className={`${priceColor} font-medium`}>
                                            {commodity.price.toFixed(2)}
                                            {priceChange !== 0 && (
                                                priceChange > 0 ?
                                                    <ArrowUpIcon className="inline ml-1 w-4 h-4 text-destructive" /> :
                                                    <ArrowDownIcon className="inline ml-1 w-4 h-4 text-success" />
                                            )}
                                        </TableCell>
                                        <TableCell className="hidden xl:table-cell text-muted-foreground">
                                            {commodity.lastPrice !== undefined ? `${commodity.lastPrice.toFixed(2)}` : t('no_data')}
                                        </TableCell>
                                        <TableCell className="hidden xl:table-cell">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center gap-2">
                                                    <Input
                                                        type="number"
                                                        value={quantities[commodity.id] || ''}
                                                        onChange={(e) => handleQuantityChange(commodity.id, e.target.value)}
                                                        className={cn(
                                                            "w-24",
                                                            errors[commodity.id] ? "border-destructive" : ""
                                                        )}
                                                        min={0}
                                                        max={Math.floor(playerMoney / commodity.price)}
                                                    />
                                                    <Button
                                                        onClick={() => handleMaxQuantity(commodity.id)}
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        {t('max')}
                                                    </Button>
                                                </div>
                                                {errors[commodity.id] && (
                                                    <span className="text-destructive text-xs">{errors[commodity.id]}</span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() => handleBuy(commodity.id)}
                                                variant="game"
                                                size="sm"
                                                className="w-full"
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