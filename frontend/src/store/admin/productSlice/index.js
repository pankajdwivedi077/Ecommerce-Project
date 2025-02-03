import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    isLoading: false,
    productList: []
}

export const addNewProduct = createAsyncThunk('/products/addNewProduct', async (formData) => {
    const result = await axios.post(
        "http://localhost:5000/api/admin/products/add",
        formData, {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
    )
    return result?.data;
})

export const fetchAllProducts = createAsyncThunk('/products/fetchAllProducts', async () => {
    const result = await axios.get(
        "http://localhost:5000/api/admin/products/fetch",
    )
    return result?.data;
})

export const edditProduct = createAsyncThunk('/products/editProduct', async ({ id, formData }) => {
    const result = await axios.put(
        `http://localhost:5000/api/admin/products/edit/${id}`,
        formData, {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

    )
    return result?.data;
})

export const deleteProduct = createAsyncThunk('/products/deleteProduct', async (id) => {
    const result = await axios.delete(
        `http://localhost:5000/api/admin/products/delete/${id}`,

    )
    return result?.data;
})

const adminProductsSlice = createSlice({
    name: "adminProduct",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
         .addCase(fetchAllProducts.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(fetchAllProducts.fulfilled, (state, action) => {
            console.log(action.payload.data)
            state.isLoading = false;
            state.productList = action.payload.data;
         })
         .addCase(fetchAllProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.productList = [];
         })
         .addCase(deleteProduct.fulfilled, (state, action) => {
            state.productList = state.productList.filter(product => product._id !== action.meta.arg);
        })
    }
})

export default adminProductsSlice.reducer