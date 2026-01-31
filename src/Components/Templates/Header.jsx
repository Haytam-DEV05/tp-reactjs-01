import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import Home from "../Pages/Home/Home";
import Form from "../Pages/Form/Form";

export default function Header() {
  const Linkes = createBrowserRouter([
    {
      path: "/",
      element: <Outlet />,
      children: [
        { index: true, element: <Home /> },
        { path: "createFilm", element: <Form /> },
        { path: "updateFilm/:id", element: <Form /> },
      ],
    },
  ]);
  function Layout() {
    <Outlet />;
  }
  return <RouterProvider router={Linkes}></RouterProvider>;
}
