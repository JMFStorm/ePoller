import React, { FC } from "react";
import { useHistory } from "react-router-dom";

interface Props {}

const GetBack: FC<Props> = () => {
  // useHistory
  const history = useHistory();

  // Get back
  const getBackHandle: () => void = () => {
    history.push("/");
  };

  // Return JSX
  return (
    <button className="get-back" onClick={getBackHandle}>
      GET BACK
    </button>
  );
};

export default GetBack;
