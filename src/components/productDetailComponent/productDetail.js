"use client"
import React, { useState, useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { Box, Typography, Button, IconButton,styled } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useRouter ,usePathname,useParams} from "next/navigation";
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

const ProductDetails = ({ data,accessToken}) => {
  const router = useRouter();
  const params = useParams();
  const pathName = usePathname();
  // Memoize product info to prevent unnecessary recalculations
  const productInfo = useMemo(() => data?.product_info || {}, [data]);
  
  // State management with proper initialization and data updates
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    // Initialize selections when data loads
    console.log("productInfo",productInfo)
    if (productInfo.sizesPerProductId) {
      const initialSize = productInfo.sizesPerProductId.find(
        item => item?.productDetailId === productInfo.productDetailsId
      )?.sizeId;
      setSelectedSize(initialSize);
      // router.push();
     
    }

    if (productInfo.allColorProducts) {
      const initialColor = productInfo.allColorProducts.find(
        item => item?.productId === productInfo.productId
      )?.colorId;
      setSelectedColor(initialColor);
      // router.push();
    }
  }, [productInfo]);

  // Memoize color and size lists to prevent unnecessary re-renders
  const colorProducts = useMemo(
    () => productInfo.allColorProducts || [],
    [productInfo.allColorProducts]
  );

  const sizeProducts = useMemo(
    () => productInfo.sizesPerProductId || [],
    [productInfo.sizesPerProductId]
  );

  // Stable callback handlers
  const handleColorSelect = useCallback(
    (color) =>{
    console.log("color",color)
      router.push(`/item/${params['item-name']}?pid=${color?.productId}`)
      setSelectedColor(color?.colorId)},
    []
  );

  const handleSizeSelect = useCallback(
    (size) => {
      console.log("size",size)

      router.push(`/item/${params['item-name']}?pid=${size?.productId}&pdid=${size?.productDetailId}`)
      setSelectedSize(size?.sizeId)},
    []
  );

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

      <Box sx={{ 
        display: "flex", 
        alignItems: "center", 
        gap: 2, 
        mt: 3, 
        flexDirection: { xs: "column", sm: "row" } 
      }}>
        <IconButton 
          aria-label="Add to favorites"
          sx={{ 
            border: "1px solid", 
            borderColor: "primary.main", 
            borderRadius: "50%" 
          }}
        >
          <FavoriteBorderIcon />
        </IconButton>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ 
            flex: 1, 
            py: 1.5, 
            width: { xs: "100%", sm: "auto" } 
          }}
        >
          Add to Cart
        </Button>
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
      {colors.map((color) => (
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
      {sizes.map((size) => (
        <SizeButton
          key={`${size.productDetailId}_${size.sizeId}`}
          selected={selectedSize === size.sizeId}
          onClick={() => onSelect(size)}
          aria-label={`Select size ${size.sizeName}`}
          aria-pressed={selectedSize === size.sizeId}
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