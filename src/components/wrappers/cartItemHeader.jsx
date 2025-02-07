"use client";
import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { styled } from "@mui/system";

// Styled Components
const CardContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  borderRadius: "16px",
  width: "100%",
  maxWidth: "800px", // Adjusted for better responsiveness
  margin: "0 auto",
  padding: theme.spacing(2),
}));

const HeaderRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  gap: theme.spacing(2),
  flexWrap: "wrap",
}));

const HeaderCell = styled(Box)(({ theme }) => ({
  flex: 1,
  minWidth: "100px", // Minimum width for each cell
  textAlign: "center",
}));

const CartItemHeader = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <CardContainer>
      <HeaderRow>
        <HeaderCell>
          <Typography variant={isMobile ? "body2" : "body1"}>Product</Typography>
        </HeaderCell>
        <HeaderCell>
          <Typography variant={isMobile ? "body2" : "body1"}>Size</Typography>
        </HeaderCell>
        <HeaderCell>
          <Typography variant={isMobile ? "body2" : "body1"}>Price</Typography>
        </HeaderCell>
        <HeaderCell>
          <Typography variant={isMobile ? "body2" : "body1"}>Quantity</Typography>
        </HeaderCell>
        <HeaderCell>
          <Typography variant={isMobile ? "body2" : "body1"}>Subtotal</Typography>
        </HeaderCell>
        <HeaderCell>
          <Typography variant={isMobile ? "body2" : "body1"}>Action</Typography>
        </HeaderCell>
      </HeaderRow>
    </CardContainer>
  );
};

export default CartItemHeader;