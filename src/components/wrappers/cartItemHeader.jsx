"use client";
import React from "react";
import { Box, Typography, IconButton, TextField } from "@mui/material";
import { styled } from "@mui/system";

// Styled Components
const CardContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "16px",
  padding: "15px",
  width: theme.typography.pxToRem(1000),
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
          width: "100%",
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
