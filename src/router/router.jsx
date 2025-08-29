import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "../routes/PrivateRoute";
import Overview from "../pages/Dashboard/Overview";
import AddSubjects from "../pages/Dashboard/AddSubjects";

const router = createBrowserRouter([
    //  main routes
    {
        path: "/",
        Component: RootLayout,
        children: [
            { index: true, Component: Home }
        ]
    },

    // auth routes
    {
        path: '/auth',
        Component: AuthLayout,
        children: [
            {
                path: 'signin',
                Component: SignIn
            },
            {
                path: 'signup',
                Component: SignUp
            }
        ]
    },

    // dashboard routes
    {
        path: '/dashboard',
        element: <PrivateRoute>
            <DashboardLayout />
        </PrivateRoute>,
        children: [
            { index: true, Component: Overview },
            {
                path: 'add-subjects',
                Component: AddSubjects
            }
        ]
    }
])

export default router;