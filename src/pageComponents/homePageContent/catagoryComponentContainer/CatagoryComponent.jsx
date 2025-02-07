"use client";
import React, { useRef } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CircleComponent from "./CircleComponent";

// ✅ Styled Components
const CardContainer = styled(Box)(({ theme, mode }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  // Use the image as the background
  backgroundImage:
    mode == "dark"
      ? "url('./webps/darkmodeBackgroundImg.webp')"
      : "url('./webps/lightmodeBackgroundImg.webp')",
  backgroundSize: "cover", // Make the background cover the container
  backgroundRepeat: "no-repeat", // Prevent the image from repeating
  backgroundPosition: "center", // Center the image
  width: "100%",
  height: "100%",
  backgroundSize: "cover",
  
}));

const CircleWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  
  width:"85vw",
  overflowX: "auto", // Enable horizontal scrolling
  scrollbarWidth: "none", // Hide scrollbar in most browsers
  "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar for Webkit-based browsers
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    padding: "2vw",
  },
}));


export default function CategoryCarousel({ categories }) {
  const totalCards = categories?.length || 0;
  const scrollRef = useRef(null);

  // ✅ Function to Scroll Left
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= window.innerWidth < 600 ? 150 : 200; // Adjust scroll distance for mobile
    }
  };

  // ✅ Function to Scroll Right
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += window.innerWidth < 600 ? 150 : 200; // Adjust scroll distance for mobile
    }
  };

  return (
    <>
    <Typography
        variant="h4"
        gutterBottom
        style={{ marginTop: "4vh", marginBottom: "4vh",textAlign:"center",fontWeight: 600 }}
      >
        SHOP BY CATEGORY
      </Typography>
    <CardContainer>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          position: "relative",
          justifyContent: "center",
        }}
      >
        {/* ✅ Show Left Button If Data Exists */}
        {totalCards > 0 && (
          <IconButton
            onClick={scrollLeft}
            sx={{
              position: "absolute",
              left: { xs: "5px", sm: "10px", md: "0px" }, // Responsive positioning
              zIndex: 10,
              backgroundColor: "rgba(255,255,255,0.7)",
              boxShadow: 3,
              "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
              display: { xs: "none", md: "flex" }, // Hide on mobile and tablet
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>
        )}

        {/* ✅ Show Circles Only If Data Exists */}
        {totalCards > 0 ? (
          <CircleWrapper ref={scrollRef}>
            {categories.map((item) => (
              <CircleComponent key={item.category_id} data={item} />
            ))}
          </CircleWrapper>
        ) : (
          <Typography>No Categories Available</Typography>
        )}

        {/* ✅ Show Right Button If Data Exists */}
        {totalCards > 0 && (
          <IconButton
            onClick={scrollRight}
            sx={{
              position: "absolute",
              right: { xs: "5px", sm: "10px", md: "0px" }, // Responsive positioning
              zIndex: 10,
              backgroundColor: "rgba(255,255,255,0.7)",
              boxShadow: 3,
              "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
              display: { xs: "none", md: "flex" }, // Hide on mobile and tablet
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        )}
      </Box>
    </CardContainer>
    </>
  );
}