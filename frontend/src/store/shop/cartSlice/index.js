import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: [],
  isLoading: false,
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }) => {
    const response = await axios.post(
      "http://localhost:5000/api/shop/cart/add",
      {
        userId,
        productId,
        quantity,
      }
    );
    return response.data;
  }
);

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async ({ userId }, { rejectWithValue }) => {
    console.log(userId)
    if(!userId) {
      return rejectWithValue("User id required")
    }
    try {
      const response = await axios.get(
        `http://localhost:5000/api/shop/cart/get/${userId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching cart.");
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ userId, productId, quantity }) => {
    const response = await axios.put(
      "http://localhost:5000/api/shop/cart/update-cart",
      {
        userId,
        productId,
        quantity,
      }
    );
    return response.data;
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ userId, productId }) => {
    const response = await axios.delete(
      `http://localhost:5000/api/shop/cart/${userId}/${productId}`,
    );
    return response.data;
  }
);

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
     .addCase(addToCart.pending, (state) => {
        state.isLoading = true
     })
     .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false
        state.cartItems = action.payload.data
     })
     .addCase(addToCart.rejected, (state) => {
        state.isLoading = false
        state.cartItems = []
     })
     .addCase(fetchCartItems.pending, (state) => {
      state.isLoading = true
   })
   .addCase(fetchCartItems.fulfilled, (state, action) => {
      state.isLoading = false
      state.cartItems = action.payload.data
   })
   .addCase(fetchCartItems.rejected, (state) => {
      state.isLoading = false
      state.cartItems = []
   })
   .addCase(updateCartItem.pending, (state) => {
    state.isLoading = true
 })
 .addCase(updateCartItem.fulfilled, (state, action) => {
    state.isLoading = false
    state.cartItems = action.payload.data
 })
 .addCase(updateCartItem.rejected, (state) => {
    state.isLoading = false
    state.cartItems = []
 })
 .addCase(deleteCartItem.pending, (state) => {
  state.isLoading = true
})
.addCase(deleteCartItem.fulfilled, (state, action) => {
  state.isLoading = false
  state.cartItems = action.payload.data
})
.addCase(deleteCartItem.rejected, (state) => {
  state.isLoading = false
  state.cartItems = []
})
  },
});

export default shoppingCartSlice.reducer