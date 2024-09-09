import { GameState, GameEvent } from '../types';
import { eventTranslations } from '../locales/translations';
import { EventType } from '../types';

const createEvent = (type: EventType, description: string, effect: (state: GameState) => GameState): GameEvent => ({
    type,
    description,
    effect
});

const events: GameEvent[] = [
    createEvent('economic', 'EVENT_MARKET_CRASH', (state: GameState) => ({
        ...state,
        market: state.market.map(c => ({ ...c, price: c.price * 0.8 }))
    })),
    createEvent('economic', 'EVENT_ECONOMIC_BOOM', (state: GameState) => ({
        ...state,
        market: state.market.map(c => ({ ...c, price: c.price * 1.15 }))
    })),
    createEvent('health', 'EVENT_FLU_OUTBREAK', (state: GameState) => ({
        ...state,
        player: { ...state.player, health: Math.max(0, state.player.health - 15) }
    })),
    createEvent('reputation', 'EVENT_CHARITY_RECOGNITION', (state: GameState) => ({
        ...state,
        player: { ...state.player, reputation: Math.min(100, state.player.reputation + 10) }
    })),
    createEvent('financial', 'EVENT_BANK_UPGRADE', (state: GameState) => ({
        ...state,
        bankAccount: { ...state.bankAccount, savings: state.bankAccount.savings * 1.01 }
    })),
    createEvent('economic', 'EVENT_SUPPLY_SHORTAGE', (state: GameState) => {
        const randomIndex = Math.floor(Math.random() * state.market.length);
        const newMarket = [...state.market];
        newMarket[randomIndex] = { ...newMarket[randomIndex], price: newMarket[randomIndex].price * 1.5 };
        return { ...state, market: newMarket };
    }),
    createEvent('reputation', 'EVENT_RUMOR_SPREAD', (state: GameState) => ({
        ...state,
        player: { ...state.player, reputation: Math.max(0, state.player.reputation - 10) }
    })),
    createEvent('financial', 'EVENT_STOCK_MARKET_CRASH', (state: GameState) => ({
        ...state,
        player: { ...state.player, money: Math.max(0, state.player.money * 0.8) }
    })),
    createEvent('health', 'EVENT_HEALTH_SEMINAR', (state: GameState) => ({
        ...state,
        player: { ...state.player, health: Math.min(100, state.player.health + 10) }
    })),
    createEvent('economic', 'EVENT_TAX_INCREASE', (state: GameState) => ({
        ...state,
        market: state.market.map((c, index) => index % 2 === 0 ? { ...c, price: c.price * 1.1 } : c)
    }))
];

export function getRandomEvent(language: string): GameEvent {
    const event = events[Math.floor(Math.random() * events.length)];
    const translatedDescription = eventTranslations[language][event.description] || event.description;
    return { ...event, description: translatedDescription };
}

export function shouldTriggerEvent(): boolean {
    return Math.random() < 0.1; // 10% chance each week
}
