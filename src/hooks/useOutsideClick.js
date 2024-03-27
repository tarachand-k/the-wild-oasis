import React from "react";

function useOutsideClick(clickHandler, listenCapturing = true) {
  const ref = React.useRef();

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        clickHandler();
      }
    }

    document.addEventListener("click", handleClickOutside, listenCapturing);

    return () => {
      document.removeEventListener(
        "click",
        handleClickOutside,
        listenCapturing
      );
    };
  }, [ref, clickHandler, listenCapturing]);

  return ref;
}

export default useOutsideClick;
