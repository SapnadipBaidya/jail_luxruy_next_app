"use client"
import React from "react";
import { Card, styled } from "@mui/material";
import Link from 'next/link';

// Styled components
const BestSellerComp = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "center",
  height: "80%",
  width: "85vw",
  textDecoration: "none",
  backgroundColor: theme.palette.background.paper,
  padding:"2vw",
  borderRadius:"1vh"
}));

const StyledVideo = styled("video")(({ theme }) => ({
  borderRadius: "0.2vh",
  height: "70%",
  width: "85%",
  padding: "2vh",
  objectFit: "cover", // Maintain aspect ratio and cover the container
  transition: "transform 0.3s, box-shadow 0.3s", // Smooth hover effect
  "&:hover": {
    transform: "scale(1.05)", // Grows slightly on hover
    boxShadow: `0 0 3vw ${theme.palette.secondary.main}`, // Adds a smooth shadow
  },
   borderRadius:"0.5vh"
}));

function BestSellerCard({ title, videoSrc }) {
  return (
    <BestSellerComp
      key="/product-category"
      variant="body1"
      component={Link}
      to="/product-category"
    >
      <h3>{title}</h3>
      <StyledVideo
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline // Necessary for iOS to allow autoplay
      />
    </BestSellerComp>
  );
}

export default BestSellerCard;