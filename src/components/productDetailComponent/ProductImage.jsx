"use client"
import React, { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";

const StyledContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  alignItems: "center",
  width: "100%",
  maxWidth: "500px",
  position: "relative", // Added for zoom container positioning
  "@media (min-width: 900px)": {
    alignItems: "flex-start",
  },
});

const StyledMainImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "300px",
  objectFit: "cover",
  borderRadius: "8px",
  backgroundColor: theme.palette.secondary.main,
  cursor: "zoom-in", // Indicates zoom functionality
  [theme.breakpoints.up("sm")]: {
    height: "400px",
  },
}));

const StyledThumbnailContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "10px",
  justifyContent: "center",
  width: "100%",
  flexWrap: "wrap",
  [theme.breakpoints.up("md")]: {
    justifyContent: "flex-start",
  },
}));

const StyledThumbnail = styled("img")(({ theme, active }) => ({
  width: "64px",
  height: "64px",
  objectFit: "cover",
  borderRadius: "4px",
  cursor: "pointer",
  border: active ? `2px solid ${theme.palette.primary.main}` : "2px solid transparent",
  transition: "border 0.2s ease-in-out, transform 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const ZoomContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: "105%",
  width: "48vw",
  height: "70vh",
  overflow: "hidden",
  borderRadius: "8px",
  border: `0.5vh solid ${theme.custom.cardBg}`,
  display: "none", // Initially hidden
  backgroundRepeat: "no-repeat",
  backgroundSize: "300% 300%", // Zoomed image size
  backgroundColor:theme.custom.cardBg,
  zIndex:1000,
  transition:"ease-in-out 0.5s !important"
}));

const ProductImage = ({ images = [] }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [zoomStyle, setZoomStyle] = useState({});
  const mainImageRef = useRef(null);
  const zoomContainerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!mainImageRef.current || !zoomContainerRef.current) return;

    const { left, top, width, height } = mainImageRef.current.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    
    const y = ((e.pageY - top) / height) * 100;

    setZoomStyle({
      display: "block",
      backgroundImage: `url(${hoveredImage || selectedImage})`,
      backgroundPosition: `${x}% ${y}%`,
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: "none" });
  };

  return (
    <StyledContainer>
      <StyledMainImage
        ref={mainImageRef}
        src={hoveredImage || selectedImage}
        alt="Product Image"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
      <ZoomContainer ref={zoomContainerRef} style={zoomStyle} />
      <StyledThumbnailContainer>
        {images?.map((image, index) => (
          <StyledThumbnail
            key={`Thumbnail ${index + 1}`}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            active={image === selectedImage ? 1 : 0}
            onClick={() => setSelectedImage(image)}
            onMouseEnter={() => setHoveredImage(image)}
            onMouseLeave={() => setHoveredImage(null)}
          />
        ))}
      </StyledThumbnailContainer>
    </StyledContainer>
  );
};

export default React.memo(ProductImage);