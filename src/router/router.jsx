import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";

const router = createBrowserRouter([
    //  create your routes here
    {
        path:"/",
        Component: RootLayout,
        children: [
            {index: true, Component: Home}
        ]
    }
])

export default router;