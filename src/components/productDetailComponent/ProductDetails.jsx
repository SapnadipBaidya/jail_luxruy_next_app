"use client"
import { useState,useEffect } from "react";
import PropTypes from "prop-types"; // ✅ Import PropTypes
import { Box, Typography, Button, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// Styled Components
const StyledContainer = styled(Box)``;

const StyledTitle = styled(Typography)({
  fontWeight: "bold",
});

const StyledRating = styled(Typography)({
  marginBottom: "8px",
});

const StyledPrice = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  backgroundColor: theme.palette.background.paper,
  display: "inline-block",
  padding: "4px 8px",
  borderRadius: "4px",
}));

const StyledDescriptionTitle = styled(Typography)({
  marginTop: "16px",
  marginBottom: "8px",
  fontWeight: "bold",
});

const StyledDescription = styled(Typography)({
  marginBottom: "24px",
});

const StyledSectionTitle = styled(Typography)({
  fontWeight: "bold",
  marginBottom: "8px",
});

const StyledColorContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "16px",
  marginBottom: "24px",
  justifyContent: "center",
  [theme.breakpoints.up("md")]: {
    justifyContent: "flex-start",
  },
}));

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

const StyledSizeContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "16px",
  marginBottom: "16px",
  justifyContent: "center",
  [theme.breakpoints.up("md")]: {
    justifyContent: "flex-start",
  },
}));

const SizeButton = styled(Button)(({ selected }) => ({
  borderRadius: "8px",
  minWidth: "50px",
  backgroundColor: selected ? "#333" : "transparent",
  color: selected ? "#fff" : "#000",
  border: selected ? "2px solid black" : "1px solid #ccc",
  transition: "background 0.2s ease-in-out",
}));

const ProductDetails = ({ price, description, colorArr = [], sizeArr = []  , defaultProductColorId , defaultProductSizeId }) => {
  const [selectedSize, setSelectedSize] = useState(defaultProductSizeId);
  const [selectedColor, setSelectedColor] = useState(defaultProductColorId);

  useEffect(() => {
     setSelectedSize(defaultProductSizeId);
     setSelectedColor(defaultProductColorId);
  }, [defaultProductColorId , defaultProductSizeId]);

  return (
    <StyledContainer>
      <StyledTitle variant="h4">Wallet</StyledTitle>
      <StyledRating variant="body2" color="text.secondary">
        4.3 ★ 122 Ratings
      </StyledRating>
      <StyledPrice variant="h6">MRP {price}</StyledPrice>

      <StyledDescriptionTitle variant="body1">Description</StyledDescriptionTitle>
      <StyledDescription variant="body2">{description}</StyledDescription>

      <StyledSectionTitle variant="body1">Color</StyledSectionTitle>
      <StyledColorContainer>
        {colorArr?.map((color) => (
          <ColorCircle
            key={color?.color_id + "color_key"}
            bgcolor={color.color_hex}
            selected={selectedColor === color?.color_id}
            onClick={() => setSelectedColor(color?.color_id)}
          />
        ))}
      </StyledColorContainer>

      <StyledSectionTitle variant="body1">Size</StyledSectionTitle>
      <StyledSizeContainer>
        {sizeArr.map((size) => (
          <SizeButton
            key={size?.size_id + "_size_id"}
            variant="outlined"
            selected={selectedSize === size?.size_id}
            onClick={() => setSelectedSize(size?.size_id)}
          >
            {size?.size_name}
          </SizeButton>
        ))}
      </StyledSizeContainer>

      <Typography variant="caption" color="text.secondary">
        Size & Fit Guide
        <br />
        Height of model: 189 cm / 6'2", Size: 41
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3, flexDirection: { xs: "column", sm: "row" } }}>
        <IconButton sx={{ border: "1px solid", borderColor: "primary.main", borderRadius: "50%" }}>
          <FavoriteBorderIcon />
        </IconButton>
        <Button variant="contained" color="primary" sx={{ flex: 1, py: 1.5, width: { xs: "100%", sm: "auto" } }}>
          Add to Cart
        </Button>
      </Box>
    </StyledContainer>
  );
};

// ✅ **PropTypes Validation**
ProductDetails.propTypes = {
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Price should be a number or string (if formatted)
  description: PropTypes.string, // Description should be a string
  defaultProductColorId :PropTypes.number,
   defaultProductSizeId :PropTypes.number,
  colorArr: PropTypes.arrayOf(
    PropTypes.shape({
      color_id: PropTypes.number.isRequired, // Each color must have a numeric ID
      color_name: PropTypes.string.isRequired, // Each color must have a name
      color_hex: PropTypes.string.isRequired, // Each color must have a valid hex code
    })
  ),
  sizeArr: PropTypes.arrayOf(
    PropTypes.shape({
      size_id: PropTypes.number.isRequired, // Each size must have a numeric ID
      size_name: PropTypes.string.isRequired, // Each size must have a name
    })
  ),
};

// ✅ **Default Props (Optional)**
ProductDetails.defaultProps = {
  description: "No description available",
  colorArr: [],
  sizeArr: [],
};

export default ProductDetails;
