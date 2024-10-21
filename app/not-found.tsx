import Error from "./components/error";

export default function NotFoundPage() {
  return (
    <div className="grow flex justify-center items-center">
      <Error errorCode="404" text="Page not found" />
    </div>
  );
}
