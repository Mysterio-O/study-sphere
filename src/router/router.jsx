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
import MySubjects from "../pages/Dashboard/MySubjects";
import AllSchedules from "../pages/Dashboard/AllSchedules";
import Setting from "../pages/Dashboard/Setting";
import QuestionGenerator from "../pages/Dashboard/QuestionGenerator";
import StudyPlanner from "../pages/Dashboard/StudyPlanner";
import Wallet from "../pages/Dashboard/Wallet";

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
            },
            {
                path: 'my-subjects',
                Component: MySubjects
            },
            {
                path: "my-schedules",
                Component: AllSchedules
            },
            {
                path: 'setting',
                Component: Setting
            },
            {
                path: "qa-generator",
                Component: QuestionGenerator
            },
            {
                path: "study-planner",
                Component: StudyPlanner
            },
            {
                path: 'my-wallet',
                Component: Wallet
            }
        ]
    }
])

export default router;