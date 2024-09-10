'use client';

import React from 'react';
import { Commodity, InventoryItem } from '@/types/index';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
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
    const [quantities, setQuantities] = React.useState<{ [key: string]: number }>({});

    const handleQuantityChange = (commodityId: string, value: number) => {
        setQuantities({ ...quantities, [commodityId]: value });
    };

    const handleSell = (commodityId: string) => {
        onSell(commodityId, quantities[commodityId] || 1);
        setQuantities({ ...quantities, [commodityId]: 0 });
    };

    return (
        <div className="inventory bg-green-50 p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-green-800">{t('inventory')}</h2>
            <ScrollArea className="h-[300px]">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-green-600">{t('commodity')}</TableHead>
                            <TableHead className="text-green-600">{t('quantity')}</TableHead>
                            <TableHead className="text-green-600">{t('average_price')}</TableHead>
                            <TableHead className="text-green-600">{t('sell_quantity')}</TableHead>
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
                                    <TableCell>
                                        <div className="flex flex-col items-center space-y-2">
                                            <Input
                                                type="number"
                                                value={quantities[item.commodityId] || 0}
                                                onChange={(e) => handleQuantityChange(item.commodityId, parseInt(e.target.value) || 0)}
                                                className="w-20"
                                            />
                                            <Slider
                                                value={[quantities[item.commodityId] || 0]}
                                                onValueChange={(value) => handleQuantityChange(item.commodityId, value[0])}
                                                max={item.quantity}
                                                step={1}
                                                className="w-full"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleSell(item.commodityId)} className="bg-red-500 hover:bg-red-600 w-full">{t('sell')}</Button>
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

export default Inventory;
