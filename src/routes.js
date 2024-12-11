import * as React from "react";
import {
    createBrowserRouter,
} from "react-router-dom";
import "./index.css";
import Login from "./auth";
import { AuthChecker } from './auth';
import Main from "./main";
import Todo from "./components/Todo";
import { TodoDetail } from "./components/TodoDetail";

const ErrorPage = () => {
    return <div>Error Pag dfgfhne</div>
}
const router = createBrowserRouter([
    {
        path: '/app',
        element: <h3>APP</h3>
    },
    {
        path: "/",
        element: <AuthChecker>
            <Main></Main>
        </AuthChecker>,
        errorElement: <ErrorPage />,
    },
    {
        path: '/login',
        element: <Login></Login>,
        errorElement: <ErrorPage />,

    }
    , {
        path: '/shortner',
        element: <AuthChecker>
            <h4>URL-Shortner</h4>
        </AuthChecker>
    },
    {
        path: '/todo',
        element: <AuthChecker>
            <Todo></Todo>
        </AuthChecker>
    },
    {
        path: '/todo/:id',
        element: <AuthChecker>
            <TodoDetail></TodoDetail>
        </AuthChecker>
    },
    {
        path: '/todo/add'
    }

]);
export default router
