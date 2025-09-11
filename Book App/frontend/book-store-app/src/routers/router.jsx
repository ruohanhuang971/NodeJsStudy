import { createBrowserRouter } from "react-router";

import App from "../App"
import PrivateRoute from "./privateRoute";

import Login from "../components/Login";
import Register from "../components/Register";
import Home from "../pages/home/Home"
import CartPage from "../pages/books/CartPage"
import CheckoutPage from "../pages/books/CheckoutPage";
import SingleBook from "../pages/books/SingleBook";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />, // entry point
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/orders",
                element: <div>Orders</div>
            },
            {
                path: "/about",
                element: <div>About</div>
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/cart",
                element: <CartPage />
            },
            {
                path: "/checkout",
                element: <PrivateRoute><CheckoutPage /></PrivateRoute>
            },
            {
                path: "/books/:id",
                element: <SingleBook />
            },
        ]
    },
]);

export default router;