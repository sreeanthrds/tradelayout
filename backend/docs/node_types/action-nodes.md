
# Action Nodes

Action Nodes execute trading actions based on signals received from Signal Nodes. They handle the creation, modification, and closing of positions, as well as alert generation.

## Entry Node

Entry Nodes create trading positions when conditions are met.

### Data Structure
```json
{
  "id": "entry-123456",
  "type": "entryNode",
  "data": {
    "label": "Buy NIFTY",
    "positions": [
      {
        "id": "pos-123456",
        "vpi": "vpi-123456",
        "vpt": "long-position",
        "positionType": "buy",
        "orderType": "market",
        "lots": 1,
        "productType": "intraday"
      }
    ]
  }
}
```

### Processing Logic
1. The backend creates virtual positions based on the configuration
2. Position details are tracked in the execution state
3. Entry prices are determined from market data
4. Can include options settings for derivatives trading

### Connections
- Can receive connections from: Entry Signal Node, Signal Node
- Can send connections to: any node except Start Node

## Exit Node

Exit Nodes close trading positions when conditions are met.

### Data Structure
```json
{
  "id": "exit-123456",
  "type": "exitNode",
  "data": {
    "label": "Close Position",
    "exitType": "all",
    "positions": [
      {
        "id": "exit-pos-123456",
        "vpi": "vpi-123456",
        "positionType": "sell",
        "orderType": "market",
        "lots": 1
      }
    ],
    "reEntryConfig": {
      "enabled": false,
      "groupNumber": 1,
      "maxReEntries": 3
    }
  }
}
```

### Processing Logic
1. The backend identifies positions to close based on VPI/VPT
2. Position exit prices are determined from market data
3. P&L is calculated for closed positions
4. If re-entry is enabled, a re-entry path is created

### Connections
- Can receive connections from: Exit Signal Node, Signal Node
- Can send connections to: any node except Start Node

## Modify Node

Modify Nodes adjust existing positions (e.g., move stop loss).

### Data Structure
```json
{
  "id": "modify-123456",
  "type": "modifyNode",
  "data": {
    "label": "Adjust Stop Loss",
    "modifyType": "stopLoss",
    "positions": [
      {
        "id": "mod-pos-123456",
        "vpi": "vpi-123456",
        "stopLoss": {
          "type": "price",
          "value": 17500
        }
      }
    ]
  }
}
```

### Processing Logic
1. The backend identifies positions to modify based on VPI/VPT
2. Position parameters are updated as specified
3. Modified position details are included in execution results

### Connections
- Can receive connections from: any node except Start Node
- Can send connections to: any node except Start Node

## Alert Node

Alert Nodes generate notifications without affecting positions.

### Data Structure
```json
{
  "id": "alert-123456",
  "type": "alertNode",
  "data": {
    "label": "RSI Alert",
    "alertMessage": "RSI is below 30, market might be oversold",
    "alertType": "info"
  }
}
```

### Processing Logic
1. The backend generates an alert with the specified message
2. Alert details are included in the execution results
3. No position changes are made

### Connections
- Can receive connections from: any node except End Node and Force End Node
- Can send connections to: any node except Start Node
