import React from "react";

const ToggleAvailableLabel = (props) => {
  return (
    <div style={{ display: "flex" }}>
      <div
        className={
          props.status === true
            ? "toggle-label-circle-green"
            : "toggle-label-circle-purple"
        }
      ></div>
      <h3 className="availability-label sub-content">
        {props.status === true ? "AVAILABLE" : "NOT AVAILABLE"}
      </h3>
    </div>
  );
};

export default ToggleAvailableLabel;
