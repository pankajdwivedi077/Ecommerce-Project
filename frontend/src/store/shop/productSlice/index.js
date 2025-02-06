import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    isLoading: false,
    productsList: [],
    productDetails: null
}

export const fetchAllFilterdProducts = createAsyncThunk('/products/fetchAllProducts', async ({filterParams, sortParams}) => {

    const query = new URLSearchParams({
        ...filterParams,
        sortBy: sortParams 
    })

    const result = await axios.get(
        `http://localhost:5000/api/shop/products/fetch?${query}`,
    )
    return result?.data;
})

export const fetchProductDetail = createAsyncThunk('/products/fetchProductDetails', async (id) => {

    const result = await axios.get(
        `http://localhost:5000/api/shop/products/fetch/${id}`,
    )

    return result?.data;
})

const shoppingProductsSlice = createSlice({
    name: "shoppingProducts",
    initialState,
    reducers: {
        setProductDetails: (state, action) => {
            state.productDetails = null
        }
    },
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
        .addCase(fetchProductDetail.pending, (state, action) => {
            state.isLoading = true
        })
        .addCase(fetchProductDetail.fulfilled, (state, action) => {
            // console.log(action.payload, "pa")
            state.isLoading = false
            state.productDetails = action?.payload?.data
        })
        .addCase(fetchProductDetail.rejected, (state, action) => {
            state.isLoading = false
            state.productDetails = null
        })
    }
})

export const { setProductDetails } = shoppingProductsSlice.actions

export default shoppingProductsSlice.reducer