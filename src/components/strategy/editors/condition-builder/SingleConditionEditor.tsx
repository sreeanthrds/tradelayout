
import React from 'react';
import { 
  Condition, 
} from '../../utils/conditions';
import OperatorSelector from './components/OperatorSelector';
import ExpressionWrapper from './components/ExpressionWrapper';

interface SingleConditionEditorProps {
  condition: Condition;
  updateCondition: (updated: Condition) => void;
  showLabels?: boolean;
  conditionContext?: 'entry' | 'exit';
}

const SingleConditionEditor: React.FC<SingleConditionEditorProps> = ({
  condition,
  updateCondition,
  showLabels = true,
  conditionContext = 'entry'
}) => {
  // Update the condition operator
  const updateOperator = (value: string) => {
    updateCondition({
      ...condition,
      operator: value as any
    });
  };

  // Update the left-hand side expression
  const updateLhs = (expr: any) => {
    updateCondition({
      ...condition,
      lhs: expr
    });
  };

  // Update the right-hand side expression
  const updateRhs = (expr: any) => {
    updateCondition({
      ...condition,
      rhs: expr
    });
  };

  // Check if the condition requires values
  // For comparison operators, both sides are required
  const requiresValues = ['>', '<', '>=', '<=', '==', '!='].includes(condition.operator);

  return (
    <div className="condition-editor-container w-full overflow-visible">
      <div className="expression-grid w-full overflow-visible">
        {/* Left-hand side expression */}
        <ExpressionWrapper
          label=""
          expression={condition.lhs}
          updateExpression={updateLhs}
          required={requiresValues}
          showLabels={true}
          conditionContext={conditionContext}
        />
        
        {/* Operator */}
        <div className="pt-6">
          <OperatorSelector 
            operator={condition.operator}
            updateOperator={updateOperator}
          />
        </div>
        
        {/* Right-hand side expression */}
        <ExpressionWrapper
          label=""
          expression={condition.rhs}
          updateExpression={updateRhs}
          required={requiresValues}
          showLabels={true}
          conditionContext={conditionContext}
        />
      </div>
    </div>
  );
};

export default SingleConditionEditor;
