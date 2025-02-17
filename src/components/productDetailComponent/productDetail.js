"use client";
import React, { useState, useEffect, useMemo, useCallback, useContext } from "react";
import PropTypes from "prop-types";
import { Box, Typography, Button, IconButton, styled } from "@mui/material";
import { useRouter, usePathname, useParams } from "next/navigation";
import { addOrEditWishlist, addToCart } from "@/utils/API_lib";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { AppContext } from "@/context/applicationContext";

// Optimized styled components (moved outside main component)
const ColorCircle = styled(Box)(({ bgcolor, selected, theme }) => ({
  width: "32px",
  height: "32px",
  backgroundColor: bgcolor,
  borderRadius: "50%",
  cursor: "pointer",
  border: selected ? `0.25vh dashed ${theme.palette.ascentColor.main}` : "2px solid transparent",
  transition: "all 0.2s ease-in-out",
  transform: selected ? "scale(1.3)" : "scale(1)",
}));

const SizeButton = styled(Button)(({ selected }) => ({
  borderRadius: "8px",
  minWidth: "50px",
  backgroundColor: selected ? "#333" : "transparent",
  color: selected ? "#fff" : "#000",
  border: selected ? "2px solid black" : "1px solid #ccc",
  transition: "background 0.2s ease-in-out",
}));

const AddToCartButton = styled(Button)(({ theme }) => ({
  maxHeight: "5.5vh",
  minWidth: theme.typography.pxToRem(300),
  maxWidth: theme.typography.pxToRem(300),
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "1vh",
  background: theme.custom.cardBg,
  fontFamily: '"Montserrat", sans-serif',
  boxShadow: "none",
  overflow: "hidden",
  cursor: "pointer",
  border: "none",
  "&:after": {
    content: '""',
    width: "0%",
    height: "100%",
    background: "#483030",
    position: "absolute",
    transition: "all 0.4s ease-in-out",
    right: 0,
  },
  "&:hover::after": {
    right: "auto",
    left: 0,
    width: "100%",
    backgroundColor: theme.palette.ascentColor.main,
  },
  "& span": {
    textAlign: "center",
    textDecoration: "none",
    width: "100%",
    padding: "18px 25px",
    color: theme.custom.primaryButtonFontColor,
    fontSize: "1.125em",
    fontWeight: 700,
    letterSpacing: "0.3em",
    zIndex: 20,
    transition: "all 0.3s ease-in-out",
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  maxHeight: "5.5vh",
  maxWidth: "5.5vh",
  borderColor: "primary.main",
  borderRadius: "1vh",
  background: theme.custom.cardBg,
  color: theme.custom.primaryButtonFontColor,
  position: "relative",
  "&:after": {
    display: "none", // Removes the pseudo-element effect
  },
}));
const AnimatedIcon = styled(IconButton)(({ theme, iswishlisted }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.3s ease-in-out",
  width: "100%",
  height: "100%",
  position: "relative",
  "& .active": {
    display: iswishlisted ? "inline-block" : "none",
    color: "#f52121",
    animation: iswishlisted ? "wiggle 0.5s ease-in-out" : "none",
  },
  "& .inactive": {
    display: iswishlisted ? "none" : "inline-block",
    color: theme.custom.primaryButtonFontColor,
  },
  "@keyframes wiggle": {
    "0%, 100%": { transform: "rotate(0deg)" },
    "25%": { transform: "rotate(-10deg)" },
    "50%": { transform: "rotate(10deg)" },
    "75%": { transform: "rotate(-10deg)" },
  },
  "&:after": {
    display: "none", // Removes the pseudo-element effect
  },
}));

