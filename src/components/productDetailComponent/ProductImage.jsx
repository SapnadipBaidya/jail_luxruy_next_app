"use client"
import React, { useState } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";

// Dummy images for fallback (Different text for each)
const DUMMY_IMAGES = [
  "https://via.placeholder.com/400x400/cccccc/000000?text=Image+1",
  "https://via.placeholder.com/400x400/aaaaaa/000000?text=Image+2",
  "https://via.placeholder.com/400x400/888888/000000?text=Image+3",
  "https://via.placeholder.com/400x400/666666/000000?text=Image+4",
];

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
  // Use real images if available, otherwise use dummy images
  const validImages = images.length > 0 ? images : DUMMY_IMAGES;
  const [selectedImage, setSelectedImage] = useState(validImages[0]);

  return (
    <StyledContainer>
      <StyledMainImage src={selectedImage} alt="Product Image" />
      <StyledThumbnailContainer>
        {validImages.map((image, index) => (
          <StyledThumbnail
            key={index}
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

export default ProductImage;