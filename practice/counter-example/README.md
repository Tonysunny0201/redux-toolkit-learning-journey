# Redux Toolkit – Complete Learning Notes

## 1. What is Redux?

**Redux** is a predictable state management library for JavaScript applications. It helps us manage and share application state across multiple components without having to pass props manually through every level of the component tree.

For example, imagine an application with:
- Navbar
- Login component
- Profile component
- Dashboard
- Cart component

Suppose multiple components need access to the logged-in user's information. Instead of passing that information through props from parent to child components, we can maintain it in a centralized Redux store and access it wherever needed.

### What is Redux Toolkit (RTK)?

Redux Toolkit is the official, recommended way to write Redux logic.

It simplifies traditional Redux by providing functions and utilities that reduce boilerplate code and make state management easier.

**Important:** Redux is the state management library, whereas Redux Toolkit is the recommended toolset for writing Redux applications.

## 2. Why do we need Redux?

In React, we can manage component state using `useState` and share data between components using props.

However, as an application grows, managing shared state through multiple components can become difficult.

### Problems without Redux

- **Prop Drilling:** Passing data through multiple components, even when intermediate components don't need that data.
- **Difficult State Management:** Managing shared state across multiple components can become complicated.
- **Code Duplication:** Multiple components may need similar state-related logic.
- **Maintenance:** Managing complex application-wide state becomes harder as the application grows.

### Advantages of Redux Toolkit

1. **Centralized State Management:** Stores shared application state in one central location.
2. **Predictable State Updates:** State changes happen through defined reducer logic and dispatched actions.
3. **Avoids Prop Drilling:** Components can directly access the required global state.
4. **Easy Debugging:** Redux DevTools helps inspect state changes and dispatched actions.
5. **Less Boilerplate:** Automatically generates action creators and action types using `createSlice()`.
6. **Immutable Updates:** Uses Immer internally, allowing us to write simpler state update logic.
7. **Scalable:** Makes it easier to organize and manage state in larger applications.

## 3. When should we use Redux?

Redux is useful when:
- Multiple components need access to the same state.
- Application state needs to be shared across different pages.
- The application has complex state update logic.
- We need predictable and centralized state management.
- We want to inspect and debug state changes.

**Note:** Not every application needs Redux. For small applications or simple local state, React's `useState` and `useContext` may be sufficient.

## 4. Installation and Setup

### Step 1: Create a React + Vite project

If you haven't already created a React project:

```bash
npm create vite@latest redux-toolkit-practice
```

Select:
- Framework: React
- Variant: JavaScript

Navigate into the project:

```bash
cd redux-toolkit-practice
```

Install the dependencies:

```bash
npm install
```

### Step 2: Install Redux Toolkit

Install the Redux Toolkit and React-Redux packages:

```bash
npm install @reduxjs/toolkit react-redux
```

**What are these packages?**

| Package | Purpose |
|---|---|
| `@reduxjs/toolkit` | Provides Redux Toolkit functions such as `configureStore()` and `createSlice()`. |
| `react-redux` | Connects Redux with React and provides hooks such as `useSelector()` and `useDispatch()`. |

## 5. Redux Toolkit Counter Example

Let's understand Redux Toolkit using a simple Counter application.

Our application will have the following functionalities:

- Increment the counter.
- Decrement the counter.
- Reset the counter.
- Increment the counter by a specific amount.

### Project folder structure

We can organize our files like this:

```text
src/
│
├── app/
│   └── store.js
│
├── features/
│   └── counter/
│       ├── counterSlice.js
│       └── Counter.jsx
│
├── App.jsx
└── main.jsx
```

**Why this structure?**

- `app/` – Contains the Redux store configuration.
- `features/` – Contains application features and their related Redux logic.
- `counter/` – Contains everything related to the counter feature.
- `counterSlice.js` – Defines the counter's initial state and reducers.
- `Counter.jsx` – Uses Redux hooks to read and update the counter.

---

## 6. Steps to Implement Redux Toolkit

### Step 1: Create a Redux Store

**File: `src/app/store.js`**

```jsx
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
```

**What is a Store?**

A Redux Store is a centralized place where the application's global state is maintained.

It holds the current state and provides methods to access and update it through dispatched actions.

**What is `configureStore()`?**

`configureStore()` is a function provided by Redux Toolkit that creates and configures the Redux store.

It automatically handles several configurations, including:
- Combining multiple reducers.
- Adding default middleware.
- Enabling Redux DevTools integration.
- Applying useful development checks.

**Understanding the code:**

