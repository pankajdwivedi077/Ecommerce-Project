import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice/index"
import adminProductReducer from "./admin/productSlice/index"
import shopProductReducer from "./shop/productSlice/index"
import shopCartReducer from './shop/cartSlice/index'
import addressReducer from './shop/addressSlice/index'
import shopOrderReducer from './shop/orderSlice/index'
import adminOrderReducer from './admin/orderSlice/index'
import shopSearchReducer from './shop/searchSlice/index'
import reviewReducer from './shop/reviewSlice/index'

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProduct: adminProductReducer,
        shopProduct: shopProductReducer,
        shopCart: shopCartReducer,
        address: addressReducer,
        shopOrder: shopOrderReducer,
        adminOrder: adminOrderReducer,
        shopSearch: shopSearchReducer,
        review: reviewReducer
    }
})

export default store;