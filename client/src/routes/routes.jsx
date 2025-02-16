import SendEmail from "../pages/ForgotPassword/SendEmail";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login-In";
import SignUp from "../pages/Sign-Up/SignUp";
import Activate from "../pages/Activate/Activate";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import Admin from "../pages/Admin/Admin";
import UserAdmin from "../pages/UserAdmin/UserAdmin";
import UserProfile from "../pages/Profiles/UserProfiles";
import AdminProfile from "../pages/Profiles/AdminProfile";
import BookAdmin from "../pages/BookAdmin/BookAdmin";

export const routes = [
    {
        path: "/",
        element: <Home />,
        children: [
            {
                path:"/login",
                element: <Login/>,
            },
            {
                path:"/register",
                element: <SignUp/>,
            }, 
            {
                path: "/forgot-password",
                element: <SendEmail />
            },
            {
                path: "/reset-password/:token",
                element: <ResetPassword />
            },
            {
                path: "/activate/:token",
                element: <Activate />
            },
            {
                path: '/profile',
                element: <UserProfile />
            }
        ]
    },
    {
        path: "/admin",
        element: <Admin />,
        children: [
            {
                path: 'user',
                element: <UserAdmin />
            },
            {
                path: 'profile',
                element: <AdminProfile />
            }, 
            {
                path: 'book',
                element: <BookAdmin />
            }
        ]
    }
]