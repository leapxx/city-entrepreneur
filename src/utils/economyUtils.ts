import { Commodity, GameState } from '../types';

export function updatePrices(commodities: Commodity[]): Commodity[] {
    return commodities.map(commodity => {
        let newPrice = commodity.price;
        const randomFactor = Math.random();

        // 黑天鹅事件：极端波动
        if (randomFactor < 0.05) { // 5%的几率发生黑天鹅事件
            const blackSwanEffect = 1 + (Math.random() - 0.5) * 2; // 波动幅度可达 +/- 100%
            newPrice = Math.max(1, commodity.price * blackSwanEffect);
        } else {
            // 正常波动：价格微调
            newPrice = Math.max(1, commodity.price * (1 + (Math.random() - 0.5) * 0.2));
        }

        // 特定商品持续上涨
        const increasingItems = ["高档香烟", "豪华手表", "进口红酒"];
        if (increasingItems.includes(commodity.name)) {
            newPrice = newPrice * 1.05; // 这些商品每次更新涨价 5%
        }

        return {
            ...commodity,
            lastPrice: commodity.price,
            price: newPrice
        };
    });
}

export function canAfford(state: GameState, commodityId: string, quantity: number): boolean {
    const commodity = state.market.find(c => c.id === commodityId);
    return commodity ? state.player.money >= commodity.price * quantity : false;
}