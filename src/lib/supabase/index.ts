
// This file is kept for compatibility
// No longer using Supabase

export const supabase = null;
export const strategyService = {
  getStrategies: () => Promise.resolve([]),
  getStrategyById: () => Promise.resolve(null),
  saveStrategy: () => Promise.resolve(null),
  deleteStrategy: () => Promise.resolve(false)
};
