import { GameState, GameEvent } from '../types';
import { eventTranslations } from '../locales/translations';
import { EventType } from '../types';

const createEvent = (type: EventType, description: string, effect: (state: GameState) => GameState): GameEvent => ({
    type,
    description,
    effect
});

const healthEvents: GameEvent[] = [
    createEvent('health', 'EVENT_NOTHING_HAPPEN', (state: GameState) => ({
        ...state,
        player: { ...state.player, health: Math.min(100, state.player.health + 1) }
    })),
    createEvent('health', 'EVENT_FLU_OUTBREAK', (state: GameState) => ({
        ...state,
        player: { ...state.player, health: Math.max(0, state.player.health - 15) }
    })),
    createEvent('health', 'EVENT_HEALTH_SEMINAR', (state: GameState) => ({
        ...state,
        player: { ...state.player, health: Math.min(100, state.player.health + 10) }
    })),
];

const economicEvents: GameEvent[] = [
    createEvent('economic', 'EVENT_MARKET_CRASH', (state: GameState) => ({
        ...state,
        market: state.market.map(c => ({ ...c, price: c.price * 0.8 }))
    })),
    createEvent('economic', 'EVENT_ECONOMIC_BOOM', (state: GameState) => ({
        ...state,
        market: state.market.map(c => ({ ...c, price: c.price * 1.15 }))
    })),
    createEvent('economic', 'EVENT_SUPPLY_SHORTAGE', (state: GameState) => {
        const randomIndex = Math.floor(Math.random() * state.market.length);
        const newMarket = [...state.market];
        newMarket[randomIndex] = { ...newMarket[randomIndex], price: newMarket[randomIndex].price * 1.5 };
        return { ...state, market: newMarket };
    }),
    createEvent('economic', 'EVENT_TAX_INCREASE', (state: GameState) => ({
        ...state,
        market: state.market.map((c, index) => index % 2 === 0 ? { ...c, price: c.price * 1.1 } : c)
    })),
    createEvent('economic', 'EVENT_BUSINESS_OPPORTUNITY', (state: GameState) => ({
        ...state,
        player: { ...state.player, money: state.player.money * 1.2 },
        market: state.market.map(c => ({ ...c, price: c.price * 1.05 }))
    })),
    createEvent('economic', 'EVENT_NATURAL_DISASTER', (state: GameState) => {
        const affectedIndices = Array.from({ length: 3 }, () => Math.floor(Math.random() * state.market.length));
        return {
            ...state,
            market: state.market.map((c, index) =>
                affectedIndices.includes(index) ? { ...c, price: c.price * 1.3 } : c
            )
        };
    }),
    createEvent('economic', 'EVENT_FOREIGN_INVESTMENT', (state: GameState) => ({
        ...state,
        market: state.market.map(c => ({ ...c, price: c.price * 1.08 })),
        bankAccount: { ...state.bankAccount, savings: state.bankAccount.savings * 1.05 }
    })),
];

const reputationEvents: GameEvent[] = [
    createEvent('reputation', 'EVENT_CHARITY_RECOGNITION', (state: GameState) => ({
        ...state,
        player: { ...state.player, reputation: Math.min(100, state.player.reputation + 10) }
    })),
    createEvent('reputation', 'EVENT_RUMOR_SPREAD', (state: GameState) => ({
        ...state,
        player: { ...state.player, reputation: Math.max(0, state.player.reputation - 10) }
    })),
];

const financialEvents: GameEvent[] = [
    createEvent('financial', 'EVENT_BANK_UPGRADE', (state: GameState) => ({
        ...state,
        bankAccount: { ...state.bankAccount, savings: state.bankAccount.savings * 1.01 }
    })),
    createEvent('financial', 'EVENT_STOCK_MARKET_CRASH', (state: GameState) => ({
        ...state,
        player: { ...state.player, money: Math.max(0, state.player.money * 0.8) }
    })),
    createEvent('financial', 'EVENT_LOTTERY_WIN', (state: GameState) => ({
        ...state,
        player: { ...state.player, money: state.player.money + 50000 }
    })),
    createEvent('financial', 'EVENT_TECHNOLOGICAL_BREAKTHROUGH', (state: GameState) => ({
        ...state,
        market: state.market.map(c => ({ ...c, price: c.price * 1.1 })),
        player: { ...state.player, money: state.player.money * 1.1 }
    })),
    createEvent('financial', 'EVENT_QUANTUM_COMPUTING_BREAKTHROUGH', (state: GameState) => ({
        ...state,
        market: state.market.map(c => ({ ...c, price: c.price * 1.5 })),
        bankAccount: { ...state.bankAccount, savings: state.bankAccount.savings * 0.5 }
    })),
];

const blackSwanEvents: GameEvent[] = [
    createEvent('economic', 'EVENT_GLOBAL_PANDEMIC', (state: GameState) => ({
        ...state,
        market: state.market.map(c => ({ ...c, price: c.price * 0.5 })),
        player: { ...state.player, health: Math.max(0, state.player.health - 30), money: state.player.money * 0.7 }
    })),
    createEvent('economic', 'EVENT_ALIEN_CONTACT', (state: GameState) => ({
        ...state,
        market: state.market.map(c => ({ ...c, price: c.price * 2 })),
        player: { ...state.player, money: state.player.money * 1.5, reputation: 100 }
    })),
    createEvent('economic', 'EVENT_WORLD_WAR', (state: GameState) => ({
        ...state,
        market: state.market.map(c => ({ ...c, price: c.price * 3 })),
        player: { ...state.player, money: state.player.money * 0.3, health: Math.max(0, state.player.health - 50) }
    })),
    createEvent('economic', 'EVENT_AI_SINGULARITY', (state: GameState) => ({
        ...state,
        market: state.market.map(c => ({ ...c, price: c.price * Math.random() * 5 })),
        player: { ...state.player, money: state.player.money * 2, reputation: Math.floor(Math.random() * 100) }
    })),
];

const allEvents: GameEvent[] = [
    ...healthEvents,
    ...economicEvents,
    ...reputationEvents,
    ...financialEvents,
];

export function getRandomEvent(language: string): GameEvent {
    const randomNumber = Math.random();
    let event;
    if (randomNumber < 0.1) { // 1% 概率触发黑天鹅事件
        event = blackSwanEvents[Math.floor(Math.random() * blackSwanEvents.length)];
    } else {
        event = allEvents[Math.floor(Math.random() * allEvents.length)];
    }
    const translatedDescription = eventTranslations[language][event.description] || event.description;
    return { ...event, description: translatedDescription };
}

// 单独函数触发无事发生事件
export function getNothingEvent(language: string): GameEvent {
    const event = healthEvents[0]; // 假设 "无事发生" 事件是健康事件列表的第一个
    const translatedDescription = eventTranslations[language][event.description] || event.description;
    return { ...event, description: translatedDescription };
}

export function shouldTriggerEvent(): boolean {
    return Math.random() < 0.1; // 10% chance each week
}
