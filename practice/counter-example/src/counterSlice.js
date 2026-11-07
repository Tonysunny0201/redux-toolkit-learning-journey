import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: "Counter",
    initialState: {
        count: 0,
    },
    reducers: {
        increment: (state, action) => {
            state.count += 1;
        },
        decrement: (state, action) => {
            state.count -= 1;
        },
        reset: (state, action) => {
            state.count = 0;
        }
    }
})

export const { increment, decrement, reset } = counterSlice.actions;
export default counterSlice.reducer;