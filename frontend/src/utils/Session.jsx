import { useEffect } from "react";

export default function Session({ children }) {
  useEffect(() => {
    let timeout;

    const resetTimer = () => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        localStorage.removeItem("auth-user");
        window.location.href = "/";
      }, 5 * 60 * 1000); 
    };

    ["mousemove", "mousedown", "keydown", "scroll", "touchstart"].forEach(
      (event) => window.addEventListener(event, resetTimer)
    );

    resetTimer();

    return () => {
      clearTimeout(timeout);

      ["mousemove", "mousedown", "keydown", "scroll", "touchstart"].forEach(
        (event) => window.removeEventListener(event, resetTimer)
      );
    };
  }, []);

  return children;
}