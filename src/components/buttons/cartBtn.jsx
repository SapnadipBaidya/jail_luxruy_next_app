import React from "react";
import ButtonWrapper from "../wrappers/ButtonComp";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";

function CartBtn({ variant = "outlined", color = "primary" }) {
  return (
    <ButtonWrapper variant={variant} color={color}>
      <LocalMallOutlinedIcon />
    </ButtonWrapper>
  );
}

export default CartBtn;
