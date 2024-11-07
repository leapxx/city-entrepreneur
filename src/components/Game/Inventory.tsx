'use client';

import React from 'react';
import { Commodity, InventoryItem } from '@/types/index';
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
import { ScrollArea } from "@/components/ui/scroll-area"
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/locales/translations';
import { cn } from '@/lib/utils';

interface InventoryProps {
    inventory: InventoryItem[];
    market: Commodity[];
    onSell: (commodityId: string, quantity: number) => void;
}

const Inventory: React.FC<InventoryProps> = ({ inventory, market, onSell }) => {
    const { t, language } = useLanguage();
    const [quantities, setQuantities] = React.useState<{ [key: string]: string }>({});
    const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

    const handleQuantityChange = (commodityId: string, value: string) => {
        const numValue = parseInt(value);
        const item = inventory.find(i => i.commodityId === commodityId);

        if (numValue < 0 || numValue > (item?.quantity || 0)) {
            setErrors({ ...errors, [commodityId]: t('invalid_quantity') });
        } else {
            setErrors({ ...errors, [commodityId]: '' });
        }

        setQuantities({ ...quantities, [commodityId]: value });
    };

    const handleSell = (commodityId: string) => {
        const isMobile = window.innerWidth < 768;
        const quantity = isMobile ? 1 : (parseInt(quantities[commodityId]) || 1);
        const item = inventory.find(i => i.commodityId === commodityId);

        if (quantity > 0 && quantity <= (item?.quantity || 0)) {
            onSell(commodityId, quantity);
            setQuantities({ ...quantities, [commodityId]: '' });
        }
    };

    const handleMaxQuantity = (commodityId: string) => {
        const item = inventory.find(i => i.commodityId === commodityId);
        if (item) {
            setQuantities({ ...quantities, [commodityId]: item.quantity.toString() });
            setErrors({ ...errors, [commodityId]: '' });
        }
    };

    const commodityList = translations[language].commodityList;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="game-title">{t('inventory')}</h2>
            </div>

            <div className="overflow-x-auto">
                <ScrollArea className="h-[500px]">
                    <Table>
                        <TableHeader className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
                            <TableRow>
                                <TableHead className="text-primary/80">{t('commodity')}</TableHead>
                                <TableHead className="text-primary/80">{t('quantity')}</TableHead>
                                <TableHead className="text-primary/80">{t('average_price')}</TableHead>
                                <TableHead className="text-primary/80 hidden md:table-cell">{t('sell_quantity')}</TableHead>
                                <TableHead className="text-primary/80">{t('operation')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {inventory.map(item => (
                                <TableRow key={item.commodityId} className="hover:bg-accent/50 transition-colors">
                                    <TableCell className="font-medium">
                                        {commodityList[item.commodityId]}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {item.quantity}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {item.averagePrice.toFixed(2)}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    type="number"
                                                    value={quantities[item.commodityId] || ''}
                                                    onChange={(e) => handleQuantityChange(item.commodityId, e.target.value)}
                                                    className={cn(
                                                        "w-24",
                                                        errors[item.commodityId] ? "border-destructive" : ""
                                                    )}
                                                    min={0}
                                                    max={item.quantity}
                                                />
                                                <Button
                                                    onClick={() => handleMaxQuantity(item.commodityId)}
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    {t('max')}
                                                </Button>
                                            </div>
                                            {errors[item.commodityId] && (
                                                <span className="text-destructive text-xs">
                                                    {errors[item.commodityId]}
                                                </span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() => handleSell(item.commodityId)}
                                            variant="game"
                                            size="sm"
                                            className="w-full"
                                        >
                                            {t('sell')}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </ScrollArea>
            </div>
        </div>
    );
};

export default Inventory;
