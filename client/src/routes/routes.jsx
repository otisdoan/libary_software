import SendEmail from "../pages/ForgotPassword/SendEmail";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login-In";
import SignUp from "../pages/Sign-Up/SignUp";
import Activate from "../pages/Activate/Activate";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import Admin from "../pages/Admin/Admin";
import UserAdmin from "../pages/UserAdmin/UserAdmin";
import UserProfile from "../pages/Profiles/UserProfiles";
import BookAdmin from "../pages/BookAdmin/BookAdmin";
import CategoryAdmin from "../pages/CategoryAdmin/CategoryAdmin";
import AddCategory from "../pages/AddCategory/AddCategory";
import LayoutDefault from "../pages/LayoutDefault/LayoutDefault";
import Notifications from "../pages/Notifications/Notifications";
import AddBook from "../pages/AddBook/AddBook";
import AuthorAdmin from "../pages/AuthorAdmin/AuthorAdmin";
import PublishAdmin from "../pages/PublisherAdmin/PublishAdmin";
import AddAuthor from "../pages/AddAuthor/AddAuthor";
import AddPublisher from "../pages/AddPublisher/AddPublisher";
import BookDetail from "../pages/BookDetail/BookDetail";
import SearchPage from "../pages/SearchPage";
import BorrowBook from "../pages/BorrowBook";
import HistoryBorrowBook from "../pages/HistoryBorrowBook";
import BookReturned from "../pages/BookReturned";
import ExpiredBook from "../pages/ExpiredBook";

export const routes = [

    {
        path: "/",
        element: <Home />,
    },
    {
        path: '/',
        element: <LayoutDefault />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <SignUp />,
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
            },
            {
                path: '/notifications',
                element: <Notifications />
            },
            {
                path: '/book-detail/:id',
                element: <BookDetail />
            },
            {
                path: '/search/:title',
                element: <SearchPage />
            },
            {
                path: '/history-borrow-book',
                element: <HistoryBorrowBook />
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
                path: 'book',
                element: <BookAdmin />
            },
            {
                path: 'category',
                element: <CategoryAdmin />,
            },
            {
                path: 'category/new-category',
                element: <AddCategory />
            },
            {
                path: 'book',
                element: <BookAdmin />
            },
            {
                path:'book/new-book',
                element: <AddBook />
            },
            {
                path: 'author',
                element: <AuthorAdmin />
            },
            {
                path: 'publisher',
                element: <PublishAdmin />
            },
            {
                path: 'author/new-author',
                element: <AddAuthor />
            },
            {
                path: 'publisher/new-publisher',
                element: <AddPublisher />
            },
            {
                path: 'borrow-book',
                element: <BorrowBook />
            },
            {
                path: 'returned-book',
                element: <BookReturned />
            },
            {
                path: 'expired-book',
                element: <ExpiredBook />
            }
        ]
    }
]