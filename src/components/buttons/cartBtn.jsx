import React from "react";
import ButtonWrapper from "../wrappers/ButtonComp";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import { useWishlistApi , useCartApi } from "@/utils/API_lib";

function CartBtn({
  variant = "outlined",
  color = "primary",
  item,
  accessToken,
  setWishlistData,
}) {

  const { deleteFromUserWishlist, fetchUserWishlist } = useWishlistApi(accessToken);
  const {addToCart } = useCartApi(accessToken);
  
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
