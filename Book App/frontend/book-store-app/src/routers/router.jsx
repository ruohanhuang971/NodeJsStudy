import { createBrowserRouter } from "react-router";

import App from "../App"
import PrivateRoute from "./privateRoute";
import AdminRoute from "./adminRoute";

import Login from "../components/Login";
import Register from "../components/Register";
import Home from "../pages/home/Home"
import CartPage from "../pages/books/CartPage"
import CheckoutPage from "../pages/books/CheckoutPage";
import SingleBook from "../pages/books/SingleBook";
import OrderPage from "../pages/books/OrderPage";
import AdminLogin from "../components/AdminLogin";
import Dashboard from "../pages/admin/Dashboard";
import DashboardHome from "../pages/admin/DashboardHome";
import ManageBooks from "../pages/admin/edit-books/ManageBooks";
import AddBook from "../pages/admin/edit-books/addBook";
import UpdateBook from "../pages/admin/edit-books/UpdateBook";

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
                element: <PrivateRoute><OrderPage /></PrivateRoute>
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
    {
        path: "/admin",
        element: <AdminLogin />
    },
    {
        path: "/dashboard",
        element: <AdminRoute><Dashboard /></AdminRoute>,
        children: [
            {
                path: "",
                element: <AdminRoute><DashboardHome /></AdminRoute>
            },
            {
                path: "add-book",
                element: <AdminRoute><AddBook /></AdminRoute>
            },
            {
                path: "edit-book/:id",
                element: <AdminRoute><UpdateBook /></AdminRoute>
            },
            {
                path: "manage-book",
                element: <AdminRoute><ManageBooks /></AdminRoute>
            }
        ]
    },
]);

export default router;