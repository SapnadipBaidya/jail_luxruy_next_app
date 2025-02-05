import React from "react";
import ButtonWrapper from "../wrappers/ButtonComp";
import { addToCart, deleteFromUserWishlist, fetchUserWishlist } from "@/utils/API_lib";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
function CartBtn({
  variant = "outlined",
  color = "primary",
  item,
  accessToken,
  setWishlistData,
}) {

  
  const handleWishlistToCartItem = async (productDetailsId, productId) => {
    await addToCart(productDetailsId, productId)
    await deleteFromUserWishlist(productDetailsId, productId);
    const data = await fetchUserWishlist(); // Pass necessary arguments if required
    setWishlistData(data); // Update state with fetched data
    // Refresh the current route to update the wishlist data
  };

  return (
    <ButtonWrapper variant={variant} color={color} onClick={()=>handleWishlistToCartItem(item?.product_detail_id, item?.product_id)}>
      <LocalMallOutlinedIcon />
    </ButtonWrapper>
  );
}

export default CartBtn;
