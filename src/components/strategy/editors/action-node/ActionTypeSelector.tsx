
import React from 'react';
import { ArrowUpCircle, X, AlertTriangle } from 'lucide-react';
import { FormField } from '../shared';

interface ActionTypeSelectorProps {
  actionType?: 'entry' | 'exit' | 'alert';
  onActionTypeChange: (value: string) => void;
}

const ActionTypeSelector: React.FC<ActionTypeSelectorProps> = ({
  actionType,
  onActionTypeChange
}) => {
  return (
    <FormField label="Action Type" className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        <div 
          className={`flex flex-col items-center justify-center p-2 rounded-md border cursor-pointer transition-colors
            ${actionType === 'entry' ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'}`}
          onClick={() => onActionTypeChange('entry')}
        >
          <ArrowUpCircle className="h-5 w-5 mb-1 text-emerald-500 dark:text-emerald-400" />
          <span className="text-xs">Entry Order</span>
        </div>
        
        <div 
          className={`flex flex-col items-center justify-center p-2 rounded-md border cursor-pointer transition-colors
            ${actionType === 'exit' ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'}`}
          onClick={() => onActionTypeChange('exit')}
        >
          <X className="h-5 w-5 mb-1 text-amber-600 dark:text-amber-500" />
          <span className="text-xs">Exit Order</span>
        </div>
        
        <div 
          className={`flex flex-col items-center justify-center p-2 rounded-md border cursor-pointer transition-colors
            ${actionType === 'alert' ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'}`}
          onClick={() => onActionTypeChange('alert')}
        >
          <AlertTriangle className="h-5 w-5 mb-1 text-amber-600 dark:text-amber-400" />
          <span className="text-xs">Alert Only</span>
        </div>
      </div>
    </FormField>
  );
};

export default ActionTypeSelector;
