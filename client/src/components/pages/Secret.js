import React, { useEffect } from "react";

const Secret = (props) => {
  useEffect(() => {
    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  }, []);
  return (
    <>
      <div className="u-main-container u-transparent">get rekt</div>
    </>
  );
};

export default Secret;
