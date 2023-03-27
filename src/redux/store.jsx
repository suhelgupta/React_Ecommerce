import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import cartSlice from './cartSlice'
import productSlice from './productSlice'

export default configureStore({
    reducer : {
        user: userSlice.reducer,
        cart: cartSlice.reducer,
        product: productSlice.reducer
    }
})