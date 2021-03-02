import React, { FC } from "react";

const NotFound: FC = () => {
  return (
    <div className="page-wrapper">
      <p className="error-message">
        404 Page Not Found <i className="far fa-grin-squint-tears"></i>
      </p>
    </div>
  );
};

export default NotFound;
