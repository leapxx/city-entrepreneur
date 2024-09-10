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

interface InventoryProps {
    inventory: InventoryItem[];
    market: Commodity[];
    onSell: (commodityId: string, quantity: number) => void;
}

const Inventory: React.FC<InventoryProps> = ({ inventory, market, onSell }) => {
    const { t } = useLanguage();
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
        const quantity = isMobile ? 1 : (parseInt(quantities[commodityId]) || 0);
        const item = inventory.find(i => i.commodityId === commodityId);

        if (quantity > 0 && quantity <= (item?.quantity || 0)) {
            onSell(commodityId, quantity);
            setQuantities({ ...quantities, [commodityId]: '' });
        }
    };

    return (
        <div className="inventory bg-green-50 p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-green-800">{t('inventory')}</h2>
            <div className="overflow-x-auto">
                <ScrollArea className="h-[500px]">
                    <Table>
                        <TableHeader className="sticky top-0 bg-green-50 z-10">
                            <TableRow>
                                <TableHead className="text-green-600">{t('commodity')}</TableHead>
                                <TableHead className="text-green-600">{t('quantity')}</TableHead>
                                <TableHead className="text-green-600">{t('average_price')}</TableHead>
                                <TableHead className="text-green-600 hidden md:table-cell">{t('sell_quantity')}</TableHead>
                                <TableHead className="text-green-600">{t('operation')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {inventory.map(item => {
                                const commodity = market.find(c => c.id === item.commodityId);
                                return (
                                    <TableRow key={item.commodityId}>
                                        <TableCell>{commodity?.name}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>{item.averagePrice.toFixed(2)}</TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            <div>
                                                <Input
                                                    type="number"
                                                    value={quantities[item.commodityId] || ''}
                                                    onChange={(e) => handleQuantityChange(item.commodityId, e.target.value)}
                                                    className={`w-full ${errors[item.commodityId] ? 'border-red-500' : ''}`}
                                                    min={0}
                                                    max={item.quantity}
                                                />
                                                {errors[item.commodityId] && (
                                                    <p className="text-red-500 text-sm mt-1">{errors[item.commodityId]}</p>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() => handleSell(item.commodityId)}
                                                className="bg-red-500 hover:bg-red-600 w-full text-sm px-2 py-1"
                                            >
                                                {t('sell')}
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

export default Inventory;
