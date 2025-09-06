import { createBrowserRouter } from "react-router";
import App from "../App"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />, // entry point
        children: [
            {
                path: "/",
                element: <h1>Home</h1>
            },
            {
                path: "/orders",
                element: <div>Orders</div>
            },
            {
                path: "/about",
                element: <div>About</div>
            }
        ]
    },
]);

export default router;