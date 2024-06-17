import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Admin from "../feature/admin/components";
import HomePage from "../feature/user/components";
import Todő̊ from "../feature/todo/components";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
    ],
  },
  {
    path: "/todo",
    element: <Todő̊ />
  }
]);
