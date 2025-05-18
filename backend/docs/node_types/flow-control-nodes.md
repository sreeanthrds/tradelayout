
# Flow Control Nodes

Flow Control Nodes manage the execution flow of a trading strategy. They define entry points, termination conditions, and handle special flow cases like re-entry.

## Start Node

The Start Node is the entry point of every strategy and defines the core settings.

### Data Structure
```json
{
  "id": "start-123456",
  "type": "startNode",
  "data": {
    "label": "My NIFTY Strategy",
    "timeframe": "5MIN",
    "exchange": "NSE",
    "symbol": "NIFTY",
    "tradingInstrument": {
      "type": "options",
      "underlyingType": "index"
    },
    "indicators": ["sma_1", "rsi_1"],
    "indicatorParameters": {
      "sma_1": {
        "period": 20,
        "source": "close"
      },
      "rsi_1": {
        "period": 14,
        "overbought": 70,
        "oversold": 30
      }
    }
  }
}
```

### Processing Logic
1. The backend fetches market data for the specified symbol and timeframe
2. Technical indicators are calculated using the provided parameters
3. Indicator values are made available to downstream nodes

### Connections
- Cannot receive connections from any node
- Can send connections to: Signal Nodes, Action Nodes

## End Node

End Nodes represent normal termination of a strategy path.

### Data Structure
```json
{
  "id": "end-123456",
  "type": "endNode",
  "data": {
    "label": "End Strategy"
  }
}
```

### Processing Logic
1. The backend marks the execution path as complete
2. No further nodes are processed on this path

### Connections
- Can receive connections from: any node except Start Node
- Cannot send connections to any node

## Force End Node

Force End Nodes terminate the strategy and close all positions.

### Data Structure
```json
{
  "id": "forceend-123456",
  "type": "forceEndNode",
  "data": {
    "label": "Force End Strategy",
    "closePositions": true
  }
}
```

### Processing Logic
1. The backend terminates all execution paths
2. All open positions are closed if `closePositions` is true
3. Execution is considered complete

### Connections
- Can receive connections from: any node except Start Node
- Cannot send connections to any node

## Re-Entry Node

Re-Entry Nodes handle position re-entry logic after exits.

### Data Structure
```json
{
  "id": "reentry-123456",
  "type": "reEntryNode",
  "data": {
    "label": "Re-Enter Position",
    "groupNumber": 1,
    "currentReEntryCount": 0,
    "maxReEntries": 3,
    "waitBars": 2,
    "positions": [
      {
        "id": "reentry-pos-123456",
        "vpi": "vpi-123456",
        "vpt": "long-position",
        "positionType": "buy",
        "orderType": "market",
        "lots": 1
      }
    ]
  }
}
```

### Processing Logic
1. The backend tracks re-entry attempts for the specified group
2. If under the maximum re-entry limit, creates new positions
3. Maintains link to original position settings
4. Can implement waiting periods between re-entries

### Connections
- Can receive connections from: Exit Node with re-entry enabled
- Can send connections to: any node except Start Node
