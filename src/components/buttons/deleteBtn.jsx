import useWishlistApi from "@/utils/API_lib";
import ButtonWrapper from "../wrappers/ButtonComp";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useRouter } from "next/navigation";

function DeleteBtn({
  variant = "outlined",
  color = "error",
  item,
  accessToken,
}) {
  const router = useRouter();
  const { deleteFromUserWishlist } = useWishlistApi(accessToken);

  const handleDeleteWishlistItem = async (productDetailsId, productId) => {
    await deleteFromUserWishlist(productDetailsId, productId);
    // Refresh the current route to update the wishlist data
    router.refresh();
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
