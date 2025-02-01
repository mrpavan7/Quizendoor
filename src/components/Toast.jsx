import { useState, useEffect } from "react";
import "../index.css";

const Toast = ({ message, type = "default", onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      const exitTimer = setTimeout(onClose, 300);
      return () => clearTimeout(exitTimer);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`toast toast-${type} ${
        !isExiting ? "toast-enter" : "toast-exit"
      }`}
    >
      {message}
    </div>
  );
};

export default Toast;
