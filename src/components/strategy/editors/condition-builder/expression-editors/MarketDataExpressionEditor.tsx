
import React, { useState } from 'react';
import { 
  Expression, 
  MarketDataExpression
} from '../../../utils/conditions';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import FieldTooltip from '../../shared/FieldTooltip';
import CandleOffsetSelector from '../components/CandleOffsetSelector';

interface MarketDataExpressionEditorProps {
  expression: Expression;
  updateExpression: (expr: Expression) => void;
  required?: boolean;
}

const MarketDataExpressionEditor: React.FC<MarketDataExpressionEditorProps> = ({
  expression,
  updateExpression,
  required = false
}) => {
  if (expression.type !== 'market_data') {
    return null;
  }

  const marketDataExpr = expression as MarketDataExpression;
  
  // Update the field (Open, High, Low, Close, etc.)
  const updateField = (value: string) => {
    updateExpression({
      ...marketDataExpr,
      field: value
    });
  };
  
  // Update the time offset (current, previous, etc.)
  const updateOffset = (value: number) => {
    updateExpression({
      ...marketDataExpr,
      offset: value
    });
  };
  
  const marketDataFields = [
    { value: 'Open', label: 'Open', description: 'The price at which an asset opens for trading in a given period' },
    { value: 'High', label: 'High', description: 'The highest price reached by an asset during the trading period' },
    { value: 'Low', label: 'Low', description: 'The lowest price reached by an asset during the trading period' },
    { value: 'Close', label: 'Close', description: 'The final price at which an asset is traded in a given period' },
    { value: 'Volume', label: 'Volume', description: 'The total number of shares or contracts traded during the period' },
    { value: 'LTP', label: 'LTP', description: 'Last Traded Price - the most recent price at which the asset was traded' }
  ];
  
  return (
    <div className="space-y-2">
      <Select 
        value={marketDataExpr.field} 
        onValueChange={updateField}
      >
        <SelectTrigger className={cn(
          "h-8",
          required && !marketDataExpr.field && "border-red-300 focus:ring-red-200"
        )}>
          <SelectValue placeholder="Select data point" />
        </SelectTrigger>
        <SelectContent>
          {marketDataFields.map(field => (
            <SelectItem key={field.value} value={field.value}>
              <div className="flex items-center gap-1">
                {field.label}
                <FieldTooltip content={field.description} />
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <CandleOffsetSelector 
        offset={marketDataExpr.offset || 0}
        onOffsetChange={updateOffset}
        label="Look back:"
      />
    </div>
  );
};

export default MarketDataExpressionEditor;
