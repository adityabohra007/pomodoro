import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import "./index.css";
import Login from "./auth";
import { AuthChecker } from './auth';
import Main from "./main";

const ErrorPage = () => {
    return <div>Error Page</div>
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
    , {}
]);
export default router
// ReactDOM.createRoot(document.getElementById("root")).render(
// <React.StrictMode>
// <RouterProvider router={router} />
// </React.StrictMode>
// );
