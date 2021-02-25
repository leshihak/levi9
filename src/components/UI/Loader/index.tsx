import React from "react";
import "./style.scss";

const Loader: React.FC = () => {
  return (
    <div className="lds-circle">
      <div></div>
    </div>
  );
};

export default Loader;
