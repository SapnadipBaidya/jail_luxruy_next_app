"use client";
import React from "react";
import {
  Box,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useRouter } from "next/navigation";
// Styled Components
const CardContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: "16px",
  width: "100%",
  maxWidth: "800px", // Adjusted for better responsiveness
  margin: "0 auto",
  padding: theme.spacing(2),
}));

const ItemRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  gap: theme.spacing(2),
  flexWrap: "wrap",
}));

const ItemCell = styled(Box)(({ theme }) => ({
  flex: 1,
  minWidth: "100px", // Minimum width for each cell
  textAlign: "center",
}));

const SizeBox = styled(Box)(({ theme }) => ({
  minWidth: "35px",
  height: "35px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid black",
  borderRadius: "8px",
  fontWeight: "bold",
}));

const Image = styled("img")(({ theme }) => ({
  width: "10vh",
  height: "10vh",
  objectFit: "cover",
  borderRadius: "8px",
}));

const CartItemComp = ({ item ,handleDeleteFromCart}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();

  return (
    <CardContainer>
      <ItemRow>
        <ItemCell>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Image
              src={item?.gallery_details?.gallary?.images[0]}
              alt={item?.product_details?.product_name}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                router.push(
                  `/item/` +
                    "/" +
                    item?.product_details?.product_name +
                    "?pid=" +
                    item?.product_details?.product_id +
                    "&pdid=" +
                    item?.product_details?.products_details_id
                );
              }}
            />
            <Typography
              variant={isMobile ? "body2" : "body1"}
              fontWeight="bold"
            >
              {item?.product_details?.product_name}
            </Typography>
          </Box>
        </ItemCell>
        <ItemCell>
          <SizeBox>{item?.size_details?.size_name}</SizeBox>
        </ItemCell>
        <ItemCell>
          <Typography variant={isMobile ? "body2" : "body1"}>
            ₹{item?.product_details?.product_price_inr}
          </Typography>
        </ItemCell>
        <ItemCell>
          <SizeBox>{item?.cart_details?.quantity}</SizeBox>
        </ItemCell>
        <ItemCell>
          <Typography variant={isMobile ? "body2" : "body1"}>
            ₹
            {item?.cart_details?.quantity *
              item?.product_details?.product_price_inr}
          </Typography>
        </ItemCell>
        <ItemCell>
          <IconButton size={isMobile ? "small" : "medium"}>
            <DeleteForeverOutlinedIcon
              fontSize={isMobile ? "small" : "medium"}
              onClick={(e) => {
                e.preventDefault();
                handleDeleteFromCart(
                  item?.product_details?.product_id,
                  item?.product_details?.products_details_id
                );
              }}
            />
          </IconButton>
        </ItemCell>
      </ItemRow>
    </CardContainer>
  );
};

export default CartItemComp;
