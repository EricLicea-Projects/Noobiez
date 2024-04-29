import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import HomePage from "../pages/HomePage";
import ProfilesPage from "../pages/ProfilesPage";
import StatsPage from "../pages/StatsPage";
import LiveGame from "../pages/LiveGame";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "profiles",
        element: <ProfilesPage />,
      },
      {
        path: "stats",
        element: <StatsPage />,
      },
      {
        path: "liveGame",
        element: <LiveGame />,
      },
    ],
  },
]);
