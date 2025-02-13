import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    isLoading: false,
    reviews: []
}

export const addReview = createAsyncThunk('/review/addReview', async (formData) => {
    const response = await axios.post(
        `http://localhost:5000/api/shop/review/add`, 
        formData, 
        
        // { headers: { "Content-Type": "application/json" } } // Ensure JSON format
        
    );
    console.log(response.data)
    return response.data;
});


export const getAllReviews = createAsyncThunk('/review/getAllReviews', async (id)=> {
    const response = await axios.get(`http://localhost:5000/api/shop/review/${id}`);
  
    return response.data;
  })

const reviewSlice = createSlice({
    name: 'reviewSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
 
        .addCase(addReview.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(addReview.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log("Fetched Reviews:", action.payload);
            if (action.payload.success) {
                state.reviews.push(action.payload.data);
            }
        })
        .addCase(addReview.rejected, (state) => {
            state.isLoading = false;
        })

         .addCase(getAllReviews.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getAllReviews.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log("Fetched ReviewsAll:", action.payload);
            state.reviews = action.payload.data;
         })
         .addCase(getAllReviews.rejected, (state) => {
            state.isLoading = false;
            state.reviews = [];
         })

    }
})

export default reviewSlice.reducer;