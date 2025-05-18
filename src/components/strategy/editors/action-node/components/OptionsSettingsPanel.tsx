
import React from 'react';
import { Position } from '../types';
import OptionsSettingsSection from '../OptionsSettingsSection';

interface OptionsSettingsPanelProps {
  position: Position;
  hasOptionTrading: boolean;
  onExpiryChange: (value: string) => void;
  onStrikeTypeChange: (value: string) => void;
  onStrikeValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOptionTypeChange: (value: string) => void;
}

const OptionsSettingsPanel: React.FC<OptionsSettingsPanelProps> = ({
  position,
  hasOptionTrading,
  onExpiryChange,
  onStrikeTypeChange,
  onStrikeValueChange,
  onOptionTypeChange
}) => {
  if (!hasOptionTrading) {
    return null;
  }

  return (
    <div className="pt-2 border-t">
      <h4 className="text-sm font-medium mb-3">Options Settings</h4>
      <OptionsSettingsSection
        position={position}
        onExpiryChange={onExpiryChange}
        onStrikeTypeChange={onStrikeTypeChange}
        onStrikeValueChange={onStrikeValueChange}
        onOptionTypeChange={onOptionTypeChange}
      />
    </div>
  );
};

export default OptionsSettingsPanel;
