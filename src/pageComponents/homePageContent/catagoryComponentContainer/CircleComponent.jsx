"use client";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography, CircularProgress } from "@mui/material";
import Link from "next/link";
import removeWhiteSpaceFromMiddle from "@/utils/attachProperNavName";
import TruncatedText from "@/components/wrappers/TruncatedText";

// ✅ Wrapper for the entire circle and text
const CircleWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",

  height: "25vh",
  textAlign: "center"
}));

// ✅ Circle container
const CircleContainer = styled(Box)(({ theme, radius = "13vh" }) => ({

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "10%",
  width: radius,
  height: radius,
  overflow: "hidden",
  position: "relative",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.2)",
    boxShadow: `0 0 1vw ${theme.palette.secondary.main}`,
  },
  padding:"0.3vh"
}));

// ✅ Image with hydration-safe loading
const Image = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  opacity: 0, // ✅ Initially hidden
  transition: "opacity 0.5s ease-in-out", // ✅ Smooth fade-in effect
  borderRadius: "8%",
});

// ✅ Loading spinner inside the circle
const Spinner = styled(Box)(({ radius = "13vh" }) => ({
  position: "absolute",
  width: radius,
  height: radius,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

function CircleComponent({ data }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  // ✅ Load image safely when `data` updates
  useEffect(() => {
    if (data?.catagory_logo) {
      setImageSrc(data.catagory_logo);
    }
  }, [data?.catagory_logo]);

  const handleImageLoad = () => setIsLoaded(true);

  if (!data) return null; // ✅ Prevents errors if `data` is undefined

  return (
    <CircleWrapper>
      {/* ✅ Next.js Link Wrapping (Added prefetch={false}) */}
      <Link href={`/products/${removeWhiteSpaceFromMiddle(data?.catagory_name)}`} passHref prefetch={false}>
        <CircleContainer radius="12.5vh">
          {/* ✅ Spinner Shown Until Image Loads */}
          {!isLoaded && (
            <Spinner radius="12.5vh">
              <CircularProgress size={40} />
            </Spinner>
          )}
          {/* ✅ Image Fade-in Effect (Now Handles Refresh Properly) */}
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={data?.catagory_name + " Image "}
              onLoad={handleImageLoad}
              style={{ opacity: isLoaded ? 1 : 0 }}
            />
          ) : (
            <Typography sx={{ opacity: 0.5 }}>{data?.catagory_name + " Image "}</Typography>
          )}
        </CircleContainer>
      </Link>

      {/* ✅ Category Name */}
      <TruncatedText maxWidth={"7vw"}>{data?.catagory_name}</TruncatedText>
    </CircleWrapper>
  );
}

export default CircleComponent;
