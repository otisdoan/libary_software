
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login-In";
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
                path:"/regester",
                element: <SignUp/>,
            }
        ]
    }
]