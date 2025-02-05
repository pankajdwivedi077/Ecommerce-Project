import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice/index"
import adminProductReducer from "./admin/productSlice/index"
import shopProductReducer from "./shop/productSlice/index"
import shopCartReducer from './shop/cartSlice/index'

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProduct: adminProductReducer,
        shopProduct: shopProductReducer,
        shopCart: shopCartReducer,
    }
})

export default store;