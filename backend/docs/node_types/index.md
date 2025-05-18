
# Trading Strategy Node Types

This document provides an overview of all node types used in the Trading Strategy Builder. For detailed information about specific node categories, refer to the specialized documentation files:

- [Signal Nodes](./signal-nodes.md) - Entry and Exit Signal nodes that generate trading signals
- [Action Nodes](./action-nodes.md) - Entry, Exit, Modify, and Alert nodes that execute trading actions
- [Flow Control Nodes](./flow-control-nodes.md) - Start, End, Force End, and Re-Entry nodes that control strategy flow
- [Future Nodes](./future-nodes.md) - Documentation for planned node types like Monitor Node

## Processing Flow

Nodes are processed in the order determined by the strategy graph:

1. The Start Node initializes strategy execution
2. Signal Nodes (Entry/Exit) determine which paths to follow
3. Action Nodes (Entry, Exit, Modify, Re-Entry) manage positions
4. Alert Nodes generate notifications
5. Monitor Nodes track variables and metrics
6. End Nodes terminate execution paths

Each node's output becomes the input for connected nodes, forming a complete execution flow.

## Node Structure

All nodes share a common basic structure:

```json
{
  "id": "unique-node-id",
  "type": "nodeType",
  "data": {
    "label": "Node Display Label",
    // Node-specific configuration
  }
}
```

## Node Connections

Nodes connect to each other to form the strategy flow. Specific node types can only connect to certain other node types. For example:

- Start Node → Signal Nodes or Action Nodes
- Signal Nodes → Action Nodes
- Action Nodes → End Nodes or other Action Nodes
- Flow Control Nodes can influence connection paths

See individual node documentation files for specific connection rules.
