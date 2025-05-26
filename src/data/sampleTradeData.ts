import { BacktestResults } from "@/models/TradeTypes";

// Helper function to generate a random number between min and max
const randomBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

// Helper function to generate a random price movement
const generatePriceMovement = (basePrice: number, volatility: number) => {
  const movement = (Math.random() - 0.5) * volatility;
  return Math.max(0.1, basePrice + movement);
};

// Helper function to generate a random time between 9:15 and 15:30
const generateRandomTime = (date: string) => {
  const hours = randomBetween(9, 15);
  const minutes = randomBetween(0, 59);
  const seconds = randomBetween(0, 59);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

// Helper function to generate a random VIX value
const generateVIX = () => {
  return Number((Math.random() * (20 - 10) + 10).toFixed(2));
};

// Helper function to generate a random strike price
const generateStrikePrice = (basePrice: number) => {
  const strikeRange = [-200, -100, 0, 100, 200];
  return basePrice + strikeRange[Math.floor(Math.random() * strikeRange.length)];
};

// Cache for generated data
let cachedData: BacktestResults | null = null;

// Function to generate a single trade pair
const generateTradePair = (date: string, index: number, basePrice: number) => {
  const type = Math.random() > 0.5 ? "CE" : "PE";
  const strike = generateStrikePrice(basePrice);
  const entryPrice = Number((Math.random() * 100 + 50).toFixed(2));
  const exitPrice = generatePriceMovement(entryPrice, 20);
  const profitLoss = Number(((exitPrice - entryPrice) * 75).toFixed(2));
  const entryTime = generateRandomTime(date);
  const exitTime = generateRandomTime(date);
  
  return {
    index: `${index}.${index}`,
          entry: {
      nodeId: `ENTRY-${index.toString().padStart(3, '0')}`,
      positionId: `POS-${date.replace(/-/g, '')}-${index}`,
      type,
      strike,
            buySell: "Buy",
      quantity: 75,
      entryPrice,
            orderType: "Market",
      timestamp: `${date}T${entryTime}Z`,
            status: "Executed",
      entryNumber: index,
            reEntryNumber: 0
          },
          exit: {
      nodeId: `EXIT-${index.toString().padStart(3, '0')}`,
      positionId: `POS-${date.replace(/-/g, '')}-${index}`,
      type,
      strike,
            buySell: "Sell",
      quantity: 75,
      exitPrice,
            orderType: "Market",
      exitReason: Math.random() > 0.7 ? "Target" : Math.random() > 0.5 ? "SL" : "Signal",
      timestamp: `${date}T${exitTime}Z`,
      profitLoss,
            status: "Executed"
          }
  };
};

// Function to generate trades for a single day
const generateDayTrades = (date: string, basePrice: number) => {
  const numTrades = randomBetween(5, 10);
  const trades = [];
  
  for (let i = 1; i <= numTrades; i++) {
    trades.push(generateTradePair(date, i, basePrice));
  }
  
  const totalProfitLoss = trades.reduce((sum, trade) => sum + trade.exit.profitLoss, 0);
  
  return {
    index: date.split('-')[2],
    positionId: `POS-${date.replace(/-/g, '')}`,
      instrumentType: "Options",
      symbol: "NIFTY",
    entryDate: date,
    entryTime: "09:15:00",
    exitDate: date,
      exitTime: "15:30:00",
    vix: generateVIX(),
    profitLoss: Number(totalProfitLoss.toFixed(2)),
      status: "Closed",
    tradeDuration: "06:15:00",
    tradePairs: trades
  };
};

// Function to check if a date is a holiday
const isHoliday = (date: Date): boolean => {
  const month = date.getMonth();
  const day = date.getDate();
  return (
    (month === 0 && day === 26) || // Republic Day
    (month === 3 && day === 9) ||  // Good Friday
    (month === 7 && day === 15) || // Independence Day
    (month === 9 && day === 2) ||  // Gandhi Jayanti
    (month === 11 && day === 25)   // Christmas
  );
};

// Function to generate all trading days
const generateTradingDays = () => {
  const trades = [];
  const startDate = new Date('2024-01-01');
  const endDate = new Date('2024-12-31');
  let basePrice = 22000; // Starting NIFTY price
  
  for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    
    // Skip holidays
    if (isHoliday(date)) continue;
    
    const dateStr = date.toISOString().split('T')[0];
    trades.push(generateDayTrades(dateStr, basePrice));
    
    // Update base price for next day
    basePrice = generatePriceMovement(basePrice, 100);
  }
  
  return trades;
};

// Function to get the sample data
export const getSampleTradeData = (): BacktestResults => {
  if (!cachedData) {
    cachedData = {
      trades: generateTradingDays()
    };
  }
  return cachedData;
};

// Function to regenerate the data
export const regenerateSampleTradeData = (): BacktestResults => {
  cachedData = {
    trades: generateTradingDays()
  };
  return cachedData;
};

// Export the data getter
export const sampleTradeData: BacktestResults = getSampleTradeData();

// Remove the circular dependency - the service will import this data now, not the other way around
