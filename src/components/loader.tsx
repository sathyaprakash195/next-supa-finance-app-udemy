import React from "react";

function Loader() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="border-8 border-primary border-t-transparent h-10 w-10 animate-spin rounded-full"></div>
    </div>
  );
}

export default Loader;
