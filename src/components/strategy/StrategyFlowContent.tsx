import React, { useState, useEffect, Suspense, useMemo, useCallback } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { useFlowState } from './hooks/useFlowState';
import FlowLayout from './layout/FlowLayout';
import ReactFlowCanvas from './canvas/ReactFlowCanvas';
import { createNodeTypes } from './nodes/nodeTypes';
import { createEdgeTypes } from './edges/edgeTypes';
import NodePanel from './NodePanel';
import '@xyflow/react/dist/style.css';
import './styles/menus.css';

interface StrategyFlowContentProps {
  isNew?: boolean;
}

const NodePanelLoading = () => (
  <div className="p-4 animate-pulse">
    <div className="h-6 w-3/4 bg-muted rounded mb-4"></div>
    <div className="h-4 w-1/2 bg-muted rounded mb-2"></div>
    <div className="h-4 w-2/3 bg-muted rounded mb-2"></div>
    <div className="h-4 w-1/3 bg-muted rounded"></div>
  </div>
);

const nodeTypesFactory = (handleDeleteNode, handleAddNode, updateNodeData) => 
  createNodeTypes(handleDeleteNode, handleAddNode, updateNodeData);

const edgeTypesFactory = (handleDeleteEdge) => 
  createEdgeTypes(handleDeleteEdge);

const StrategyFlowContent = ({ isNew = false }: StrategyFlowContentProps) => {
  const { theme } = useTheme();
  const [isInitialized, setIsInitialized] = useState(false);
  
  useEffect(() => {
    console.log('StrategyFlowContent mounted, initializing...');
    const timer = setTimeout(() => {
      setIsInitialized(true);
      console.log('StrategyFlowContent initialization complete');
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const {
    nodes,
    edges,
    selectedNode,
    isPanelOpen,
    reactFlowWrapper,
    reactFlowInstance,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setSelectedNode,
    setIsPanelOpen,
    setNodes,
    setEdges,
    strategyStore,
    handleAddNode,
    handleDeleteNode,
    handleDeleteEdge,
    updateNodeData,
    closePanel,
    resetStrategy,
    handleImportSuccess,
    onNodeClick
  } = useFlowState(isNew);

  const nodeTypes = useMemo(() => 
    nodeTypesFactory(handleDeleteNode, handleAddNode, updateNodeData), 
    [handleDeleteNode, handleAddNode, updateNodeData]
  );
  
  const edgeTypes = useMemo(() => 
    edgeTypesFactory(handleDeleteEdge), 
    [handleDeleteEdge]
  );

  const nodePanelComponent = useMemo(() => {
    if (isPanelOpen && selectedNode) {
      return (
        <NodePanel
          node={selectedNode}
          updateNodeData={updateNodeData}
          onClose={closePanel}
        />
      );
    }
    return null;
  }, [isPanelOpen, selectedNode, updateNodeData, closePanel]);

  const adaptedHandleAddNode = useCallback(
    (type: string, position: { x: number; y: number }) => {
      handleAddNode(type, position);
    },
    [handleAddNode]
  );

  const flowCanvasProps = useMemo(() => ({
    flowRef: reactFlowWrapper,
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeClick,
    resetStrategy,
    onImportSuccess: handleImportSuccess,
    onDeleteNode: handleDeleteNode,
    onDeleteEdge: handleDeleteEdge,
    onAddNode: adaptedHandleAddNode,
    updateNodeData,
    nodeTypes,
    edgeTypes
  }), [
    reactFlowWrapper,
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeClick,
    resetStrategy,
    handleImportSuccess,
    handleDeleteNode,
    handleDeleteEdge,
    adaptedHandleAddNode,
    updateNodeData,
    nodeTypes,
    edgeTypes
  ]);

  if (!isInitialized) {
    console.log('StrategyFlowContent still initializing, showing loading state');
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-3"></div>
          <p className="text-sm text-muted-foreground">Initializing strategy builder...</p>
        </div>
      </div>
    );
  }

  console.log('StrategyFlowContent rendering with React Flow initialized');
  console.log(`Current nodes: ${nodes.length}, edges: ${edges.length}`);

  return (
    <FlowLayout
      isPanelOpen={isPanelOpen}
      selectedNode={selectedNode}
      onClosePanel={closePanel}
      nodePanelComponent={nodePanelComponent}
    >
      <ReactFlowCanvas {...flowCanvasProps} />
    </FlowLayout>
  );
};

export default StrategyFlowContent;
