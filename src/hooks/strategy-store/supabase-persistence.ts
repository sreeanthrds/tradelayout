
import { strategyService, supabase } from '@/lib/supabase';
import { Node, Edge } from '@xyflow/react';
import { toast } from "@/hooks/use-toast";
import { saveStrategyToLocalStorage } from '@/components/strategy/utils/storage/localStorageUtils';

// Check if user is authenticated with Supabase
export const isAuthenticated = async () => {
  try {
    // If Supabase is not properly configured, return false
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      return false;
    }
    
    const { data } = await supabase.auth.getSession();
    return !!data.session;
  } catch (error) {
    console.error('Error checking authentication status:', error);
    return false;
  }
};

// Save strategy to appropriate storage
export const saveStrategy = async (
  nodes: Node[],
  edges: Edge[],
  strategyId: string,
  strategyName: string
) => {
  try {
    // First check if Supabase is properly configured
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      // If not configured, save to local storage only
      saveStrategyToLocalStorage(nodes, edges, strategyId, strategyName);
      toast({
        title: "Strategy saved locally",
        description: `"${strategyName}" has been saved to your device (Supabase not configured).`
      });
      return true;
    }
    
    // Check if user is authenticated
    const authenticated = await isAuthenticated();
    
    if (authenticated) {
      // If authenticated, save to Supabase
      // Note: We're now calling saveStrategy without arguments as per the modified API
      const result = await strategyService.saveStrategy();
      
      if (result) {
        toast({
          title: "Strategy saved to cloud",
          description: `"${strategyName}" has been saved to your account.`
        });
        return true;
      } else {
        // Fallback to local storage if Supabase save fails
        saveStrategyToLocalStorage(nodes, edges, strategyId, strategyName);
        toast({
          title: "Strategy saved locally",
          description: `"${strategyName}" has been saved to your device (cloud save failed).`
        });
        return true;
      }
    } else {
      // Not authenticated, save to local storage
      saveStrategyToLocalStorage(nodes, edges, strategyId, strategyName);
      toast({
        title: "Strategy saved locally",
        description: `"${strategyName}" has been saved to your device.`
      });
      return true;
    }
  } catch (error) {
    console.error('Error saving strategy:', error);
    
    // Attempt local storage as fallback
    try {
      saveStrategyToLocalStorage(nodes, edges, strategyId, strategyName);
      toast({
        title: "Strategy saved locally",
        description: `"${strategyName}" has been saved to your device.`,
        variant: "default"
      });
      return true;
    } catch (fallbackError) {
      console.error('Fallback save failed:', fallbackError);
      toast({
        title: "Failed to save strategy",
        description: "Could not save your strategy. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  }
};

// Load strategy from appropriate storage
export const loadStrategy = async (strategyId: string) => {
  try {
    // First check if user is authenticated
    const authenticated = await isAuthenticated();
    
    if (authenticated) {
      // If authenticated, try to load from Supabase first
      // Note: We're now calling getStrategyById without arguments as per the modified API
      const strategy = await strategyService.getStrategyById();
      
      if (strategy) {
        return {
          nodes: strategy.nodes,
          edges: strategy.edges,
          name: strategy.name
        };
      }
    }
    
    // Fallback to local storage (or if not authenticated)
    // This uses the existing local storage utility
    const localData = localStorage.getItem(`strategy_${strategyId}`);
    if (localData) {
      const parsedData = JSON.parse(localData);
      return {
        nodes: parsedData.nodes,
        edges: parsedData.edges,
        name: parsedData.name
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error loading strategy:', error);
    return null;
  }
};

// Delete strategy from appropriate storage
export const deleteStrategy = async (strategyId: string) => {
  try {
    // First check if user is authenticated
    const authenticated = await isAuthenticated();
    
    if (authenticated) {
      // If authenticated, delete from Supabase
      // Note: We're now calling deleteStrategy without arguments as per the modified API
      await strategyService.deleteStrategy();
    }
    
    // Also delete from local storage (regardless of authentication)
    localStorage.removeItem(`strategy_${strategyId}`);
    
    // Remove from strategies list if present
    const strategiesList = localStorage.getItem('strategies');
    if (strategiesList) {
      const strategies = JSON.parse(strategiesList);
      const updatedStrategies = strategies.filter((s: any) => s.id !== strategyId);
      localStorage.setItem('strategies', JSON.stringify(updatedStrategies));
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting strategy:', error);
    return false;
  }
};
