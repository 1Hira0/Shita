import { useRouteError } from "react-router-dom";

export default function Error() {
  const error:any = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Hmmmm</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message} (status checks havent been added yet)</i>
      </p>
    </div>
  );
}