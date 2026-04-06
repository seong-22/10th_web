import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import HomeLayout from "./layouts/HomeLayout";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/Mypage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> }, // path가 /기준으로 /시 해당 페이지 등장
      { path: "login", element: <LoginPage /> }, // path가 /기준으로 /login시 해당 페이지 등장
      { path: "signup", element: <SignupPage /> }, // path가 /기준으로 /signup시 해당 페이지 등장
      { path: "my", element: <MyPage /> }, // path가 /기준으로 /mypage시 해당 페이지 등장
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