```jsx
reducer: {
  counter: counterReducer,
}
```

- `counter` is the key under which the counter state will be available in the Redux store.
- `counterReducer` is the reducer function exported from `counterSlice.js`.

For example, our counter state can be accessed using:

```jsx
state.counter
```

If we have multiple slices, we can register them in the same store:

```jsx
reducer: {
  counter: counterReducer,
  // user: userReducer,
  // cart: cartReducer,
}
```

### Step 2: Provide the Redux Store to React

**File: `src/main.jsx`**

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import { store } from "./app/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

**What is `Provider`?**

`Provider` is a component provided by the `react-redux` package.

It makes the Redux store available to all React components inside it.

**Why do we need it?**

Without the `Provider`, components cannot access the Redux store through React-Redux hooks such as `useSelector()` and `useDispatch()`.

**Important:**

```jsx
<Provider store={store}>
  <App />
</Provider>
```

- `Provider` wraps the main application component.
- `store={store}` passes our configured Redux store to the Provider.
- All child components inside the Provider can access the store.

### Step 3: Create a Slice

**File: `src/features/counter/counterSlice.js`**

```jsx
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

const counterSlice = createSlice({
  name: "counter",

  initialState,

  reducers: {
    increment: (state) => {
      state.count += 1;
    },

    decrement: (state) => {
      state.count -= 1;
    },

    reset: (state) => {
      state.count = 0;
    },

    incrementByAmount: (state, action) => {
      state.count += action.payload;
    },
  },
});

// Export action creators
export const { increment, decrement, reset, incrementByAmount } =
  counterSlice.actions;

// Export reducer
export default counterSlice.reducer;
```

**What is a Slice?**

A Slice is a collection of Redux logic related to a particular feature of an application.

It contains:
- Slice name.
- Initial state.
- Reducer functions.
- Automatically generated action creators.

For example, in a real-world application, we might have:
- `userSlice` – Manages user-related state.
- `cartSlice` – Manages shopping cart state.
- `authSlice` – Manages authentication state.
- `counterSlice` – Manages counter state.

**What is `createSlice()`?**

`createSlice()` is a Redux Toolkit function that creates a slice of Redux state.

It automatically generates:
1. A reducer function.
2. Action creators for each reducer function.
3. Action types for each reducer function.

#### Understanding the three important properties

**1. name**

```jsx
name: "counter",
```

Defines the name of the slice.

It is also used as a prefix when generating action types.

For example:

```text
counter/increment
counter/decrement
counter/reset
```

**2. initialState**

```jsx
const initialState = {
  count: 0,
};
```

Defines the initial value of the state when the application starts.

In our example, the counter initially starts at `0`.

**3. reducers**

```jsx
reducers: {
  increment: (state) => {
    state.count += 1;
  },

  decrement: (state) => {
    state.count -= 1;
  },
}
```

Reducers define how the state should change when a particular action is dispatched.

For example:
- `increment` increases the count by 1.
- `decrement` decreases the count by 1.
- `reset` changes the count back to 0.

**Important:** Each reducer function receives two main arguments when needed:

- `state` – The current state of that slice.
- `action` – An object containing information about the dispatched action, including its payload when provided.

#### Why can we directly modify state?

In traditional Redux, we must return a new state object instead of directly modifying the existing state.

However, Redux Toolkit uses a library called **Immer** internally.

Immer allows us to write code that looks like direct state mutation:

```jsx
state.count += 1;
```

But internally, Immer produces the necessary immutable state update.

Therefore, we can write simpler and more readable reducer logic without directly mutating the original Redux state.

### Step 4: Export Actions and Reducer

At the bottom of our slice:

```jsx
export const { increment, decrement, reset, incrementByAmount } =
  counterSlice.actions;

export default counterSlice.reducer;
```

**What are Actions?**

Actions are objects that describe what happened and can carry additional data to the reducer.

For example:

```jsx
{ type: "counter/increment" }
```

**What are Action Creators?**

Action creators are functions that automatically generate action objects.

Redux Toolkit generates these functions from the reducer names inside `createSlice()`.

For example:

```jsx
increment();
decrement();
reset();
```

These functions generate their corresponding action objects.

**What is a Reducer?**

A reducer is a function that determines how the state should change based on the dispatched action.

In our example, `counterSlice.reducer` is the reducer function that handles all counter actions.

**Why do we export both?**

| Export | Purpose |
|---|---|
| Actions | Used in components to dispatch specific operations. |
| Reducer | Registered in the Redux store to handle those operations. |

Remember:

```jsx
counterSlice.actions
```

