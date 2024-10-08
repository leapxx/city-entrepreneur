# Millionaire's Growth Path Design Document

## 1. Game Overview

### 1.1 Game Title
Millionaire's Growth Path

### 1.2 Game Genre
Business Simulation Game

### 1.3 Game Platform
Web

### 1.4 Target Audience
Age: 15+  
Players who enjoy business simulation and strategy games.

### 1.5 Game Description
Players take on the role of an urban entrepreneur, growing their wealth by buying and selling commodities, investing in real estate, managing health and reputation, and dealing with random events, all with the goal of achieving their financial targets within 52 weeks.

## 2. Gameplay

### 2.1 Core Loop
1. Buy commodities.
2. Wait for price fluctuations.
3. Sell commodities for profit.
4. Manage resources (money, health, reputation).
5. Handle random events.
6. Repeat steps 1-5 until the goal is reached or failure occurs.

### 2.2 Game Objective
Accumulate a specified amount of wealth (default is 100,000) within 52 weeks.

### 2.3 End Conditions
- Victory: Reach the wealth target.
- Defeat: Health reaches 0 or the player fails to reach the target within 52 weeks.

## 3. Game Mechanics

### 3.1 Economic System
- Five commodities: Luxury Cigarettes, Domestic Cars, Premium Smartphones, Gas Masks, Imported Baby Formula.
- Price fluctuations: Random price changes each week.
- Market influence: Random events can affect the overall economy.

### 3.2 Time System
- The game lasts for 52 weeks.
- Each week represents a turn.
- The passage of time affects health and economic conditions.

### 3.3 Health System
- Initial value of 100 points.
- Gradual decline over time.
- Can be restored by visiting the hospital.
- Game ends if health reaches 0.

### 3.4 Reputation System
- Starts at 100 points.
- Affected by random events.
- Impacts certain transactions and opportunities.

### 3.5 Banking System
- Deposits: 1% annual interest rate.
- Loans: 5% annual interest rate.
- Actions: Deposit, withdraw, borrow, repay loans.

### 3.6 Random Events System
- Trigger probability: 10% per week.
- Event types: Economic, health, reputation, financial, etc.
- Impact: Can be positive or negative.

### 3.7 Real Estate System
(To be developed)

## 4. User Interface

### 4.1 Main Game Interface
- Top: Wealth and time information.
- Left: Market (list of commodities and prices).
- Right: Warehouse (list of purchased commodities and quantities).
- Bottom: Cash, health, and reputation status.
- Bottom: Function buttons (Second-hand Market, Farmers' Market, Wholesale Market, Bank, Hospital, Real Estate Office, Agency).

### 4.2 Popup Interfaces
- Banking operations screen.
- Hospital screen.
- Random event notifications.
- Victory/Defeat screens.

## 6. Art Style

### 6.1 Visual Style
- 2D graphics.
- Flat design.
- Bright and lively color scheme.

### 6.2 UI Design
- Simple, intuitive interface layout.
- Clear icon design.
- Easy-to-read font choice.

## 7. Audio

### 7.1 Background Music
- Light and cheerful background music to create a relaxed game atmosphere.

### 7.2 Sound Effects
- Button click sound.
- Successful transaction sound.
- Random event notification sound.

## 8. Expandability

### 8.1 Difficulty System
- Implement different difficulty levels (easy, normal, hard).
- Difficulty affects starting funds, price fluctuation range, random event frequency, etc.

### 8.2 Achievement System
- Design various achievements (e.g., First Profit, Millionaire, Philanthropist, etc.).
- Implement achievement unlocking and display functionality.

### 8.3 Multi-Character System
- Design multiple characters with different traits for players to choose from.
- Each character has unique starting advantages and disadvantages.

## 9. Development Roadmap

### 9.1 Alpha Version
- Implement the core gameplay loop.
- Basic UI design.
- Economy and time systems.

### 9.2 Beta Version
- Add random event system.
- Implement health and reputation systems.
- Improve the banking system.
- Basic audio implementation.

### 9.3 Version 1.0
- Add real estate system.
- Optimize game balance.
- Improve UI and visual effects.

### 9.4 Future Updates
- Add new commodities and random events.
- Implement the achievement system.
- Add multi-character system.
- Support for other languages.
