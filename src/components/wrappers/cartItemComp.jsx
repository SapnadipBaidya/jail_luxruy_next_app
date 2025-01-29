"use client";
import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

// Styled Components
const CardContainer = styled("tr")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper, // Light gray background
  borderRadius: "16px",
}));

const SizeBox = styled(Box)({
  minWidth: "35px",
  height: "35px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid black",
  borderRadius: "8px",
  fontWeight: "bold",
});
const Image = styled("img")({
  width: "10vh",
  height: "10vh",
  objectFit: "cover",
});

const CartItemComp = ({ item, key }) => {
  console.log("CartItemComp", item);
  return (
    <CardContainer key={key}>
      <td>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Image src={item?.gallery_details?.gallery?.images[0]} alt={item?.product_details?.product_name} />
          <Typography fontWeight="bold">{item?.product_details?.product_name}</Typography>
        </Box>
      </td>
      <td>
        <SizeBox>{item?.size_details?.size_name}</SizeBox>
      </td>
      <td>
        <SizeBox>{item?.product_details?.product_price_inr}</SizeBox>
      </td>
      <td>
        <SizeBox>{item?.cart_details?.quantity}</SizeBox>
      </td>
      <td>
        <SizeBox>1000</SizeBox>
      </td>
      <td>
        <IconButton>
          <DeleteForeverOutlinedIcon />
        </IconButton>
      </td>
    </CardContainer>
  );
};

export default CartItemComp;