const ProductDetails = ({ data }) => {

    const { user } = useContext(AppContext);
    console.log("productDetails ",data, user)
  const productInfo = useMemo(() => data?.product_info || {}, [data]);
  const router = useRouter();
  const params = useParams();
  const pathName = usePathname();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isAddedToCart, setIsAddedToCart] = useState(productInfo?.is_carted);
  const [iswishlisted, setIsWishlisted] = useState(productInfo?.is_wishlisted);

  useEffect(() => {
    setIsAddedToCart(productInfo?.is_carted);
    setIsWishlisted(productInfo?.is_wishlisted);
  }, [productInfo?.is_carted, productInfo?.is_wishlisted]);
  

  useEffect(() => {
    if (productInfo?.sizesPerProductId) {
      const initialSize = productInfo.sizesPerProductId.find(
        (item) => item?.productDetailId === productInfo.productDetailsId
      )?.sizeId;
      setSelectedSize(initialSize);
    }

    if (productInfo?.allColorProducts) {
      const initialColor = productInfo.allColorProducts.find(
        (item) => item?.productId === productInfo.productId
      )?.colorId;
      setSelectedColor(initialColor);
    }
  }, [productInfo]);

  const colorProducts = useMemo(
    () => productInfo.allColorProducts || [],
    [productInfo.allColorProducts]
  );

  const sizeProducts = useMemo(
    () => productInfo.sizesPerProductId || [],
    [productInfo.sizesPerProductId]
  );

  const handleColorSelect = useCallback((color) => {
    router.push(`/item/${params["item-name"]}?pid=${color?.productId}`);
    setSelectedColor(color?.colorId);
  }, []);

  const handleSizeSelect = useCallback((size) => {
    router.push(`/item/${params["item-name"]}?pid=${size?.productId}&pdid=${size?.productDetailId}`);
    setSelectedSize(size?.sizeId);
  }, []);

  const handleAddToCart = async (productDetailsId, productId) => {
    setIsAddedToCart(true);
    await addToCart(productDetailsId, productId);
    router.refresh(); 
  };

  const handleAddToWishList = async (productDetailsId, productId) => {
    setIsWishlisted((prev) => !prev); // Toggle wishlist state
    await addOrEditWishlist(productDetailsId, productId);
    router.refresh(); 
  };

  return (
    <Box component="section" aria-labelledby="product-details-heading">
      <Typography variant="h4" id="product-details-heading" gutterBottom>
        {productInfo.productName}
      </Typography>

      <Typography variant="body2" color="text.secondary" paragraph>
        4.3 ★ 122 Ratings
      </Typography>

      <Typography variant="h6" paragraph>
        MRP {productInfo.productPrice}
      </Typography>

      <section aria-labelledby="description-heading">
        <Typography variant="body1" id="description-heading" gutterBottom>
          Description
        </Typography>
        <Typography variant="body2" paragraph>
          {productInfo.description}
        </Typography>
      </section>

      <ColorSelector
        colors={colorProducts}
        selectedColor={selectedColor}
        onSelect={handleColorSelect}
      />

      <SizeSelector
        sizes={sizeProducts}
        selectedSize={selectedSize}
        onSelect={handleSizeSelect}
      />

      <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
        Size & Fit Guide
        <br />
        Height of model: 189 cm / 6'2", Size: 41
      </Typography>
      {user?.id?.length==0 && <h5>Please login to Wishlist / Cart</h5>}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent:{ xs: "center", sm: "center",lg:"left" ,md:"left"},
          gap: 2,
          mt: 3,
          flexDirection: { xs: "row", sm: "row" },
        }}
      >
       
        <StyledIconButton
          disabled={!user?.id}
          aria-label="Add to favorites"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleAddToWishList(productInfo?.productDetailsId, productInfo?.productId);
          }}
        >
          <AnimatedIcon iswishlisted={iswishlisted} >
            <FavoriteBorderIcon className="inactive" fontSize="medium" />
            <FavoriteIcon className="active" fontSize="medium" />
          </AnimatedIcon>
        </StyledIconButton>
        <AddToCartButton
          disabled={!user?.id}
          variant="contained"
          color="primary"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (isAddedToCart) {
              router.push("/cart");
            } else {
              handleAddToCart(productInfo?.productDetailsId, productInfo?.productId);
            }
          }}
          sx={{
            flex: 1,
            py: 1.5,
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <span>{isAddedToCart ? "Go to Cart" : "Add to Cart"}</span>
        </AddToCartButton>
      </Box>
    </Box>
  );
};

// Sub-components for better readability and performance
const ColorSelector = React.memo(({ colors, selectedColor, onSelect }) => (
  <section aria-labelledby="color-selector-heading">
    <Typography variant="body1" id="color-selector-heading" gutterBottom>
      Color
    </Typography>
    <Box display="flex" gap={2} mb={3}>
      {colors?.map((color) => (
        <ColorCircle
          key={`${color.productId}_${color.colorId}`}
          bgcolor={color.colorHex}
          selected={selectedColor === color.colorId}
          onClick={() => onSelect(color)}
          role="button"
          aria-label={`Select color ${color.colorName}`}
          aria-pressed={selectedColor === color.colorId}
        />
      ))}
    </Box>
  </section>
));

const SizeSelector = React.memo(({ sizes, selectedSize, onSelect }) => (
  <section aria-labelledby="size-selector-heading">
    <Typography variant="body1" id="size-selector-heading" gutterBottom>
      Size
    </Typography>
    <Box display="flex" gap={2} mb={2}>
      {sizes?.map((size) => (
        <SizeButton
          key={`${size.productDetailId}_${size.sizeId}`}
          selected={selectedSize === size.sizeId}
          onClick={() => onSelect(size)}
          aria-label={`Select size ${size.sizeName}`}
          aria-pressed={selectedSize === size.sizeId}
          disabled={!size?.inStock}
        >
          {size.sizeName}
        </SizeButton>
      ))}
    </Box>
  </section>
));

ProductDetails.propTypes = {
  data: PropTypes.shape({
    product_info: PropTypes.shape({
      productName: PropTypes.string,
      productPrice: PropTypes.number,
      description: PropTypes.string,
      allColorProducts: PropTypes.arrayOf(
        PropTypes.shape({
          productId: PropTypes.number.isRequired,
          colorId: PropTypes.number.isRequired,
          colorHex: PropTypes.string.isRequired,
          colorName: PropTypes.string.isRequired,
        })
      ),
      sizesPerProductId: PropTypes.arrayOf(
        PropTypes.shape({
          productDetailId: PropTypes.number.isRequired,
          sizeId: PropTypes.number.isRequired,
          sizeName: PropTypes.string.isRequired,
        })
      ),
    }),
  }),
};

export default React.memo(ProductDetails);