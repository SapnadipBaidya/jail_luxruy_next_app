"use client";

import PropTypes from "prop-types";
import {
  Card,
  Box,
  Fade,
  Slide,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import WishListButton from "../buttons/wishListBtn.jsx";
import CartBtn from "../buttons/cartBtn.jsx";
import TruncatedText from "./TruncatedText.jsx";
import DeleteBtn from "../buttons/deleteBtn.jsx";

// ── Custom Hook: useDeviceType ─────────────────────────────────────────
const useDeviceType = () => {
  // This media query returns true for devices that don't support hover (e.g. touch devices)
  const isTouchDevice = useMediaQuery("(hover: none) and (pointer: coarse)");
  return isTouchDevice ? "touch" : "pc";
};

// ── Styled Components ──────────────────────────────────────────────────

// StyledCard accepts a custom prop "deviceType" and, on PC devices,
// applies a hover effect that reveals the wishlist button (inside the card footer)
// and hides the product info.
const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "deviceType",
})(({ theme, deviceType }) => ({
  position: "relative",
  overflow: "visible",
  padding: theme.spacing(1),
  backgroundColor: theme.custom?.cardBg || "#fff",
  boxShadow: "0 4px 8px rgba(164, 180, 112, 0.1)",
  borderRadius: "15px",
  transition:
    "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out !important",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",
  maxWidth: theme.typography.pxToRem(250),
  maxHeight: theme.typography.pxToRem(350),
  margin: "1vh",

  // Only apply these hover styles for PC devices.
  ...(deviceType === "pc" && {
    "&:hover": {
      boxShadow: "none", // Removes the box shadow on hover
      backgroundColor: theme.palette.background.paper,
      paddingBottom:"0",
      borderRadius:"0",
      transform: "scale(1.02) !important",
      "& .wishlist-btn": {
        display: "block",
        
        width: "100%",
        marginTop: "1.5vh",
        transform: "scale(1.09)",
        transition: "transform 0.3s ease-in-out",
      },
      "& .product-info": {
        display: "none",
      },
    },
  }),

  [theme.breakpoints.down("md")]: {
    maxWidth: theme.typography.pxToRem(200),
    maxHeight: theme.typography.pxToRem(280),
  },

  [theme.breakpoints.down("sm")]: {
    maxWidth: theme.typography.pxToRem(130),
    maxHeight: theme.typography.pxToRem(220),
  },
}));

// Responsive Product Image
const ProductImage = styled("img")(({ theme }) => ({
  objectFit: "cover",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.custom?.cardBg || "#fff",
  transition:
    "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out !important",
  minWidth: theme.typography.pxToRem(200),
  minHeight: theme.typography.pxToRem(200),
  maxWidth: theme.typography.pxToRem(200),
  maxHeight: theme.typography.pxToRem(200),
  "&:hover": {
    transform: "scale(1.09)",
  },
  [theme.breakpoints.down("md")]: {
    minWidth: theme.typography.pxToRem(180),
    minHeight: theme.typography.pxToRem(180),
    maxWidth: theme.typography.pxToRem(180),
    maxHeight: theme.typography.pxToRem(180),
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: theme.typography.pxToRem(100),
    minHeight: theme.typography.pxToRem(100),
    maxWidth: theme.typography.pxToRem(100),
    maxHeight: theme.typography.pxToRem(100),
  },
}));

// The cart footer is always visible.
const CardFooter = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "150px",
  [theme.breakpoints.down("sm")]: {
    paddingTop: "5px",
    flexDirection: "column",
    gap: theme.spacing(1),
  },
  
}));

// WishListButtonWrapper controls the visibility of the wishlist button.
// It is modified here to take the full width.
const WishListButtonWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "deviceType",
})(({ theme, deviceType }) => ({
  display: deviceType === "touch" ? "block" : "none",
  width: "100%", // Full width
}));

// ── Main Component ───────────────────────────────────────────────────
const StyledCardWrapper = React.memo(
  ({ type, item, accessToken, setWishlistData }) => {
    const pathname = usePathname();
    console.log("StyledCardWrapper pathname", item?.product_data);
    const mainImgUrl =
      item?.product_data?.gallery?.images?.[0] || "/placeholder.jpg";
    console.log("mainImgUrl", item?.product_data?.gallery);
    const router = useRouter();
    const [show, setShow] = useState(false);

    // Determine device type ("touch" or "pc")
    const deviceType = useDeviceType();

    useEffect(() => {
      setShow(true);
      router.prefetch("/item");
      return () => setShow(false);
    }, [router]);

    return (
      <Slide direction="up" in={show} mountOnEnter unmountOnExit>
        {/* Pass deviceType to StyledCard so its hover effects work appropriately */}
        <StyledCard deviceType={deviceType}>
          <Fade in={show} timeout={500}>
            <ProductImage
              src={mainImgUrl}
              alt="Product Image"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                router.push(
                  `/item/${item?.product_name}?pid=${item?.product_id}&pdid=${item?.product_detail_id}`
                );
              }}
            />
          </Fade>

          {/* Product Info: Name and Price.
              Wrapped in a container with the "product-info" class.
              On PC devices, this info is hidden on hover.
              On touch devices, it remains visible.
          */}
          <Box className="product-info" width="100%" height="70%">
            <TruncatedText fontSize="2vh" maxWidth="100%">
              {item?.product_name || "No Name"}
            </TruncatedText>
            <TruncatedText>
              ₹{item?.product_data?.price || "N/A"}
            </TruncatedText>
          </Box>

          {/* Cart Footer: Always visible */}
          <CardFooter>
            {type === "Product" ? (
              // For products, include the wishlist button inside the footer.
              // On PC devices, the wishlist button is hidden by default and
              // becomes visible (with a full width and scale effect) when the card is hovered.
              // On touch devices, it is always visible.
              <WishListButtonWrapper 
                className="wishlist-btn"
                deviceType={deviceType}
                backgroundColor="#503434"
              >
                <WishListButton item={item} accessToken={accessToken} backgroundColor="#503434" />
              </WishListButtonWrapper>
            ) : (
              // For non-product types, show Cart and Delete buttons.
              <>
                <CartBtn
                  item={item}
                  accessToken={accessToken}
                  setWishlistData={setWishlistData}
                />
                <DeleteBtn
                  item={item}
                  accessToken={accessToken}
                  setWishlistData={setWishlistData}
                />
              </>
            )}
          </CardFooter>
        </StyledCard>
      </Slide>
    );
  }
);

StyledCardWrapper.propTypes = {
  type: PropTypes.string.isRequired,
  item: PropTypes.shape({
    gallery_details: PropTypes.shape({
      gallery: PropTypes.shape({
        images: PropTypes.arrayOf(PropTypes.string),
      }),
    }),
    product_details: PropTypes.shape({
      product_id: PropTypes.number,
      products_details_id: PropTypes.number,
      product_name: PropTypes.string,
      product_price_inr: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    }),
  }),
};

export default StyledCardWrapper;