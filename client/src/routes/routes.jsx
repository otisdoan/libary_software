
import SendEmail from "../pages/ForgotPassword/SendEmail";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login-In";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import SignUp from "../pages/Sign-Up/SignUp";


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
                path: "/reset-password",
                element: <ResetPassword />
            }
        ]
    }
]