import Button from "components/common/button";
import Link from "next/link";
import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI

    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    console.log({ error, errorInfo });
  }

  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div
          style={{
            display: "grid",
            placeItems: "center",
            paddingTop: "3rem",
            gap: "1rem",
          }}
        >
          <h2>خطایی رخ داد</h2>

          <Link passHref={true} href="/">
            <Button>بازگشت به صفحه اصلی</Button>
          </Link>
        </div>
      );
    }

    // Return children components in case of no error

    return this.props.children;
  }
}

export default ErrorBoundary;
