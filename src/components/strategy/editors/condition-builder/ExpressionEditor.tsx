
import React from 'react';
import { 
  Expression
} from '../../utils/conditions';
import ExpressionTypeSelector from './components/ExpressionTypeSelector';
import {
  IndicatorExpressionEditor,
  MarketDataExpressionEditor,
  ConstantExpressionEditor,
  TimeExpressionEditor,
  ComplexExpressionEditorWrapper,
  PositionDataExpressionEditor,
  StrategyMetricExpressionEditor,
  ExecutionDataExpressionEditor,
  ExternalTriggerExpressionEditor
} from './expression-editors';

interface ExpressionEditorProps {
  expression: Expression;
  updateExpression: (expr: Expression) => void;
}

const ExpressionEditor: React.FC<ExpressionEditorProps> = ({
  expression,
  updateExpression
}) => {
  // Render the appropriate editor based on expression type
  const renderExpressionEditor = () => {
    switch (expression.type) {
      case 'indicator':
        return (
          <IndicatorExpressionEditor
            expression={expression}
            updateExpression={updateExpression}
          />
        );
      case 'market_data':
        return (
          <MarketDataExpressionEditor
            expression={expression}
            updateExpression={updateExpression}
          />
        );
      case 'constant':
        return (
          <ConstantExpressionEditor
            expression={expression}
            updateExpression={updateExpression}
          />
        );
      case 'time_function':
        return (
          <TimeExpressionEditor
            expression={expression}
            updateExpression={updateExpression}
          />
        );
      case 'position_data':
        return (
          <PositionDataExpressionEditor
            expression={expression}
            updateExpression={updateExpression}
          />
        );
      case 'strategy_metric':
        return (
          <StrategyMetricExpressionEditor
            expression={expression}
            updateExpression={updateExpression}
          />
        );
      case 'execution_data':
        return (
          <ExecutionDataExpressionEditor
            expression={expression}
            updateExpression={updateExpression}
          />
        );
      case 'external_trigger':
        return (
          <ExternalTriggerExpressionEditor
            expression={expression}
            updateExpression={updateExpression}
          />
        );
      case 'expression':
        return (
          <ComplexExpressionEditorWrapper
            expression={expression}
            updateExpression={updateExpression}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <ExpressionTypeSelector
          expression={expression}
          updateExpression={updateExpression}
        />
      </div>
      
      {renderExpressionEditor()}
    </div>
  );
};

export default ExpressionEditor;
