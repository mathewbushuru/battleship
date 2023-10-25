import { createBrowserRouter, RouterProvider } from "react-router-dom";

import WelcomePage from "@/pages/welcome-page";
import ErrorPage from "@/pages/error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <div data-testid="App" className="bg-background h-screen">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
