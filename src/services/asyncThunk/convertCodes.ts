import { createAsyncThunk } from "@reduxjs/toolkit";
import ExchangeratesAPI from "../ExchangeratesAPI";
import DataToConvert from "../../types/DataToConvert";
import ConvertResponse from "../../types/ConvertResponse";

export const convertCodes = createAsyncThunk("convert/codes", async (data: DataToConvert) => {

    if (data.amount === "") {
        alert("Amount is required")
        return
    }
    const amountNumber = parseFloat(data.amount.replace(",", "."))
    if (isNaN(amountNumber)) {
        alert("Invalid amount")
        return
    }

    if (!data.from || !data.to) {
        alert("Both currencies are required")
        return
    }
    
    return await ExchangeratesAPI.convertEndpoint(data.from.value, data.to.value, amountNumber, data.date) as ConvertResponse
})