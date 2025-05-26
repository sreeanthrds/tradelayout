import { useState, useEffect } from "react";
import { tradeService } from "@/services/TradeDataService";

export interface BacktestData {
  name: string;
  period: string;
  totalReturn: number;
  winRate: number;
  maxDrawdown: number;
  sharpeRatio: number;
  trades: number;
}

interface UseBacktestDataParams {
  name: string;
  startDate: Date;
  endDate: Date;
}

export function useBacktestData({ name, startDate, endDate }: UseBacktestDataParams) {
  // Format the period string
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };
  const period = `${formatDate(startDate)} - ${formatDate(endDate)}`;

  const [backtestData, setBacktestData] = useState<BacktestData>({
    name,
    period,
    totalReturn: 0,
    winRate: 0,
    maxDrawdown: 0,
    sharpeRatio: 0,
    trades: 0
  });

  useEffect(() => {
    const filteredData = tradeService.getFilteredData({ 
      strategy: name, 
      startDate, 
      endDate,
      initialCapital: 10000,
      positionSize: 5
    });

    // Calculate metrics from filtered trades
    const trades = filteredData.trades;
    const totalTrades = trades.length;
    const winningTrades = trades.filter(t => (t.profitLoss || 0) > 0).length;

    // Calculate total invested amount and returns
    let totalInvested = 0;
    let totalReturns = 0;
    let peakValue = 0;
    let maxDrawdown = 0;
    
    trades.forEach(trade => {
      trade.tradePairs.forEach(pair => {
        if (pair.entry) {
          const invested = pair.entry.quantity * pair.entry.entryPrice;
          totalInvested += invested;
          peakValue = Math.max(peakValue, totalInvested);
        }
        if (pair.exit) {
          const returned = pair.exit.quantity * pair.exit.exitPrice;
          totalReturns += returned;
          const currentValue = totalReturns;
          const drawdown = ((peakValue - currentValue) / peakValue) * 100;
          maxDrawdown = Math.max(maxDrawdown, drawdown);
        }
      });
    });

    const totalReturn = totalInvested > 0 ? ((totalReturns - totalInvested) / totalInvested) * 100 : 0;

    setBacktestData({
      name,
      period,
      totalReturn: Number(totalReturn.toFixed(2)),
      winRate: totalTrades > 0 ? Number(((winningTrades / totalTrades) * 100).toFixed(2)) : 0,
      maxDrawdown: Number(maxDrawdown.toFixed(2)),
      sharpeRatio: 1.42, // This would need proper calculation
      trades: totalTrades
    });
  }, [name, startDate, endDate, period]);

  return { backtestData };
}
