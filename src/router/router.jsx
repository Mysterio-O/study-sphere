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
import Profile from "../pages/Dashboard/Profile";
import Posts from "../pages/Posts/Posts";
import AboutUs from "../pages/AboutUs/AboutUs";
import UpdateProfile from "../components/Dashboard/SettingComponents/UpdateProfile";
import ContactUs from "../pages/ContactUs/ContactUs";
import LearningGuide from "../pages/LearningGuide/LearningGuide";
import Error404 from "../pages/Error/Error404";
import Error403 from "../pages/Error/Error403";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import TermsOfService from "../pages/TermsOfService/TermsOfService";
import CookiesPolicy from "../pages/CookiesPolicy/CookiesPolicy";

const router = createBrowserRouter([
    //  main routess
    {
        path: "/",
        Component: RootLayout,
        errorElement: <Error404 />,
        children: [
            { index: true, Component: Home },
            {
                path: '/posts',
                element: <PrivateRoute>
                    <Posts />
                </PrivateRoute>
            },
            {
                path: '/about-us',
                Component: AboutUs
            },
            {
                path: '/contact-us',
                Component: ContactUs
            },
            {
                path: '/learning-guide',
                Component: LearningGuide
            },
            {
                path: '/forbidden',
                Component: Error403
            },
            {
                path: '/privacy-policy',
                Component: PrivacyPolicy
            },
            {
                path: '/terms',
                Component: TermsOfService
            },
            {
                path: '/cookies',
                Component: CookiesPolicy
            }
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
            },
            {
                path: 'profile',
                Component: Profile
            },
            {
                path: 'update-profile',
                Component: UpdateProfile
            }
        ]
    }
])

export default router;