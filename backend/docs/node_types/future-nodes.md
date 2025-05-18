
# Future Node Types

This document describes node types that are planned for future implementation in the Trading Strategy Builder.

## Monitor Node

Monitor Nodes will track market data, positions, and strategy metrics without taking action. They are useful for creating and monitoring variables, tracking P&L, and other monitoring tasks without affecting positions.

### Planned Data Structure
```json
{
  "id": "monitor-123456",
  "type": "monitorNode",
  "data": {
    "label": "Track P&L",
    "monitorItems": [
      {
        "id": "item-1",
        "type": "position",
        "metric": "unrealizedPnL",
        "variable": "currentPnL"
      },
      {
        "id": "item-2",
        "type": "market",
        "source": "vwap",
        "variable": "currentVWAP"
      }
    ],
    "conditions": [
      {
        "id": "monitor-condition-1",
        "lhs": {
          "type": "variable",
          "name": "currentPnL"
        },
        "operator": ">",
        "rhs": {
          "type": "constant",
          "value": 1000
        }
      }
    ]
  }
}
```

### Planned Processing Logic
1. The backend will track the specified metrics
2. Create and update variables based on market data and position state
3. Evaluate conditions but won't take action
4. Variables will be available to other nodes in the strategy

### Planned Features
- Variable creation and tracking
- Position metric monitoring (P&L, MTM, etc.)
- Market data monitoring
- Strategy metric monitoring
- Condition evaluation without action
- Support for creating derived variables through formulas

### Implementation Timeline
The Monitor Node is planned for implementation in a future sprint. The specific timeline will be determined based on project priorities.

## Conditional Branch Node

Conditional Branch Nodes would allow different execution paths based on evaluated conditions, similar to an if-else statement in programming.

### Preliminary Concept
The Conditional Branch Node would:
- Evaluate a condition
- Direct flow to one path if condition is true
- Direct flow to another path if condition is false

This node type is in early conceptual stages and implementation details may change significantly.
