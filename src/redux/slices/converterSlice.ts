import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ConverterState from "../../types/interfaces/ConverterState";
import { convertCodes } from "../../services/asyncThunk/convertCodes";
import { getSupportedCodes } from "../../services/asyncThunk/getSuportedCodes";

const initialState: ConverterState = {
    amount: "",
    convertedAmount: "",
    option: [],
    fromConvertType: undefined,
    toConvertType: undefined
}

const converterSlice = createSlice({
    name: "conversor",
    initialState,
    reducers: {
        setAmount: (state, action: PayloadAction<string>) => {
            state.amount = action.payload
        },
        setFromConvertType: (state, action) => {
            state.fromConvertType = action.payload
        },
        setToConvertType: (state, action) => {
            state.toConvertType = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(convertCodes.fulfilled, (state, action) => {
                const convertedAmount = action.payload?.conversion_result.toString()
                if (convertedAmount) {
                    state.convertedAmount = convertedAmount
                }
            })
            .addCase(getSupportedCodes.fulfilled, (state, action) => {
                if ("error" in action.payload) {
                    console.error(action.payload.error)
                    return
                }
                const options: { value: string, label: string}[] = []
                action.payload.supported_codes.forEach(code => {
                    options.push({ value: code[0], label: code[0] + " - " + code[1]})
                })
                state.option = options
            })
    }
})

export const { setAmount, setFromConvertType, setToConvertType } = converterSlice.actions
export default converterSlice.reducer