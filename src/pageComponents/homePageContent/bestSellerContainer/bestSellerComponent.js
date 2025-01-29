"use client"; // Ensure this is a client component

import React from "react";
import { Typography, Box } from "@mui/material";
import BestSellerCard from "./bestSellerCard";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery"; // Import the client-side hook
import { useTheme } from "@mui/material/styles";

const BestSellerContainer = styled("div")(({ theme, isTablet }) => ({
  display: "flex",
  flexDirection: isTablet ? "column" : "row", // Stack vertically on tablets
  justifyContent: "space-between",
  alignItems: "center",
  width: "80vw",
  padding: theme.spacing(2),
  gap: theme.spacing(2),
}));

export default function BestSellerComponent() {
  const theme = useTheme(); // MUI theme hook (Client only)
  const isTablet = useMediaQuery(theme.breakpoints.down("lg")); // Check if screen is tablet size or smaller

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: "1vh",
        width: "90vw",
      }}
    >
      <Typography variant="h5" style={{ padding: "2vh" }}>OUR BEST SELLERS</Typography>
      <BestSellerContainer isTablet={isTablet}>
        <BestSellerCard title="LADIES" videoSrc="./elegantShe.mp4" />
        <BestSellerCard title="GENTLEMEN" videoSrc="./elegantMan.mp4" />
      </BestSellerContainer>
    </div>
  );
}
