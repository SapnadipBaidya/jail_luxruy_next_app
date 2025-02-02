"use client"
import React, { useEffect, useState, useRef } from "react";
import { Box, CircularProgress } from "@mui/material";
import { styled } from "@mui/system";

const StyledContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  alignItems: "center",
  width: "100%",
  maxWidth: "500px",
  position: "relative",
  "@media (min-width: 900px)": {
    alignItems: "flex-start",
  },
});

const MainImageContainer = styled(Box)({
  position: "relative",
  width: "100%",
});

const StyledMainImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "300px",
  objectFit: "cover",
  borderRadius: "8px",
  backgroundColor: theme.palette.secondary.main,
  cursor: "zoom-in",
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

const ThumbnailWrapper = styled(Box)({
  position: "relative",
});

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
  display: "none",
  backgroundRepeat: "no-repeat",
  backgroundSize: "300% 300%",
  backgroundColor: theme.custom.cardBg,
  zIndex: 1000,
  transition:"ease-in-out 0.3s !important"
}));

const Spinner = ({ size = "40px" }) => (
  <CircularProgress
    size={size}
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    }}
  />
);

const ProductImage = ({ images = [] }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});
  const mainImageRef = useRef(null);
  const zoomContainerRef = useRef(null);
  const currentImageRef = useRef(selectedImage);

  useEffect(() => {
    currentImageRef.current = hoveredImage || selectedImage;
  }, [hoveredImage, selectedImage]);

  useEffect(() => {
    const mainImage = mainImageRef.current;
    if (!mainImage) return;

    const handleMouseMove = (e) => {
      if (!mainImageRef.current || !zoomContainerRef.current) return;

      const { left, top, width, height } = mainImage.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;

      const zoomContainer = zoomContainerRef.current;
      zoomContainer.style.display = "block";
      zoomContainer.style.backgroundImage = `url(${currentImageRef.current})`;
      zoomContainer.style.backgroundPosition = `${x}% ${y}%`;
    };

    const handleMouseLeave = () => {
      if (zoomContainerRef.current) {
        zoomContainerRef.current.style.display = "none";
      }
    };

    mainImage.addEventListener("mousemove", handleMouseMove, { passive: true });
    mainImage.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      mainImage.removeEventListener("mousemove", handleMouseMove);
      mainImage.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    if (zoomContainerRef.current) {
      zoomContainerRef.current.style.backgroundImage = `url(${currentImageRef.current})`;
    }
  }, [hoveredImage, selectedImage]);

  const currentImage = hoveredImage || selectedImage;

  return (
    <StyledContainer>
      <MainImageContainer>
        <StyledMainImage
          ref={mainImageRef}
          src={currentImage}
          alt="Product Image"
          onLoad={() => setLoadedImages((prev) => ({ ...prev, [currentImage]: true }))}
          onError={() => setLoadedImages((prev) => ({ ...prev, [currentImage]: true }))}
        />
        {!loadedImages[currentImage] && <Spinner />}
      </MainImageContainer>

      <ZoomContainer ref={zoomContainerRef} />

      <StyledThumbnailContainer>
        {images?.map((image, index) => (
          <ThumbnailWrapper key={`Thumbnail-${index}`}>
            <StyledThumbnail
              src={image}
              alt={`Thumbnail ${index + 1}`}
              active={image === selectedImage ? 1 : 0}
              onClick={() => setSelectedImage(image)}
              onMouseEnter={() => setHoveredImage(image)}
              onMouseLeave={() => setHoveredImage(null)}
              onLoad={() => setLoadedImages((prev) => ({ ...prev, [image]: true }))}
              onError={() => setLoadedImages((prev) => ({ ...prev, [image]: true }))}
            />
            {!loadedImages[image] && <Spinner size="24px" />}
          </ThumbnailWrapper>
        ))}
      </StyledThumbnailContainer>
    </StyledContainer>
  );
};

export default React.memo(ProductImage);