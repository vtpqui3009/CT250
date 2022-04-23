import { Component } from "react";
import PageNotFoundImage from "./concept-of-broken-links.png";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // Gửi thông tin error lên server để dev nhận thông tin fix bug
    console.log(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center flex-col h-screen">
          <h1 className="font-semibold text-2xl">404</h1>
          <div className="my-10 flex items-center">
            <p className="mr-2">Sorry, we couldn't find that page.</p>{" "}
            <a href="/" className="underline text-base-color">
              Go back
            </a>
          </div>
          <img
            src={PageNotFoundImage}
            alt="page not found"
            className="w-4/5 h-2/5 object-contain"
          />
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
