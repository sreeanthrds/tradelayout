
import React, { useState, useEffect } from 'react';
import { RadioGroupField, SelectField, InputField } from '../shared';
import { Position } from './types';

interface OptionsSettingsSectionProps {
  position: Position;
  onExpiryChange: (value: string) => void;
  onStrikeTypeChange: (value: string) => void;
  onStrikeValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOptionTypeChange: (value: string) => void;
}

const OptionsSettingsSection: React.FC<OptionsSettingsSectionProps> = ({
  position,
  onExpiryChange,
  onStrikeTypeChange,
  onStrikeValueChange,
  onOptionTypeChange
}) => {
  // Ensure optionDetails is never undefined
  const optionDetails = position.optionDetails || {};
  
  const [strikeCategory, setStrikeCategory] = useState<'ATM' | 'ITM' | 'OTM' | 'premium'>(
    optionDetails.strikeType === 'premium' ? 'premium' : 
    optionDetails.strikeType?.startsWith('ITM') ? 'ITM' : 
    optionDetails.strikeType?.startsWith('OTM') ? 'OTM' : 'ATM'
  );
  
  const [strikeDistance, setStrikeDistance] = useState<string>(
    optionDetails.strikeType && 
    (optionDetails.strikeType.startsWith('ITM') || optionDetails.strikeType.startsWith('OTM')) ? 
    optionDetails.strikeType : ''
  );
  
  const [premiumValue, setPremiumValue] = useState<number | undefined>(
    optionDetails.strikeType === 'premium' ? optionDetails.strikeValue : 100
  );

  useEffect(() => {
    if (optionDetails.strikeType) {
      if (optionDetails.strikeType === 'ATM') {
        setStrikeCategory('ATM');
        setStrikeDistance('');
      } else if (optionDetails.strikeType === 'premium') {
        setStrikeCategory('premium');
        setStrikeDistance('');
        if (optionDetails.strikeValue) {
          setPremiumValue(optionDetails.strikeValue);
        }
      } else if (optionDetails.strikeType.startsWith('ITM')) {
        setStrikeCategory('ITM');
        setStrikeDistance(optionDetails.strikeType);
      } else if (optionDetails.strikeType.startsWith('OTM')) {
        setStrikeCategory('OTM');
        setStrikeDistance(optionDetails.strikeType);
      }
    }
  }, [optionDetails]);

  const handleStrikeCategoryChange = (value: string) => {
    setStrikeCategory(value as any);
    
    if (value === 'ATM') {
      onStrikeTypeChange(value);
      setStrikeDistance('');
    } else if (value === 'premium') {
      onStrikeTypeChange(value);
      onStrikeValueChange({ target: { value: premiumValue !== undefined ? premiumValue.toString() : '' } } as React.ChangeEvent<HTMLInputElement>);
      setStrikeDistance('');
    } else if (value === 'ITM' || value === 'OTM') {
      const newStrikeType = `${value}1`;
      onStrikeTypeChange(newStrikeType);
      setStrikeDistance(newStrikeType);
    }
  };

  const handleStrikeDistanceChange = (value: string) => {
    setStrikeDistance(value);
    onStrikeTypeChange(value);
  };

  const handlePremiumValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow empty field
    if (e.target.value === '') {
      setPremiumValue(undefined);
      onStrikeValueChange(e);
      return;
    }
    
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setPremiumValue(value);
      onStrikeValueChange(e);
    }
  };

  useEffect(() => {
    if (strikeCategory === 'premium' && optionDetails.strikeType === 'premium') {
      if (optionDetails.strikeValue === undefined) {
        onStrikeValueChange({ target: { value: premiumValue !== undefined ? premiumValue.toString() : '' } } as React.ChangeEvent<HTMLInputElement>);
      }
    }
  }, []);

  return (
    <div className="space-y-4">
      <SelectField
        label="Expiry"
        id="expiry"
        value={optionDetails.expiry || 'W0'}
        onChange={onExpiryChange}
        options={[
          { value: 'W0', label: 'Current Week (W0)' },
          { value: 'W1', label: 'Next Week (W1)' },
          { value: 'W2', label: 'Week 2 (W2)' },
          { value: 'W3', label: 'Week 3 (W3)' },
          { value: 'W4', label: 'Week 4 (W4)' },
          { value: 'M0', label: 'Current Month (M0)' },
          { value: 'M1', label: 'Next Month (M1)' },
          { value: 'M2', label: 'Month 2 (M2)' },
          { value: 'Q0', label: 'Current Quarter (Q0)' },
          { value: 'Q1', label: 'Next Quarter (Q1)' },
          { value: 'Y0', label: 'Current Year (Y0)' },
          { value: 'Y1', label: 'Next Year (Y1)' }
        ]}
      />
      
      <SelectField
        label="Strike Selection"
        id="strike-category"
        value={strikeCategory}
        onChange={handleStrikeCategoryChange}
        options={[
          { value: 'ATM', label: 'At The Money (ATM)' },
          { value: 'ITM', label: 'In The Money (ITM)' },
          { value: 'OTM', label: 'Out of The Money (OTM)' },
          { value: 'premium', label: 'Closest Premium' }
        ]}
      />
      
      {(strikeCategory === 'ITM' || strikeCategory === 'OTM') && (
        <SelectField
          label={`${strikeCategory === 'ITM' ? 'ITM' : 'OTM'} Distance`}
          id="strike-distance"
          value={strikeDistance}
          onChange={handleStrikeDistanceChange}
          options={Array.from({ length: 15 }, (_, i) => ({
            value: `${strikeCategory}${i + 1}`,
            label: `${i + 1} Strike${i > 0 ? 's' : ''} ${strikeCategory}`
          }))}
        />
      )}
      
      {strikeCategory === 'premium' && (
        <InputField
          label="Target Premium (₹)"
          id="premium-value"
          type="number"
          min={1}
          value={optionDetails.strikeValue === undefined ? '' : optionDetails.strikeValue}
          onChange={handlePremiumValueChange}
          placeholder="Enter target premium"
        />
      )}
      
      <RadioGroupField
        label="Option Type"
        value={optionDetails.optionType || 'CE'}
        onChange={onOptionTypeChange}
        options={[
          { value: 'CE', label: 'Call (CE)' },
          { value: 'PE', label: 'Put (PE)' }
        ]}
        layout="horizontal"
      />
    </div>
  );
};

export default OptionsSettingsSection;
