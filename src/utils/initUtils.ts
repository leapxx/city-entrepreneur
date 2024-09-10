import { GameState, Commodity } from '../types';
import { translations } from '../locales/translations';

// 获取翻译后的商品名称
function getTranslatedName(id: string, lang: string): string {
    return translations[lang].commodityList[id];
}

// 创建初始商品列表的函数
export function createInitialCommodities(lang: string): Commodity[] {
    return [
        { "id": "1", "name": getTranslatedName("1", lang), "price": 100 },
        { "id": "2", "name": getTranslatedName("2", lang), "price": 50000 },
        { "id": "3", "name": getTranslatedName("3", lang), "price": 5000 },
        { "id": "4", "name": getTranslatedName("4", lang), "price": 200 },
        { "id": "5", "name": getTranslatedName("5", lang), "price": 3000 },
        { "id": "6", "name": getTranslatedName("6", lang), "price": 1000 },
        { "id": "7", "name": getTranslatedName("7", lang), "price": 500 },
        { "id": "8", "name": getTranslatedName("8", lang), "price": 2000 },
        { "id": "9", "name": getTranslatedName("9", lang), "price": 150 },
        { "id": "10", "name": getTranslatedName("10", lang), "price": 800 },
        { "id": "11", "name": getTranslatedName("11", lang), "price": 600 },
        { "id": "12", "name": getTranslatedName("12", lang), "price": 300 },
        { "id": "13", "name": getTranslatedName("13", lang), "price": 3500 },
        { "id": "14", "name": getTranslatedName("14", lang), "price": 1200 },
        { "id": "15", "name": getTranslatedName("15", lang), "price": 2500 },
    ];
}

// 创建初始状态的函数
export function createInitialState(lang: string): GameState {
    return {
        messages: [],  // 添加缺失的 messages 属性
        player: {
            money: 10000,
            wealth: 10000,
            health: 100,
            reputation: 0,
            inventory: []
        },
        week: 1,
        market: createInitialCommodities(lang),
        bankAccount: {
            savings: 0,
            loan: 0,
            loanInterest: 0.05,
            loanBase: 0,
            savingsInterest: 0.015
        }
    };
}
