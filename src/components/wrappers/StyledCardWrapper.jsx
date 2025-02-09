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

const useDeviceType = () => {
  const isTouchDevice = useMediaQuery("(hover: none) and (pointer: coarse)");
  return isTouchDevice ? "touch" : "pc";
};

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "deviceType",
})(({ theme, deviceType }) => ({
  margin: "1vw",
  minWidth: `clamp(${theme.typography.pxToRem(200)}, 15vw, ${theme.typography.pxToRem(300)})`, // Responsive min-width
  minHeight:`clamp(${theme.typography.pxToRem(250)}, 40vh, ${theme.typography.pxToRem(400)})`, // Responsive min-height
  maxWidth: "50vh",
  maxHeight: "50vh",
  position: "relative",
  overflow: "hidden",
  backgroundColor: theme.custom?.cardBg,
  borderRadius: "2vh",
  transition:
    "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, opacity 0.3s ease-in-out !important",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  cursor: "pointer",
  willChange: "transform, box-shadow, opacity", // Hint to the browser for optimization

  "&:hover": {
    boxShadow: "0 1vh 1.7vw rgba(0, 0, 0, 0.8)", // Adjusted shadow for smoother transition
    ...(deviceType === "pc" && {
      "& .hover-content": {
        opacity: 1,
        transform: "translateY(0) translateZ(0)", // Force GPU acceleration
      },
      "& .product-info": {
        opacity: 0,
      },
    }),
  },

  // Media queries for responsiveness
  "@media (max-width: 768px)": {
    minWidth: "clamp(150px, 40vw, 200px)", // Adjust for tablets
    minHeight: "clamp(250px, 50vh, 300px)",
  },
  "@media (max-width: 480px)": {
    minWidth: "clamp(120px, 80vw, 150px)", // Adjust for mobile
    minHeight: "clamp(200px, 60vh, 250px)",
  },
}));

const CardActionsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  margin: "1vh",
}));

const ProductImage = styled("img")(({ theme }) => ({
  margin: theme.typography.pxToRem(10),
  minWidth: `clamp(${theme.typography.pxToRem(300)}, 10vw, ${theme.typography.pxToRem(150)})`, // Responsive min-width
  maxWidth: `clamp(${theme.typography.pxToRem(350)}, 15.5vw, ${theme.typography.pxToRem(200)})`, // Responsive max-width
  minHeight: `clamp(${theme.typography.pxToRem(260)}, 25vh, ${theme.typography.pxToRem(250)})`, // Responsive min-height
  maxHeight: "10vh",
  borderRadius: "1vh",
  transition: "transform 0.3s ease-in-out !important",
  "&:hover": {
    transform: "scale(110%)",
  },
  border: "solid 2px red",
}));

const ProductInfo = styled(Box)(({ theme }) => ({
  padding: "1vh",
  opacity: 1,
  transition: "opacity 0.3s ease-in-out",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  border:"solid 2px blue",
  minWidth:"100%"
}));

const HoverContent = styled(Box)({
  position: "absolute",
  bottom: "0",
  width: "100%",
  color: "#fff",
  textAlign: "center",
  padding: "10px",
  opacity: 0,
  transform: "translateY(100%)",
  transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignItems:"center"
});

const StyledCardWrapper = React.memo(
  ({ type, item, accessToken, setWishlistData }) => {
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
      <Slide direction="up" in={show} mountOnEnter unmountOnExit>
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
              <WishListButton item={item} accessToken={accessToken} />
            </HoverContent>
          ) : (
            // For non-product types, show Cart and Delete buttons.
            <CardActionsContainer>
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