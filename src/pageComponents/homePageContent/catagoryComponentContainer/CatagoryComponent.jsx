"use client";
import React, { useContext, useRef } from "react";
import { Box, Typography, IconButton, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CircleComponent from "./CircleComponent";
import { AppContext } from "@/context/applicationContext";

// ✅ Styled Components
const CardContainer = styled(Box)(({ theme, mode }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "center",
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  backgroundImage:
    mode === "dark"
      ? "url('./webps/darkmodeBackgroundImg.webp')"
      : "url('./webps/lightmodeBackgroundImg.webp')",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  width: "100%",
  height: "50vh",
  padding: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    height: "40vh", // Adjust height for smaller screens
  },
  opacity: "1",
}));

const CircleWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "85vw",
  overflowX: "auto",
  scrollbarWidth: "none", // Hide scrollbar in most browsers
  "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar for Webkit-based browsers
  gap: theme.spacing(2), // Consistent spacing between circles
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    gap: theme.spacing(2), // Reduce gap for smaller screens
  },
  minHeight: "35vh",
  scrollBehavior: "smooth", // Add smooth scrolling behavior
}));

export default function CategoryCarousel({ mode = "light" }) {
  const { categoryItems } = useContext(AppContext);
  const totalCards = categoryItems?.length || 0;
  const scrollRef = useRef(null);

  // ✅ Function to Scroll Left
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -200, // Adjust scroll distance as needed
        behavior: "smooth", // Enable smooth scrolling
      });
    }
  };

  // ✅ Function to Scroll Right
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 200, // Adjust scroll distance as needed
        behavior: "smooth", // Enable smooth scrolling
      });
    }
  };

  return (
    <>
      <CardContainer mode={mode}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textAlign: "center",
            fontWeight: 600,
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" }, // Responsive font size
          }}
        >
          SHOP BY CATEGORY
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            position: "relative",
            justifyContent: "center",
          }}
        >
          {totalCards > 0 && (
            <IconButton onClick={scrollLeft} sx={{ marginRight: "1vh" }}>
              <ArrowBackIosIcon />
            </IconButton>
          )}

          {totalCards > 0 ? (
            <CircleWrapper ref={scrollRef}>
              {categoryItems?.map((item, index) => (
                <CircleComponent key={item.category_id || index} data={item} />
              ))}
            </CircleWrapper>
          ) : (
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              No Categories Available
            </Typography>
          )}

          {totalCards > 0 && (
            <IconButton onClick={scrollRight} sx={{ marginLeft: "1vh" }}>
              <ArrowForwardIosIcon />
            </IconButton>
          )}
        </Box>
      </CardContainer>
    </>
  );
}