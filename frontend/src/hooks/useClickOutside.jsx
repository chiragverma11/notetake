import React, { useEffect } from "react";

export default function useClickOutside() {
  function clickOutside(ref, callback) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (!ref.current?.contains(event.target)) {
          callback();
        }
      }

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  return clickOutside;
}
