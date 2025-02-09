import React from "react";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import { addToCart, deleteFromUserWishlist, fetchUserWishlist } from "@/utils/API_lib";

// Styled Button Component
const CartButton = styled(Button)(({ theme }) => ({
  borderRadius: "10%",
  backgroundColor: "transparent",
  border: "none",
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "none",
  cursor: "pointer",
  transitionDuration: "0.3s",
  overflow: "hidden",
  position: "relative",
  maxWidth: "50px", // Adjusted to make the container thinner
  minWidth: "50px", // Ensure the button doesn't shrink further
  minHeight: "40px",
  padding: "0", // Remove padding to make the container thinner
  border: `solid 0.1vh ${theme.palette.primary.main}`,
  "&:hover": {
    borderRadius: "1vh",
    transitionDuration: "0.3s",
    backgroundColor: theme.palette.primary.main, // Use theme for primary color
    alignItems: "center",
  },
  "& .svgIcon": {
    fontSize: "4vh",
    transitionDuration: "0.3s",
    color: theme.palette.primary.main,
  },
  "&:hover .svgIcon": {
    maxWidth: theme.typography.pxToRem(20),
    transitionDuration: "0.3s",
    transform: "translateY(60%)",
    display: "none",
  },
  "&::before": {
    position: "absolute",
    top: "-4vh",
    content: '"Add to Cart"', // Change text to "Add to Cart"
    color: theme.palette.common.white, // Use theme for text color
    transitionDuration: "0.3s",
    fontSize: "12px",
    opacity: 0,
  },
  "&:hover::before": {
    fontSize: "10px",
    opacity: 1,
    transform: "translateY(30px)",
    transitionDuration: "0.3s",
 
  },
}));

function CartBtn({ item, setWishlistData }) {
  const handleWishlistToCartItem = async (productDetailsId, productId) => {
    await addToCart(productDetailsId, productId);
    await deleteFromUserWishlist(productDetailsId, productId);
    const data = await fetchUserWishlist(); // Fetch updated wishlist data
    setWishlistData(data); // Update state with fetched data
  };

  return (
    <CartButton
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleWishlistToCartItem(item?.product_detail_id, item?.product_id);
      }}
    >
      <LocalMallOutlinedIcon className="svgIcon" />
    </CartButton>
  );
}

export default CartBtn;