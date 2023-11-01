import { createBrowserRouter, RouterProvider } from "react-router-dom";

import WelcomePage from "@/pages/welcome-page";
import ErrorPage from "@/pages/error-page";
import PlacementPage from "./pages/placement-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/placement",
    element: <PlacementPage />,
  },
]);

function App() {
  return (
    <div data-testid="App" className="bg-background text-primary">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
