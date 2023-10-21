import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../componets/Home/Home";
import Courses from "../pages/Courses/Courses";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Blog from "../pages/Blog/Blog";
import Faq from "../pages/Faq/Faq";
import Contact from "../pages/Contact/Contact";
import Dashboard from "../Layout/Dashboard";
import SubmitQuestions from "../pages/DashBoard/SubmitQuestions/SubmitQuestions";
import ErrorPage from "../componets/ErrorPage/Errorpage";
import QuizView from "../pages/DashBoard/QuizView/QuizView";
import QuizViewDescription from "../pages/DashBoard/QuizViewDescription/QuizViewDescription";

export const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <Main />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: '/',
                    element: <Home />
                },
                {
                    path: '/courses',
                    element: <Courses />
                },
                {
                    path: '/blog',
                    element: <Blog />
                },
                {
                    path: '/faq',
                    element: <Faq />
                },
                {
                    path: '/contacts',
                    element: <Contact />
                },
                {
                    path: '/submitquestions',
                    element: <SubmitQuestions />
                },
                {
                    path: '/login',
                    element: <Login />
                },
                {
                    path: '/signup',
                    element: <SignUp />
                },
                {
                    path: '/quizview',
                    element: <QuizView />
                },
                {
                    path: '/quizviewdescription',
                    element: <QuizViewDescription />
                }
            ]
        },
        {
            path: '/dashboard',
            element: <Dashboard />,

            // children: [
            //     {
            //         path: '/submitquestions',
            //         element: <SubmitQuestions />
            //     }
            // ]
        }
    ]
);
