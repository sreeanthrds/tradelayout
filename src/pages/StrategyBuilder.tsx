
import React, { useState, useEffect, useCallback } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import StrategyFlow from '@/components/strategy/StrategyFlow';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { saveStrategyToLocalStorage } from '@/components/strategy/utils/storage/localStorageUtils';
import { useStrategyStore } from '@/hooks/use-strategy-store';
import { Skeleton } from '@/components/ui/skeleton';

const LoadingPlaceholder = () => (
  <div className="h-full w-full flex items-center justify-center bg-muted/20">
    <div className="flex flex-col items-center">
      <div className="h-10 w-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
      <p className="text-lg font-medium">Loading Strategy Builder...</p>
    </div>
  </div>
);

// Removed ConstructionOverlay to allow users access without blocking
// const ConstructionOverlay = () => (
//   <div className="absolute inset-0 bg-black bg-opacity-70 z-20 flex flex-col items-center justify-center p-6 text-center">
//     <div className="bg-primary text-primary-foreground rounded-lg p-8 max-w-lg shadow-lg">
//       <h2 className="text-2xl font-bold mb-4">Under Construction</h2>
//       <p className="mb-2 text-lg">The Strategy Builder is still under construction and not fully functioning.</p>
//       <p className="text-sm text-muted-foreground">Please check back later for full features.</p>
//     </div>
//   </div>
// );

const StrategyBuilder = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchParams] = useSearchParams();
  const strategyId = searchParams.get('id') || `strategy-${Date.now()}`;
  const strategyName = searchParams.get('name') || 'Untitled Strategy';
  const isNewStrategy = !searchParams.get('id');
  const navigate = useNavigate();
  const { toast } = useToast();
  const { nodes, edges, resetNodes } = useStrategyStore();
  
  // Force loading to true after a maximum time to prevent endless loading
  useEffect(() => {
    console.log('StrategyBuilder mounted, starting initialization');
    
    const forceLoadTimeout = setTimeout(() => {
      if (!isLoaded) {
        console.log('Force setting isLoaded to true after timeout');
        setIsLoaded(true);
      }
    }, 2000);
    
    return () => clearTimeout(forceLoadTimeout);
  }, [isLoaded]);
  
  useEffect(() => {
    if (isNewStrategy) {
      console.log('New strategy detected - preparing clean workspace');
      setTimeout(() => {
        try {
          resetNodes();
          console.log('Created new strategy workspace');
        } catch (error) {
          console.error('Error resetting strategy:', error);
        }
      }, 0);
    } else {
      console.log(`Loading existing strategy: ${strategyId}`);
    }
  }, [isNewStrategy, resetNodes, strategyId]);
  
  useEffect(() => {
    if (isLoaded && nodes.length > 0) {
      const autoSaveTimer = setTimeout(() => {
        saveStrategyToLocalStorage(nodes, edges, strategyId, strategyName);
        console.log(`Auto-saved strategy changes for: ${strategyId}`);
      }, 2000);
      
      return () => clearTimeout(autoSaveTimer);
    }
  }, [nodes, edges, isLoaded, strategyId, strategyName]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Setting isLoaded to true after initialization timeout');
      setIsLoaded(true);
    }, 300);
    
    console.log(`Strategy initialized with ID: ${strategyId}, name: ${strategyName}, isNew: ${isNewStrategy}`);
    
    return () => clearTimeout(timer);
  }, [strategyId, strategyName, isNewStrategy]);

  const handleSave = useCallback(() => {
    saveStrategyToLocalStorage(nodes, edges, strategyId, strategyName);
    
    toast({
      title: "Strategy saved",
      description: `"${strategyName}" has been saved`
    });
    
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'strategies'
    }));
  }, [nodes, edges, strategyId, strategyName, toast]);

  return (
    <div className="h-[calc(100vh-4px)] w-full relative">
      <div className="absolute top-1 left-16 z-10">
        <Link to="/app">
          <Button variant="ghost" size="sm" className="flex items-center gap-1.5 text-xs">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Strategies
          </Button>
        </Link>
      </div>
      
      <div className="absolute top-1 left-1/2 transform -translate-x-1/2 z-10">
        <div className="text-sm font-medium">
          {strategyName}
        </div>
      </div>
      
      <div className="absolute top-1 right-4 z-10 flex gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleSave}
          className="flex items-center gap-1.5 text-xs"
        >
          <Save className="h-3.5 w-3.5" />
          Save
        </Button>
      </div>
      
      <div className="w-full h-full flex-1 flex flex-col p-0">
        <div className="h-full w-full overflow-hidden rounded-none border-none relative">
          {isLoaded ? <StrategyFlow isNew={isNewStrategy} /> : <LoadingPlaceholder />}
          {/* ConstructionOverlay removed */}
        </div>
      </div>
    </div>
  );
};

export default StrategyBuilder;
