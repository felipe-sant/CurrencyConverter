import { createAsyncThunk } from "@reduxjs/toolkit";
import ExchangeratesAPI from "../ExchangeratesAPI";

export const getSupportedCodes = createAsyncThunk("get/codes", async () => {
    return await ExchangeratesAPI.getSupportedCodes()
})