"use client";

import PropTypes from "prop-types";
import { Card, Box, Fade, Slide, useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import WishListButton from "../buttons/wishListBtn.jsx";
import CartBtn from "../buttons/cartBtn.jsx";
import TruncatedText from "./TruncatedText.jsx";
import DeleteBtn from "../buttons/deleteBtn.jsx";

// ── Custom Hook: useDeviceType ─────────────────────────────────────────
const useDeviceType = () => {
  const isTouchDevice = useMediaQuery("(hover: none) and (pointer: coarse)");
  return isTouchDevice ? "touch" : "pc";
};

// ── Styled Components ──────────────────────────────────────────────────

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "deviceType",
})(({ theme, deviceType }) => ({
  margin: "1rem", // Use rem for consistent spacing
  width: "25rem", // Base width
  height: "18rem", // Base height
  maxWidth: "100%", // Ensure it doesn't overflow on small screens
  position: "relative",
  overflow: "hidden",
  backgroundColor: theme.custom?.cardBg || "#ffffff", // Fallback color
  borderRadius: "1rem", // Slightly rounded corners
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, opacity 0.3s ease-in-out",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  cursor: "pointer",
  willChange: "transform, box-shadow, opacity",
  "&:hover": {
    transform: "scale(1.02)", // Slight scale-up on hover
    boxShadow: theme.shadows[6], // Use theme shadow for consistency
    ...(deviceType === "pc" && {
      "& .hover-content": {
        opacity: 1,
        transform: "translateY(0)",
      },
      "& .product-info": {
        opacity: 0,
      },
    }),
  },
  // For touch devices, make the hover content always visible
  ...(deviceType === "touch" && {
    "& .hover-content": {
      opacity: 1,
      transform: "translateY(0)",
    },
  }),
  // Media queries for responsiveness
  [theme.breakpoints.down('lg')]: {
    width: "18rem",
    height: "28rem",
  },
  [theme.breakpoints.down('md')]: {
    width: "16rem",
    height: "26rem",
  },
  [theme.breakpoints.down('sm')]: {
    width: "100%",
    height: "14.8rem",
    margin: "0.5rem 0",
  },
}));

const CardActionsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignItems: "center",
  margin: "1rem 0",
  width: "100%", // Full width for better alignment
  padding: "0 1rem", // Add padding for spacing
}));

const ProductImage = styled("img")(({ theme }) => ({
  width: "100%", // Full width to maintain responsiveness
  height: "14rem", // Fixed height for consistency
  objectFit: "cover", // Ensure the image covers the area without distortion
  borderRadius: "1rem 1rem 0 0", // Rounded corners only at the top
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)", // Subtle zoom effect on hover
  },
  [theme.breakpoints.down('lg')]: {
    height: "16rem",
  },
  [theme.breakpoints.down('md')]: {
    height: "14rem",
  },
  [theme.breakpoints.down('sm')]: {
    height: "10rem",
  },
}));

const ProductInfo = styled(Box)(({ theme }) => ({
  
  backgroundColor:"red",
  opacity: 1,
  transition: "opacity 0.3s ease-in-out",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  width: "100%", // Full width for better alignment
   // Center-align text
  "& .product-name": {
    fontSize: "1.2rem",
    fontWeight: 600,
    marginBottom: "0.5rem",
    color: theme.palette.text.primary,
  },
  "& .product-price": {
    fontSize: "1.1rem",
    fontWeight: 500,
    color: theme.palette.text.secondary,
  },
  [theme.breakpoints.down('lg')]: {
    height: "16rem",
  },
  [theme.breakpoints.down('md')]: {
    height: "14rem",
  },
  [theme.breakpoints.down('sm')]: {
    height: "3rem",
  },
}));

const HoverContent = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: "0",
  width: "100%",
  color: "#fff",
  textAlign: "center",
  
  opacity: 0, // Hidden by default on PC
  transform: "translateY(100%)", // Moved down by default on PC
  transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent background
  borderRadius: "0 0 1rem 1rem", // Rounded corners at the bottom
}));
// ── Main Component ───────────────────────────────────────────────────
const StyledCardWrapper = React.memo(
  ({ type, item, accessToken, setWishlistData, setWishlistLoading }) => {
    const pathname = usePathname();
    const router = useRouter();
    const [show, setShow] = useState(false);
    const deviceType = useDeviceType();

    useEffect(() => {
      setShow(true);
      router.prefetch("/item");
      return () => setShow(false);
    }, [router]);

    const mainImgUrl =
      item?.product_data?.gallery?.images?.[0] || "/placeholder.jpg";

    return (
      <Slide direction="up" in={show} mountOnEnter unmountOnExit key={item?.product_id+item?.product_detail_id+Date.now()}>
        <StyledCard
          deviceType={deviceType}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            router.push(
              `/item/${item?.product_name}?pid=${item?.product_id}&pdid=${item?.product_detail_id}`
            );
          }}
        >
          <Fade in={show} timeout={500}>
            <ProductImage src={mainImgUrl} alt="Product Image" />
          </Fade>

          <ProductInfo className="product-info">
            <TruncatedText fontSizeNumber={14}>
              {item?.product_name || "No Name"}
            </TruncatedText>
            <TruncatedText fontSizeNumber={12}>
              ₹{item?.product_data?.price || "N/A"}
            </TruncatedText>
          </ProductInfo>

          {type === "Product" ? (
            <HoverContent className="hover-content">
              <TruncatedText fontSize="16px">View Product</TruncatedText>
              <WishListButton item={item} />
            </HoverContent>
          ) : (
            // For non-product types, show Cart and Delete buttons.
            <CardActionsContainer>
              <CartBtn
                item={item}
                setWishlistData={setWishlistData}
                setWishlistLoading={setWishlistLoading}
              />
              <DeleteBtn
                item={item}
                setWishlistData={setWishlistData}
                setWishlistLoading={setWishlistLoading}
              />
            </CardActionsContainer>
          )}
        </StyledCard>
      </Slide>
    );
  }
);

StyledCardWrapper.propTypes = {
  type: PropTypes.string.isRequired,
  item: PropTypes.object,
};

export default StyledCardWrapper;