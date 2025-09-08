import { createSlice } from '@reduxjs/toolkit'
import Swal from 'sweetalert2'

const initialState = {
    cartItems: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes

            const existingItem = state.cartItems.find((items) => items._id === action.payload._id)
            if (!existingItem) {
                state.cartItems.push(action.payload)

                // custom alert
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Product Added to Cart",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                // custom alert
                Swal.fire({
                    title: "Already In Cart",
                    icon: "warning",
                    confirmButtonText: "Done"
                })
            }
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((item) => item._id !== action.payload._id)
        },
        clearCart: (state) => {
            state.cartItems = []
        }
    },
})

// export actions
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer