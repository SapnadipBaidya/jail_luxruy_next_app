"use client";

import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import useDebounce from "@/utils/customHooks/useDebounce"; // ✅ Debounced Auto-Slide
import removeWhiteSpaceFromMiddle from "@/utils/attachProperNavName";

const CarouselContainer = styled(Box)({
  position: "relative",
  width: "100vw",
  height: "100vh",
  overflow: "hidden", // ✅ Prevents scrolling
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const ImageWrapper = styled(Box)(({ active }) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  opacity: active ? 1 : 0,
  transition: "opacity 1s ease-in-out",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: active ? "pointer" : "default", // ✅ Clickable only when active
  zIndex: active ? 10 : 1, // ✅ Ensures active image is on top
}));

const Image = styled("img")({
  width: "100%", // ✅ Makes sure the image doesn't overflow
  height: "100%",
  objectFit: "cover", // ✅ Maintains aspect ratio and prevents stretching
  maxWidth: "100vw", // ✅ Prevents going outside viewport
  maxHeight: "100vh",
});

const DotsWrapper = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  bottom: "30px",
  width: "100%",
  zIndex: 100,
});

const Dot = styled("div")(({ theme, active }) => ({
  width: "14px",
  height: "14px",
  borderRadius: "50%",
  backgroundColor: active ? theme.palette.primary.main : theme.palette.grey[400],
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  margin: "0 5px",
}));

export default function ImageCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  // ✅ Use debounced auto-slide (Prevents re-renders)
  const autoSlide = useDebounce(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, 5000);

  useEffect(() => {
    if (!images || images.length === 0) return;
    autoSlide();
  }, [currentIndex, autoSlide]);

  if (!images || images.length === 0) {
    return <Box sx={{ textAlign: "center", mt: 5 }}>No images available</Box>;
  }

  return (
    <CarouselContainer>
      {images.map((image, index) => (
        <ImageWrapper
          key={image.id || index}
          active={index === currentIndex}
          onClick={() =>
            index === currentIndex && router.push(`/products/${removeWhiteSpaceFromMiddle(image?.catagory_name)}`)
          }
        >
          <Image src={image.catagory_img} alt={image.alt || "Product Image"} />
        </ImageWrapper>
      ))}

      {/* Dot Navigation */}
      <DotsWrapper>
        {images.map((_, index) => (
          <Dot key={index} active={index === currentIndex} onClick={() => setCurrentIndex(index)} />
        ))}
      </DotsWrapper>
    </CarouselContainer>
  );
}
