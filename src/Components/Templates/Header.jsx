import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import Home from "../Pages/Home/Home";
import Form from "../Pages/Form/Form";
import FilmDetaille from "../Pages/FilmDetaille/FilmDetaille";

export default function Header() {
  const Linkes = createBrowserRouter([
    {
      path: "/",
      element: <Outlet />,
      children: [
        { index: true, element: <Home /> },
        { path: "createFilm", element: <Form /> },
        { path: "updateFilm/:id", element: <Form /> },
        { path: "FilmDetaille/:id", element: <FilmDetaille /> },
      ],
    },
  ]);
  function Layout() {
    <Outlet />;
  }
  return <RouterProvider router={Linkes}></RouterProvider>;
}
