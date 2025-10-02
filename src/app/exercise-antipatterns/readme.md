# React State Anti-patterns

## Core Concepts

### Deriving State

- **Rule**: If you can calculate (derive) it, don't store it
- **Anti-pattern**: Using `useState` + `useEffect` to sync derived data
- **Best practice**: Calculate derived values directly in render or with `useMemo`
- **Benefits**:
  - Eliminates synchronization bugs
  - Reduces state complexity
  - Automatically stays in sync with source data
- Examples of derived state:
  - Filtered/sorted lists from original data + criteria
  - Computed totals from item arrays
  - Status calculations from multiple boolean flags
  - Available items from excluded items + full list
- When to `useMemo`: Only when the calculation is expensive and dependencies change infrequently

**Before (Anti-pattern):**

```tsx
function TripSummary() {
  const [tripItems] = useState([
    { name: 'Flight', cost: 500 },
    { name: 'Hotel', cost: 300 },
  ]);
  const [totalCost, setTotalCost] = useState(0); // ❌ Unnecessary state

  useEffect(() => {
    setTotalCost(tripItems.reduce((sum, item) => sum + item.cost, 0)); // ❌ Sync effect
  }, [tripItems]);

  return <div>Total: ${totalCost}</div>;
}
```

**After (Best practice):**

```tsx
function TripSummary() {
  const [tripItems] = useState([
    { name: 'Flight', cost: 500 },
    { name: 'Hotel', cost: 300 },
  ]);

  // ✅ Derive the value directly
  const totalCost = tripItems.reduce((sum, item) => sum + item.cost, 0);

  return <div>Total: ${totalCost}</div>;
}
```

### Refs vs State

- **Rule**: Use `useRef` for values that don't affect rendering
- **Anti-pattern**: Using `useState` for mutable values that don't need re-renders
- **Best practice**: `useRef` for DOM references, timers, counters, previous values
- **Key differences**:
  - `useState`: Triggers re-render when changed
  - `useRef`: No re-render when `.current` changes
- **Common use cases**:
  - Timer IDs (`setInterval`/`setTimeout`)
  - Scroll position tracking
  - Analytics/tracking data
  - Caching expensive calculations
  - Storing previous prop values

**Before (Anti-pattern):**

```tsx
function Timer() {
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null); // ❌ Causes re-renders

  const startTimer = () => {
    const id = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    setTimerId(id); // ❌ Triggers unnecessary re-render
  };

  useEffect(() => {
    startTimer();
    return () => timerId && clearInterval(timerId);
  }, [timerId]); // ❌ Effect runs every time timerId changes

  return <div>{timeLeft}s remaining</div>;
}
```

**After (Best practice):**

```tsx
function Timer() {
  const [timeLeft, setTimeLeft] = useState(60);
  const timerIdRef = useRef<NodeJS.Timeout | null>(null); // ✅ No re-renders

  const startTimer = () => {
    const id = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    timerIdRef.current = id; // ✅ No re-render triggered
  };

  useEffect(() => {
    startTimer();
    return () => timerIdRef.current && clearInterval(timerIdRef.current);
  }, []); // ✅ Effect runs only once

  return <div>{timeLeft}s remaining</div>;
}
```

### Redundant State

- **Rule**: Single source of truth for each piece of data
- **Anti-pattern**: Storing the same data in multiple places
- **Best practice**: Store minimal state, derive everything else
- **Common redundancy patterns**:
  - Storing full objects when only ID is needed
  - Duplicating data already available in props/context
  - Storing both raw and formatted versions of same data
  - Keeping derived calculations in separate state
- **Problems with redundant state**:
  - Synchronization bugs when data gets out of sync
  - More complex update logic
  - Increased memory usage
  - Harder to debug and maintain
- **Solutions**:
  - Store only IDs, look up full objects when needed
  - Use props/context data directly
  - Format data during render, not in state

**Before (Anti-pattern):**

```tsx
function HotelSelection() {
  const [hotels] = useState([
    { id: 'h1', name: 'Grand Hotel', price: 200 },
    { id: 'h2', name: 'Budget Inn', price: 80 },
  ]);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null); // ❌ Stores entire object

  const handleSelect = (hotel: Hotel) => {
    setSelectedHotel(hotel); // ❌ Duplicates data from hotels array
  };

  return (
    <div>
      {selectedHotel && (
        <div>
          {selectedHotel.name} - ${selectedHotel.price}
        </div>
      )}
    </div>
  );
}
```

**After (Best practice):**

```tsx
function HotelSelection() {
  const [hotels] = useState([
    { id: 'h1', name: 'Grand Hotel', price: 200 },
    { id: 'h2', name: 'Budget Inn', price: 80 },
  ]);
  const [selectedHotelId, setSelectedHotelId] = useState<string | null>(null); // ✅ Store only ID

  const handleSelect = (hotelId: string) => {
    setSelectedHotelId(hotelId); // ✅ Store minimal data
  };

  // ✅ Derive the full object when needed
  const selectedHotel = hotels.find((h) => h.id === selectedHotelId);

  return (
    <div>
      {selectedHotel && (
        <div>
          {selectedHotel.name} - ${selectedHotel.price}
        </div>
      )}
    </div>
  );
}
```

## Exercise: Fix State Anti-patterns

**Goal**: Refactor components to follow React state best practices

You'll work on three components that demonstrate common state management anti-patterns. Your task is to refactor them to follow best practices while maintaining the same functionality.

### Tasks:

1. **Fix Derived State Anti-patterns**

   - Remove unnecessary state and effects
   - Calculate derived values directly in render
   - Use `useMemo` only when needed

2. **Convert useState to useRef**

   - Identify values that don't need re-renders
   - Replace `useState` with `useRef` where appropriate
   - Ensure cleanup is handled properly

3. **Eliminate Redundant State**
   - Store minimal required state
   - Derive values instead of duplicating state
   - Use proper data normalization

### Success Criteria:

After completing the exercises, each component should:

- Have minimal state (only store what can't be derived)
- No unnecessary `useEffect` hooks for syncing state
- Use `useRef` for values that don't affect rendering
- Maintain the same functionality with better performance
- Be easier to understand and maintain
