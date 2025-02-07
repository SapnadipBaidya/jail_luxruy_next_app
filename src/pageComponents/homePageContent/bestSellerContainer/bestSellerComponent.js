"use client"; // Ensure this is a client component

import React from "react";
import { Typography, Box, Grid } from "@mui/material";
import BestSellerCard from "./bestSellerCard";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const BestSellerContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  padding: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
  },
}));

export default function BestSellerComponent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detects mobile screens

  return (
    <BestSellerContainer>
      <Typography
        variant={isMobile ? "h5" : "h4"} // Larger title for mobile
        sx={{ textAlign: "center", padding: "2vh", fontWeight: 600 }}
      >
        OUR BEST SELLERS
      </Typography>

      <Grid
        container
        spacing={isMobile ? 2 : 3}
        justifyContent="center"
        sx={{ width: "100%", maxWidth: "1200px" }}
      >
        <Grid item xs={12} sm={6} display="flex" justifyContent="center">
          <BestSellerCard title="LADIES" videoSrc="./elegantShe.mp4" />
        </Grid>
        <Grid item xs={12} sm={6} display="flex" justifyContent="center">
          <BestSellerCard title="GENTLEMEN" videoSrc="./elegantMan.mp4" />
        </Grid>
      </Grid>
    </BestSellerContainer>
  );
}