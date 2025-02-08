"use client";
import React from "react";
import { Card, Typography } from "@mui/material";
import Link from 'next/link';
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const BestSellerComp = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  maxWidth: "400px",
  padding: "2vw",
  borderRadius: "10px",
  backgroundColor: theme.palette.background.paper,
  textAlign: "center",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s",
  "&:hover": {
    transform: "scale(1.03)",
    boxShadow: `0 0 20px ${theme.palette.secondary.main}`,
  },
  [theme.breakpoints.down("sm")]: {
    width: "95vw", // Makes it bigger on mobile
    maxWidth: "none",
  },
}));

const StyledVideo = styled("video")(({ theme }) => ({
  borderRadius: "8px",
  width: "100%",
  height: "auto",
  objectFit: "cover",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    height: "auto", // Ensures proper scaling on mobile
  },
}));

function BestSellerCard({ title, videoSrc }) {
  const theme = useTheme();
  const ismobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <BestSellerComp>
      <Link href="/product-category" passHref style={{ textDecoration: "none", color: "inherit" }}>
        <Typography
          variant={ismobile ? "h5" : "h6"} // Bigger text on mobile
          sx={{ fontWeight: "bold", marginBottom: "10px" }}
        >
          {title}
        </Typography>
        <StyledVideo autoPlay loop muted playsInline>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </StyledVideo>
      </Link>
    </BestSellerComp>
  );
}

export default BestSellerCard;