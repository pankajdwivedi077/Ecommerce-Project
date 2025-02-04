import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    isLoading: false,
    productsList: []
}

export const fetchAllFilterdProducts = createAsyncThunk('/products/fetchAllProducts', async () => {
    const result = await axios.get(
        "http://localhost:5000/api/shop/products/fetch",
    )
    return result?.data;
})

const shoppingProductsSlice = createSlice({
    name: "shoppingProducts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
       builder
        .addCase(fetchAllFilterdProducts.pending, (state, action) => {
            state.isLoading = true
        })
        .addCase(fetchAllFilterdProducts.fulfilled, (state, action) => {
            // console.log(action.payload, "pa")
            state.isLoading = false
            state.productsList = action.payload.data
        })
        .addCase(fetchAllFilterdProducts.rejected, (state, action) => {
            state.isLoading = false
            state.productsList = []
        })
    }
})

export default shoppingProductsSlice.reducer