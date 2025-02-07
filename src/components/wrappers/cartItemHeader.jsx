"use client";
import React from "react";
import { Box, Typography, IconButton, TextField } from "@mui/material";
import { styled } from "@mui/system";

// Styled Components
const CardContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  borderRadius: "16px"
}));

const CartItemHeader = () => {
  return (
    <CardContainer>
      {/* Product Image and Name */}
      <tr
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "50%",
          border:"solid 2px red"
        }}
      >
        <td>
          {" "}
          <Typography>Product</Typography>
        </td>
        <td>
          <Typography>Size</Typography>
        </td>
        <td>
          <Typography>price</Typography>
        </td>
        <td>
          <Typography>quantity</Typography>
        </td>
        <td>
          <Typography>subtotal</Typography>
        </td>
        <td>
          <Typography>action</Typography>
        </td>
      </tr>
    </CardContainer>
  );
};

export default CartItemHeader;
