export interface Commodity {
    id: string;
    name: string;
    price: number;
    lastPrice?: number; // 添加这一行，使用可选属性
}

export interface Player {
    money: number;
    health: number;
    wealth: number;
    reputation: number;
    inventory: InventoryItem[];
}

export interface InventoryItem {
    commodityId: string;
    quantity: number;
    averagePrice: number;
}

export interface GameState {
    messages: any;
    player: Player;
    week: number;
    market: Commodity[];
    bankAccount: BankAccount;
    currentEvent?: GameEvent;
}

export type EventType = 'economic' | 'health' | 'reputation' | 'financial';

export interface GameEvent {
    type: EventType;
    description: string;
    effect: (state: GameState) => GameState;
}

export interface BankAccount {
    savings: number;
    loan: number;
    loanInterest: number;
    loanBase: number;
    savingsInterest: number;
}

export interface Work {
    id: string;
    nameKey: string;
    salary: number;
    healthCost: number;
    duration: number; // 工作时长（小时）
    rejectionRate: number;
}