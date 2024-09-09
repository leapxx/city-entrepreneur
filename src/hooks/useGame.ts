// src/hooks/useGame.ts

import { useState, useEffect } from 'react';
import { GameState, Commodity, InventoryItem, BankAccount, GameEvent } from '../types';
import { updatePrices, canAfford } from '../utils/economyUtils';
import { getRandomEvent, shouldTriggerEvent } from '../utils/eventUtils';
import { createInitialState, Language } from '../utils/initUtils';
import { useLanguage } from '@/contexts/LanguageContext';


export function useGame() {
    const { language } = useLanguage();
    const initialState = createInitialState(language);
    const [state, setState] = useState<GameState>(initialState);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [gameWon, setGameWon] = useState<boolean>(false);
    const [isRunning, setIsRunning] = useState<boolean>(true);

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;

        if (isRunning) {
            timer = setInterval(() => {
                setState(prevState => {
                    if (prevState.week >= 52 || prevState.player.health <= 0) {
                        setGameOver(true);
                        if (timer) clearInterval(timer);
                        return prevState;
                    }

                    if (prevState.player.wealth >= 1000000) {
                        setGameWon(true);
                        if (timer) clearInterval(timer);
                        return prevState;
                    }

                    const newState = {
                        ...prevState,
                        week: prevState.week + 1,
                        market: updatePrices(prevState.market),
                        player: {
                            ...prevState.player,
                            health: Math.max(0, prevState.player.health - 1),
                            wealth: calculatePlayerWealth(prevState)
                        },
                        bankAccount: {
                            ...prevState.bankAccount,
                            savings: prevState.bankAccount.savings * (1 + prevState.bankAccount.savingsInterest),
                            loan: prevState.bankAccount.loan + prevState.bankAccount.loanBase * prevState.bankAccount.loanInterest
                        }
                    };

                    if (shouldTriggerEvent()) {
                        const event = getRandomEvent(language);
                        return event.effect(newState);
                    }

                    return newState;
                });
            }, 5000); // 每5��更新一次，模拟一周

            return () => {
                if (timer) clearInterval(timer);
            };
        }

        return () => { };
    }, [isRunning, language]);  // 添加 lang 作为依赖项

    const buy = (commodityId: string, quantity: number) => {
        setState(prevState => {
            if (!canAfford(prevState, commodityId, quantity)) {
                return prevState;
            }

            const commodity = prevState.market.find(c => c.id === commodityId);
            if (!commodity) return prevState;

            const cost = commodity.price * quantity;
            const updatedInventory = [...prevState.player.inventory];
            const inventoryItem = updatedInventory.find(item => item.commodityId === commodityId);

            if (inventoryItem) {
                // 计算新的平均价格
                const totalValue = inventoryItem.averagePrice * inventoryItem.quantity + cost;
                const newTotalQuantity = inventoryItem.quantity + quantity;
                inventoryItem.averagePrice = totalValue / newTotalQuantity;
                inventoryItem.quantity = newTotalQuantity;
            } else {
                updatedInventory.push({ commodityId, quantity, averagePrice: commodity.price });
            }

            return {
                ...prevState,
                player: {
                    ...prevState.player,
                    money: prevState.player.money - cost,
                    inventory: updatedInventory,
                    wealth: calculatePlayerWealth({
                        ...prevState,
                        player: {
                            ...prevState.player,
                            money: prevState.player.money - cost,
                            inventory: updatedInventory
                        }
                    })
                }
            };
        });
    };

    const sell = (commodityId: string, quantity: number) => {
        setState(prevState => {
            const inventoryItem = prevState.player.inventory.find(item => item.commodityId === commodityId);
            if (!inventoryItem || inventoryItem.quantity < quantity) return prevState;

            const commodity = prevState.market.find(c => c.id === commodityId);
            if (!commodity) return prevState;

            const revenue = commodity.price * quantity;
            const updatedInventory = prevState.player.inventory.map(item =>
                item.commodityId === commodityId
                    ? { ...item, quantity: item.quantity - quantity }
                    : item
            ).filter(item => item.quantity > 0);

            return {
                ...prevState,
                player: {
                    ...prevState.player,
                    money: prevState.player.money + revenue,
                    inventory: updatedInventory,
                    wealth: calculatePlayerWealth({
                        ...prevState,
                        player: {
                            ...prevState.player,
                            money: prevState.player.money + revenue,
                            inventory: updatedInventory
                        }
                    })
                }
            };
        });
    };

    const deposit = (amount: number) => {
        setState(prevState => ({
            ...prevState,
            player: {
                ...prevState.player,
                money: prevState.player.money - amount
            },
            bankAccount: {
                ...prevState.bankAccount,
                savings: prevState.bankAccount.savings + amount
            }
        }));
    };

    const withdraw = (amount: number) => {
        setState(prevState => ({
            ...prevState,
            player: {
                ...prevState.player,
                money: prevState.player.money + amount
            },
            bankAccount: {
                ...prevState.bankAccount,
                savings: prevState.bankAccount.savings - amount
            }
        }));
    };

    const loan = (amount: number) => {
        setState(prevState => {
            if (prevState.player.wealth * 10 < amount) {
                return prevState;
            }
            return {
                ...prevState,
                player: {
                    ...prevState.player,
                    money: prevState.player.money + amount
                },
                bankAccount: {
                    ...prevState.bankAccount,
                    loan: prevState.bankAccount.loan + amount,
                    loanBase: prevState.bankAccount.loanBase + amount
                }
            };
        });
    };

    const repay = (amount: number) => {
        setState(prevState => {
            if (prevState.bankAccount.loan < amount) {
                return prevState;
            }
            return {
                ...prevState,
                player: {
                    ...prevState.player,
                    money: prevState.player.money - amount
                },
                bankAccount: {
                    ...prevState.bankAccount,
                    loan: prevState.bankAccount.loan - amount,
                    loanBase: Math.max(0, prevState.bankAccount.loanBase - amount)
                }
            };
        });
    };

    const heal = () => {
        const healCost = 100;
        const healAmount = 10;

        setState(prevState => {
            if (prevState.player.money < healCost) {
                return prevState;
            }
            return {
                ...prevState,
                player: {
                    ...prevState.player,
                    money: prevState.player.money - healCost,
                    health: Math.min(100, prevState.player.health + healAmount)
                }
            };
        });
    };

    const work = (salary: number, healthCost: number) => {
        setState(prevState => ({
            ...prevState,
            player: {
                ...prevState.player,
                money: prevState.player.money + salary,
                health: Math.max(0, prevState.player.health - healthCost)
            }
        }));
    };

    const resetGame = () => {
        setIsRunning(false);  // 暂时停止游戏
        setState(createInitialState(language));  // 使用当前语言重新初始化游戏状态
        setGameOver(false);
        setGameWon(false);

        // 使用 setTimeout 来确保状态更新后再重新启动游戏
        setTimeout(() => {
            setIsRunning(true);
        }, 0);
    };

    const applyEvent = (event: GameEvent) => {
        setState(prevState => event.effect(prevState));
    };

    return {
        state,
        buy,
        sell,
        deposit,
        withdraw,
        loan,
        repay,
        heal,
        work,
        gameOver,
        gameWon,
        resetGame,
        applyEvent
    };
}

// 在 useGame 函数内部添加这个新的辅助函数
const calculatePlayerWealth = (state: GameState): number => {
    const cashAndSavings = state.player.money + state.bankAccount.savings;
    const inventoryValue = state.player.inventory.reduce((total, item) => {
        const currentPrice = state.market.find(c => c.id === item.commodityId)?.price || 0;
        return total + item.quantity * currentPrice;
    }, 0);
    const wealth = cashAndSavings + inventoryValue - state.bankAccount.loan;
    return Number(wealth.toFixed(2));
};