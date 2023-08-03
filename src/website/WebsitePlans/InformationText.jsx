import React, { Fragment } from "react";
import Tooltip from "@mui/material/Tooltip";
import { AiOutlineInfoCircle } from "react-icons/ai";

export default function InformationText({ infoText }) {
  return (
    <Fragment>
      <Tooltip title={infoText}>
        <span className="tooltip_box">
          <AiOutlineInfoCircle />
        </span>
      </Tooltip>
    </Fragment>
  );
}
