
export interface Position {
  id: string;  // Auto-generated unique ID
  vpi: string; // Virtual Position ID - unique across strategy
  vpt: string; // Virtual Position Tag - user-defined label
  priority: number; // Execution priority (positions ordered by this)
  positionType?: 'buy' | 'sell';
  orderType?: 'market' | 'limit';
  limitPrice?: number;
  lots?: number;
  productType?: 'intraday' | 'carryForward';
  optionDetails?: {
    expiry?: string;
    strikeType?: 'ATM' | 'ITM1' | 'ITM2' | 'ITM3' | 'ITM4' | 'ITM5' | 'ITM6' | 'ITM7' | 'ITM8' | 'ITM9' | 'ITM10' | 'ITM11' | 'ITM12' | 'ITM13' | 'ITM14' | 'ITM15' | 'OTM1' | 'OTM2' | 'OTM3' | 'OTM4' | 'OTM5' | 'OTM6' | 'OTM7' | 'OTM8' | 'OTM9' | 'OTM10' | 'OTM11' | 'OTM12' | 'OTM13' | 'OTM14' | 'OTM15' | 'premium';
    strikeValue?: number;
    optionType?: 'CE' | 'PE';
  };
  _lastUpdated?: number; // Timestamp for forcing updates
}

export interface NodeData {
  label?: string;
  actionType?: 'entry' | 'exit' | 'alert';
  instrument?: string;
  positions: Position[];
  _lastUpdated?: number; // Timestamp for forcing updates
}

export interface StartNodeData {
  symbol?: string;
  timeframe?: string;
  exchange?: string;
  tradingInstrument?: {
    type: 'stock' | 'futures' | 'options';
    underlyingType?: 'index' | 'indexFuture' | 'stock';
  };
  indicators?: string[];
  indicatorParameters?: Record<string, Record<string, any>>;
}
