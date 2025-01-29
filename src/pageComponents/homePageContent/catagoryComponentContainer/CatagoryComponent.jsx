"use client";
import React, { useRef } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CircleComponent from "./CircleComponent";

// ✅ Styled Components
const CardContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  height: "30vh",
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  position: "relative", // Needed for absolute positioning of arrows
  padding:"0 5vw 0 5vw"
}));

const CircleWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing(2),
  overflowX: "auto",
  scrollbarWidth: "none", // ✅ Hide scrollbar
  "&::-webkit-scrollbar": { display: "none" },
  scrollBehavior: "smooth",
  width: "90%", // Limits scrolling area
   padding: theme.spacing(10)
}));

export default function CategoryCarousel({ categories }) {
  const totalCards = categories?.length || 0;
  const scrollRef = useRef(null);

  // ✅ Function to Scroll Left
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 200;
    }
  };

  // ✅ Function to Scroll Right
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 200;
    }
  };

  return (
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
              left: 0,
              zIndex: 10,
              backgroundColor: "rgba(255,255,255,0.7)",
              boxShadow: 3,
              "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
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
              right: 0,
              zIndex: 10,
              backgroundColor: "rgba(255,255,255,0.7)",
              boxShadow: 3,
              "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        )}
      </Box>
    </CardContainer>
  );
}