Contains the generated action creators.

```jsx
counterSlice.reducer
```

Contains the reducer function.

### Step 5: Use Redux Hooks in Components

Now we can access and update the Redux state inside our React components.

**File: `src/features/counter/Counter.jsx`**

```jsx
import { useSelector, useDispatch } from "react-redux";

import {
  increment,
  decrement,
  reset,
  incrementByAmount,
} from "./counterSlice";

function Counter() {
  // Read state from Redux Store
  const count = useSelector((state) => state.counter.count);

  // Get dispatch function
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Counter: {count}</h1>

      <button onClick={() => dispatch(increment())}>
        Increment
      </button>

      <button onClick={() => dispatch(decrement())}>
        Decrement
      </button>

      <button onClick={() => dispatch(reset())}>
        Reset
      </button>

      <button onClick={() => dispatch(incrementByAmount(5))}>
        Increment by 5
      </button>
    </div>
  );
}

export default Counter;
```

#### Understanding Redux Hooks

**1. `useSelector()`**

`useSelector()` is a hook provided by React-Redux.

It is used to access or read data from the Redux store.

Example:

```jsx
const count = useSelector((state) => state.counter.count);
```

Understanding the code:

- `useSelector()` receives a selector function.
- `state` represents the entire Redux store state.
- `state.counter` accesses the counter slice.
- `state.counter.count` accesses the count property inside that slice.
- The selected value is stored in the `count` variable.

Whenever the selected state changes, React-Redux checks whether the component needs to re-render.

**2. `useDispatch()`**

`useDispatch()` is another hook provided by React-Redux.

It is used to get the `dispatch` function, which allows us to send actions to the Redux store.

Example:

```jsx
const dispatch = useDispatch();
```

Now we can dispatch actions:

```jsx
dispatch(increment());
dispatch(decrement());
dispatch(reset());
```

**Understanding the process:**

- `dispatch()` sends an action to the Redux store.
- The corresponding reducer handles that action.
- The Redux state gets updated.
- Components subscribed to the changed state receive the updated value.

**3. What is `action.payload`?**

`action.payload` is used to access additional data passed along with an action.

For example, consider our reducer:

```jsx
incrementByAmount: (state, action) => {
  state.count += action.payload;
}
```

Here, `action.payload` contains the value passed when dispatching the action.

In our component:

```jsx
dispatch(incrementByAmount(5));
```

The value `5` becomes the action payload.

Therefore:

```jsx
state.count += 5;
```

If the current count is `10`, the updated count becomes `15`.

---

## 7. Render the Counter Component

**File: `src/App.jsx`**

```jsx
import Counter from "./features/counter/Counter";

function App() {
  return (
    <div>
      <h1>Redux Toolkit Counter Example</h1>
      <Counter />
    </div>
  );
}

export default App;
```

Now run the application:

```bash
npm run dev
```

Our Redux Toolkit Counter application is ready!

---

## 8. How Redux Toolkit Works – Complete Data Flow

This is one of the most important concepts to understand when learning Redux.

Let's understand what happens when we click the Increment button.

### Redux Data Flow

1. The user clicks the Increment button.
2. The `dispatch()` function sends the `increment()` action.
3. The Redux store receives the dispatched action.
4. The corresponding reducer function inside `counterSlice.js` executes.
5. The reducer updates the state.
6. The Redux store holds the updated state.
7. `useSelector()` detects that the selected value has changed.
8. The React component re-renders with the updated counter value.

### Visual representation

```text
        User clicks Increment
                 |
                 v
        dispatch(increment())
                 |
                 v
          Redux Store
                 |
                 v
       Counter Slice Reducer
                 |
                 v
         State Updated
                 |
                 v
           useSelector()
                 |
                 v
        React Component
                 |
                 v
          UI Re-rendered
```

**Remember this flow:**

`Component → Dispatch → Action → Reducer → Store Update → Selector → UI`

---

## 9. Important Redux Toolkit Terminologies

| Terminology | Definition |
|---|---|
| Redux | A predictable state management library. |
| Redux Toolkit (RTK) | The official recommended toolset for writing Redux logic. |
| Store | Central location where the Redux application state is maintained. |
| Slice | A collection of state and reducer logic for a particular feature. |
| State | The current data maintained by the application. |
| Initial State | The starting value of a particular slice. |
| Reducer | A function that determines how state changes in response to an action. |
| Action | An object describing what happened. |
| Action Creator | A function that creates an action object. |
| Dispatch | A function used to send actions to the Redux store. |
| Payload | Additional data passed along with an action. |
| Selector | A function used to read or select data from the Redux store. |
| Provider | A component that makes the Redux store available to React components. |
| Immer | A library that allows us to write simpler immutable state updates. |
| Middleware | Functions that can intercept or process dispatched actions before they reach reducers. |

