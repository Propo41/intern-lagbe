import React from "react";

const ToggleAvailableLabel = () => {
  return (
    <div style={{ display: "flex" }}>
      <div className="toggle-label-circle"></div>
      <h3 className="availability-label sub-content"> not Available</h3>
    </div>
  );
};

export default ToggleAvailableLabel;
