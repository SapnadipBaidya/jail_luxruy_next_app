import ButtonWrapper from "../wrappers/ButtonComp";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function DeleteBtn({ variant = "outlined", color = "error" , item}) {
    console.log("item",item)

    
  return (
    <ButtonWrapper variant={variant} color={color} >
      <DeleteForeverIcon />
    </ButtonWrapper>
  );
}

export default DeleteBtn;
