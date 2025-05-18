
# Signal Nodes

Signal Nodes generate trading signals based on market conditions, indicator values, or other criteria. They evaluate conditions but don't execute trades directly.

## Entry Signal Node

Entry Signal Nodes generate trading signals for entering new positions.

### Visual Appearance
- Green/emerald color scheme to visually indicate entry signals

### Data Structure
```json
{
  "id": "entry-signal-123456",
  "type": "entrySignalNode",
  "data": {
    "label": "RSI Oversold Entry",
    "conditions": [
      {
        "id": "root",
        "groupLogic": "AND",
        "conditions": [
          {
            "lhs": {
              "type": "indicator",
              "name": "rsi_1",
              "offset": 0
            },
            "operator": "<",
            "rhs": {
              "type": "constant",
              "value": 30
            }
          }
        ]
      }
    ]
  }
}
```

### Processing Logic
1. The backend evaluates the entry conditions using market data and calculated indicators
2. If conditions are met, execution proceeds to connected entry nodes
3. Entry signal nodes are typically connected to Entry Nodes for position creation

### Connections
- Can receive connections from: Start Node, other signal nodes, action nodes
- Can send connections to: Entry Node, Alert Node, other signal nodes

## Exit Signal Node

Exit Signal Nodes generate trading signals for exiting existing positions.

### Visual Appearance
- Amber/yellow color scheme to visually indicate exit signals

### Data Structure
```json
{
  "id": "exit-signal-123456",
  "type": "exitSignalNode",
  "data": {
    "label": "RSI Overbought Exit",
    "conditions": [
      {
        "id": "root",
        "groupLogic": "AND",
        "conditions": [
          {
            "lhs": {
              "type": "indicator",
              "name": "rsi_1",
              "offset": 0
            },
            "operator": ">",
            "rhs": {
              "type": "constant",
              "value": 70
            }
          }
        ]
      }
    ]
  }
}
```

### Processing Logic
1. The backend evaluates the exit conditions using market data and calculated indicators
2. If conditions are met, execution proceeds to connected exit nodes
3. Exit signal nodes are typically connected to Exit Nodes for position closure

### Connections
- Can receive connections from: Start Node, other signal nodes, action nodes
- Can send connections to: Exit Node, Alert Node, other signal nodes

## Condition Structure

Both Entry and Exit Signal Nodes use the same condition structure:

1. **Condition Groups**: Collections of conditions with a logical operator (AND/OR)
2. **Individual Conditions**: Comparisons between expressions
   - Left-Hand Side (LHS): Typically an indicator or market data reference
   - Operator: Comparison operator (>, <, ==, >=, <=, !=, crosses above, crosses below)
   - Right-Hand Side (RHS): Typically a constant value or another reference

### Expression Types
- **Indicator**: Reference to technical indicators defined in the Start Node
- **Market Data**: Reference to price data (open, high, low, close, volume)
- **Constant**: Fixed numerical value
- **Complex**: Mathematical expressions combining multiple references

### Evaluation Process
1. Expressions are evaluated using current market data and indicator values
2. Conditions are evaluated using the specified operator
3. Condition groups are evaluated based on their logical operator
4. If the root condition evaluates to true, the signal is triggered
