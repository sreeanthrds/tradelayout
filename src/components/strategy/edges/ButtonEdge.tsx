
import React, { useState, useEffect } from 'react';
import { EdgeProps, getBezierPath } from '@xyflow/react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

// Define a type for the edge data to provide type safety
interface EdgeData {
  sourceNode?: { type?: string };
  targetNode?: { type?: string };
}

// Custom edge with delete button
const ButtonEdge = ({ 
  id, 
  sourceX, 
  sourceY, 
  targetX, 
  targetY, 
  source,
  target,
  data,
  style,
  selected,
  sourcePosition,
  targetPosition,
  ...props 
}: EdgeProps & { id: string; onDelete: (id: string) => void }) => {
  const { onDelete } = props;
  const [open, setOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [shouldShowDelete, setShouldShowDelete] = useState(true);
  
  useEffect(() => {
    // Safely check for retry node type in data
    const edgeData = data as EdgeData;
    const isRetryNode = 
      edgeData?.sourceNode?.type === 'retryNode' || 
      edgeData?.targetNode?.type === 'retryNode';
    
    setShouldShowDelete(!isRetryNode);
    
    // Set ready after a short delay to ensure all props are resolved
    const timer = setTimeout(() => {
      setIsReady(true);
      console.log(`Edge ${id} is ready, onDelete is ${typeof onDelete}`);
    }, 100);
    return () => clearTimeout(timer);
  }, [id, onDelete, data]);
  
  const handleDelete = () => {
    if (typeof onDelete === 'function') {
      onDelete(id);
      console.log(`Deleting edge ${id}`);
      setOpen(false);
    } else {
      console.error('Edge onDelete is not a function', onDelete);
    }
  };
  
  // Use getBezierPath for the edge path
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  });
  
  // Calculate the midpoint for the delete button
  const centerX = (sourceX + targetX) / 2;
  const centerY = (sourceY + targetY) / 2;
  
  console.log(`Edge ${id} - Button position: ${centerX}, ${centerY}`);
  
  return (
    <g 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="edge-wrapper"
    >
      {/* Draw a bezier edge without animation */}
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        style={style}
        strokeWidth={selected || isHovered ? 3 : 2}
      />
      
      {/* Add a delete button with hover state only if shouldShowDelete is true */}
      {shouldShowDelete && (
        <foreignObject
          width={40}
          height={40}
          x={centerX - 20}
          y={centerY - 20}
          requiredExtensions="http://www.w3.org/1999/xhtml"
          className="edge-controls"
          style={{ 
            opacity: isHovered || selected ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
          data-id={id}
        >
          {isReady && (
            <div className="flex items-center justify-center h-full w-full">
              <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="edge-delete-button h-6 w-6 rounded-full shadow-md"
                    onClick={(event) => {
                      event.stopPropagation();
                      console.log('Delete button clicked for edge:', id);
                    }}
                    title="Delete connection"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Connection</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this connection between nodes? 
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={(e) => e.stopPropagation()}>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete();
                      }}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </foreignObject>
      )}
    </g>
  );
};

export default ButtonEdge;

