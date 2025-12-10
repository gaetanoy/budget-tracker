import type { FallbackProps } from "react-error-boundary";
import { LoginError } from "./api/fetch";
import { useNavigate } from "react-router";

export default function ErrorHandler(props: FallbackProps) {
  const navigate = useNavigate();


  if (props.error instanceof LoginError) {
    props.resetErrorBoundary();
    navigate("/login");
  }

  return "Something went wrong";
}
