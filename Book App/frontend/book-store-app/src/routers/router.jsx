import { createBrowserRouter } from "react-router";
import Home from "../pages/home/Home"
import App from "../App"
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/books/CartPage"

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
        ]
    },
]);

export default router;