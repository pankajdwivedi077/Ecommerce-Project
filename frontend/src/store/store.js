import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice/index"
import adminProductReducer from "./admin/productSlice/index"

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProduct: adminProductReducer,
    }
})

export default store;