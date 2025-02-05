
import { deleteFromUserWishlist, fetchUserWishlist, useWishlistApi } from "@/utils/API_lib";
import ButtonWrapper from "../wrappers/ButtonComp";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useRouter } from "next/navigation";

function DeleteBtn({
  variant = "outlined",
  color = "error",
  item,
  accessToken,
  setWishlistData,
}) {
  

  const handleDeleteWishlistItem = async (productDetailsId, productId) => {
    await deleteFromUserWishlist(productDetailsId, productId);
    const data = await fetchUserWishlist(); // Pass necessary arguments if required
    setWishlistData(data); // Update state with fetched data
    // Refresh the current route to update the wishlist data
  };

  return (
    <ButtonWrapper
      variant={variant}
      color={color}
      onClick={() =>
        handleDeleteWishlistItem(item?.product_detail_id, item?.product_id)
      }
    >
      <DeleteForeverIcon />
    </ButtonWrapper>
  );
}

export default DeleteBtn;
