

function ErrorMessage({ message }) {
    return (
      <p className="error">
        <span>❌</span>
        <span>{message}</span>
      </p>
    );
  }

  export default ErrorMessage;