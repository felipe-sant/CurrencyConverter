import { configureStore } from "@reduxjs/toolkit";
import convertReducer from "./slices/converterSlice"

export const store = configureStore({
    reducer: {
        converter: convertReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch