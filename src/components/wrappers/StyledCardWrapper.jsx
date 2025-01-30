"use client";

import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Fade,
  Slide,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import WishListButton from "../buttons/wishListBtn.jsx";
import CartBtn from "../buttons/cartBtn.jsx";


import TruncatedText from "./TruncatedText.jsx";

// ✅ Responsive Styled Card
const StyledCard = styled(Card)(({ theme }) => ({
  position: "relative",
  overflow: "visible",
  padding: theme.spacing(1),
  backgroundColor: theme.custom?.cardBg || "#fff",
  boxShadow: "0 4px 8px rgba(164, 180, 112, 0.1)",
  borderRadius: theme.shape.borderRadius,
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out !important",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",
  maxWidth: theme.typography.pxToRem(250),
  maxHeight: theme.typography.pxToRem(350),

  "&:hover": {
    transform: "scale(1.02) !important",
    boxShadow:
      "rgba(0, 0, 0, 0.25) 0px 13px 47px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
  },

  [theme.breakpoints.down("md")]: {
    maxWidth: theme.typography.pxToRem(200),
    maxHeight: theme.typography.pxToRem(280),
  },

  [theme.breakpoints.down("sm")]: {
    maxWidth: theme.typography.pxToRem(130),
    maxHeight: theme.typography.pxToRem(220),
  },
}));

// ✅ Responsive Product Image
const ProductImage = styled("img")(({ theme }) => ({
  objectFit: "cover",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.custom?.cardBg || "#fff",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out !important",

  minWidth: theme.typography.pxToRem(200),
  minHeight: theme.typography.pxToRem(200),
  maxWidth: theme.typography.pxToRem(200),
  maxHeight: theme.typography.pxToRem(200),

  "&:hover": {
    transform: "scale(1.05)",
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

// ✅ Responsive Footer Buttons
const CardFooter = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingTop: "10px",
  borderTop: "1px solid #ddd",

  [theme.breakpoints.down("sm")]: {
    paddingTop: "5px",
    flexDirection: "column",
    gap: theme.spacing(1),
  },
}));

const StyledCardWrapper = React.memo(({ type, item }) => {

  const mainImgUrl =
    item?.product_data?.gallery?.images?.[0] || "/placeholder.jpg";

    console.log("mainImgUrl",item?.product_data?.gallery)
  const router = useRouter(); // ✅ Next.js Routing
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    return () => setShow(false);
  }, []);

  return (
    <Slide direction="up" in={show} mountOnEnter unmountOnExit>
      <StyledCard>
        <Fade in={show} timeout={500}>
          <ProductImage
            src={mainImgUrl}
            alt="Product Image"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
             
              router.push("/Product"); // ✅ Next.js Routing
            }}
          />
        </Fade>

        {/* ✅ Responsive Text */}
        <TruncatedText maxWidth="90%">
          {item?.product_name || "No Name"}
        </TruncatedText>
        <TruncatedText maxWidth="90%">
          ₹{item?.product_data?.price || "N/A"}
        </TruncatedText>

        {/* ✅ Footer Buttons */}
        <CardFooter>
          {type === "Product" ? <WishListButton item={item} /> : <CartBtn />}
        </CardFooter>
      </StyledCard>
    </Slide>
  );
});

// ✅ Prop Type Validation
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
      product_price_inr: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }),
};

export default StyledCardWrapper;
