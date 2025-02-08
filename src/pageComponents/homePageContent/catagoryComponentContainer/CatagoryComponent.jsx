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
  backgroundImage:
    mode == "dark"
      ? "url('./webps/darkmodeBackgroundImg.webp')"
      : "url('./webps/lightmodeBackgroundImg.webp')",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  width: "100%",
  height: "100%",
}));

const CircleWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "85vw",
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
      scrollRef.current.scrollLeft -= window.innerWidth < 600 ? 150 : 200;
    }
  };

  // ✅ Function to Scroll Right
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += window.innerWidth < 600 ? 150 : 200;
    }
  };

  return (
    <>
      <Typography
        variant="h4"
        gutterBottom
        style={{ marginTop: "4vh", marginBottom: "4vh", textAlign: "center", fontWeight: 600 }}
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
          {totalCards > 0 && (
            <IconButton
              onClick={scrollLeft}
              sx={{
                position: "absolute",
                left: { xs: "5px", sm: "10px", md: "0px" },
                zIndex: 10,
                backgroundColor: "rgba(255,255,255,0.7)",
                boxShadow: 3,
                "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
                display: { xs: "none", md: "flex" },
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>
          )}

          {totalCards > 0 ? (
            <CircleWrapper ref={scrollRef}>
              {categories.map((item, index) => (
                <CircleComponent key={item.category_id || index} data={item} />
              ))}
            </CircleWrapper>
          ) : (
            <Typography>No Categories Available</Typography>
          )}

          {totalCards > 0 && (
            <IconButton
              onClick={scrollRight}
              sx={{
                position: "absolute",
                right: { xs: "5px", sm: "10px", md: "0px" },
                zIndex: 10,
                backgroundColor: "rgba(255,255,255,0.7)",
                boxShadow: 3,
                "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
                display: { xs: "none", md: "flex" },
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
