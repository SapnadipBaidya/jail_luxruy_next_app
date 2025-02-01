"use client"
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";

// Dummy images for fallback (Different text for each)

const StyledContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  alignItems: "center",
  width: "100%",
  maxWidth: "500px",
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
  [theme.breakpoints.up("sm")]: {
    height: "400px",
  },
}));

const StyledThumbnailContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "10px",
  justifyContent: "center",
  width: "100%",
  flexWrap: "wrap", // Ensures thumbnails wrap properly
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

const ProductImage = ({ images = [] }) => {
  
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <StyledContainer>
      <StyledMainImage src={selectedImage} alt="Product Image" />
      <StyledThumbnailContainer>
        {images?.map((image, index) => (
          <StyledThumbnail
            key={`Thumbnail ${index + 1}`}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            active={image === selectedImage ? 1 : 0}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </StyledThumbnailContainer>
    </StyledContainer>
  );
};

export default React.memo(ProductImage);