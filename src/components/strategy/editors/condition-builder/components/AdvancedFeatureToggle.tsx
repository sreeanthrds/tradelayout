
import React, { memo } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger 
} from '@/components/ui/collapsible';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface AdvancedFeatureToggleProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const AdvancedFeatureToggle: React.FC<AdvancedFeatureToggleProps> = memo(({
  title,
  description,
  children,
  defaultOpen = false
}) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  // Memoize the button content to prevent unnecessary re-renders
  const buttonContent = React.useMemo(() => (
    <>
      <div className="flex flex-col items-start text-left">
        <span className="text-sm font-medium">{title}</span>
        {description && (
          <span className="text-xs text-muted-foreground">{description}</span>
        )}
      </div>
      {isOpen ? (
        <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
      ) : (
        <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
      )}
    </>
  ), [title, description, isOpen]);

  return (
    <Collapsible 
      open={isOpen} 
      onOpenChange={setIsOpen}
      className="border border-border rounded-md"
    >
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="flex w-full justify-between p-3 h-auto font-normal hover:bg-muted/50"
        >
          {buttonContent}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="px-3 pb-3">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
});

AdvancedFeatureToggle.displayName = 'AdvancedFeatureToggle';

export default AdvancedFeatureToggle;