## 10. Important Redux Toolkit Functions and Hooks

| Function / Hook | Usage |
|---|---|
| `configureStore()` | Creates and configures the Redux store. |
| `createSlice()` | Creates a slice with reducers and generated action creators. |
| `useSelector()` | Reads data from the Redux store. |
| `useDispatch()` | Gets the dispatch function to send actions. |
| `Provider` | Makes the store available to React components. |

Other useful Redux Toolkit APIs to learn later:

- `createAsyncThunk()` – Handles asynchronous operations such as API requests.
- `createEntityAdapter()` – Helps manage normalized collections of data.
- `createSelector()` – Creates memoized selectors for derived data.
- RTK Query – Provides API fetching and caching functionality.

## 11. Common Mistakes to Avoid

**1. Forgetting to wrap the application with Provider**

Incorrect:

```jsx
<App />
```

Correct:

```jsx
<Provider store={store}>
  <App />
</Provider>
```

**2. Forgetting to register the reducer in the store**

Creating a slice alone does not register it in the Redux store.

Always add its reducer:

```jsx
reducer: {
  counter: counterReducer,
}
```

**3. Using the wrong state path**

If the store is configured like this:

```jsx
reducer: {
  counter: counterReducer,
}
```

Then access the state using:

```jsx
state.counter.count
```

Not:

```jsx
state.count
```

**4. Forgetting to dispatch an action**

Incorrect:

```jsx
increment();
```

Correct:

```jsx
dispatch(increment());
```

**5. Confusing actions with reducers**

- Actions describe what should happen.
- Reducers define how the state should change.
- Dispatch sends the action to the store.

**6. Using `counterSlice.render` instead of `counterSlice.reducer`**

Correct:

```jsx
export default counterSlice.reducer;
```

**7. Modifying state outside Redux reducers**

Keep Redux state updates inside the appropriate reducer logic rather than directly modifying the selected state in components.

---

## 12. Redux Toolkit vs React Context API

Both can help share state across components, but they serve different needs.

| Feature | Context API | Redux Toolkit |
|---|---|---|
| Purpose | Share values across components | Manage application state |
| Setup | Built into React | Requires installation |
| State updates | Usually managed with `useState` or `useReducer` | Managed through reducers and actions |
| Debugging | Basic React debugging | Redux DevTools |
| Middleware | No built-in Redux-style middleware system | Supports middleware |
| Async logic | Implemented using normal JavaScript patterns | Supports thunks and RTK Query |
| Best suited for | Simpler shared state | Complex shared application state |

**Important:** Context API is not a replacement for every Redux use case, and Redux is not necessary for every shared state requirement. Choose based on application complexity.

---

## 13. Quick Revision – Remember These Steps

Whenever you implement Redux Toolkit in a React application, remember this order:

1. Install Redux Toolkit and React-Redux.
2. Create the Redux store using `configureStore()`.
3. Wrap the application with `Provider` in `main.jsx`.
4. Create a slice using `createSlice()`.
5. Define the `name`, `initialState`, and `reducers`.
6. Export the generated action creators.
7. Export the slice reducer.
8. Register the reducer inside `store.js`.
9. Use `useSelector()` to access the Redux state.
10. Use `useDispatch()` to dispatch actions.
11. Run the application and test the state updates.

## 14. Further Topics to Learn

After understanding the basic Counter example, the next topics to explore are:

- [ ] Multiple slices in a single Redux store.
- [ ] Sharing state between multiple components.
- [ ] Passing payloads to reducers.
- [ ] Updating arrays and objects in Redux state.
- [ ] Conditional state updates.
- [ ] Redux Toolkit with API calls.
- [ ] `createAsyncThunk()` for asynchronous operations.
- [ ] Loading, success, and error states.
- [ ] RTK Query for API data fetching and caching.
- [ ] Redux Toolkit with TypeScript.
- [ ] Redux Toolkit in React Native.

---

## Official Documentation and Resources

- Redux Toolkit: https://redux-toolkit.js.org/
- Redux Official Documentation: https://redux.js.org/
- Redux Toolkit Quick Start: https://redux.js.org/tutorials/quick-start
- Redux Toolkit Usage Guide: https://redux.js.org/usage/usage-guide
- React-Redux Documentation: https://react-redux.js.org/