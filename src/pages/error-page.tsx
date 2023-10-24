import {
  useRouteError,
  useNavigate,
  isRouteErrorResponse,
} from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  console.error(error);

  let content: React.ReactNode;

  if (isRouteErrorResponse(error)) {
    content = error.statusText || error.status;
  } else if (error instanceof Error) {
    content = error.message;
  } else {
    content = "Sorry, an unexpected error has occurred.";
  }
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center space-y-4 px-8 py-14">
      <h1>Oops!</h1>
      <pre className="text-sm">{content}</pre>
      <div className="flex gap-4">
        <button onClick={() => navigate(-1)}>Go back</button>
        <button onClick={() => navigate("/")}>Go home</button>
      </div>
    </div>
  );
}

export default ErrorPage;
