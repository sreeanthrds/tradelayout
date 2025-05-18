
import React from 'react';
import { Button } from '@/components/ui/button';
import { useVpsStore } from '@/hooks/useVpsStore';
import { Database } from 'lucide-react';
import ToolbarButton from './ToolbarButton';

const FloatingVpsButton = () => {
  const { toggle, positions } = useVpsStore();
  const positionCount = positions.length;

  return (
    <ToolbarButton
      icon={Database}
      label={`Positions${positionCount > 0 ? ` (${positionCount})` : ''}`}
      onClick={toggle}
      disabled={false}
      variant="default"
    />
  );
};

export default FloatingVpsButton;

