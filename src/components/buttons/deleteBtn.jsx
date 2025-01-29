import ButtonWrapper from "../wrappers/ButtonComp";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch } from "react-redux";
import { deleteUserWishlist } from "../../store/actions/wishlistActions";
import { useAuth } from "../../contexts/AuthProvider";

function DeleteBtn({ variant = "outlined", color = "error" , item}) {
    console.log("item",item)
    const user = {id : "111",name:"sapnadip"} // Using Auth Context
    const dispatch = useDispatch();
    
  return (
    <ButtonWrapper variant={variant} color={color} onClick={()=>{dispatch(deleteUserWishlist({"userId":user?.id,"productsDetailsId": item?.product_details?.products_details_id,"product_id":item?.product_details?.product_id}))
    }}>
      <DeleteForeverIcon />
    </ButtonWrapper>
  );
}

export default DeleteBtn;
