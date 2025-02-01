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
  height: "30vh",
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  position: "relative", // Needed for absolute positioning of arrows
  padding: "0 5vw", // Adjusted padding for better responsiveness
  [theme.breakpoints.down("md")]: {
    height: "25vh", // Adjusted for tablets
    padding: "0 3vw",
  },
  [theme.breakpoints.down("sm")]: {
    height: "20vh", // Adjusted for mobile
    padding: "0 2vw",
  },
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
  padding: theme.spacing(5), // Adjusted for better spacing
  [theme.breakpoints.down("md")]: {
    gap: theme.spacing(1.5),
    padding: theme.spacing(3),
  },
  [theme.breakpoints.down("sm")]: {
    gap: theme.spacing(1),
    padding: theme.spacing(2),
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
              left: { xs: "5px", sm: "10px", md: "20px" }, // Responsive positioning
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
              right: { xs: "5px", sm: "10px", md: "20px" }, // Responsive positioning
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