"use client";

import { Box, IconButton, Typography, styled, Skeleton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import RemoveIcon from "@mui/icons-material/Remove";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import TruncatedText from "@/components/wrappers/TruncatedText";
import { addToCart } from "@/utils/API_lib";
import { useCallback, useState } from "react";
import NoDataComponent from "@/components/wrappers/noDataComponent";

const CartRow = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "minmax(150px, 2fr) repeat(4, minmax(80px, 1fr)) 40px",
  alignItems: "center",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: "#f5f5f5",
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(1),
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(5, 2fr) 40px",
    minWidth: "80vw",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "repeat(3, 2fr) 40px",
    "& > :nth-of-type(3), & > :nth-of-type(5)": { display: "none" }, // Hide price and subtotal columns
  },
}));

const ProductImage = styled(Box)(({ theme }) => ({
  width: "14vh",
  height: "14vh",
  aspectRatio: "1/1",
  backgroundColor: "#fff",
  borderRadius: 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    width: "10vh",
    height: "10vh",
  },
}));

const SizeBox = styled(Box)(({ theme }) => ({
  width: 32,
  height: 32,
  border: "1px solid #ddd",
  borderRadius: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#fff",
}));

const HeaderText = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  textAlign: "center",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.875rem",
  },
}));

const ResponsiveBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
}));

const Image = styled("img")(({ theme }) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "8px",
}));

const NumberControl = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));

const NumberQuantity = styled("input")(({ theme }) => ({
  padding: "0.25rem",
  border: "0",
  width: "50px",
  textAlign: "center",
  borderTop: "1px solid black",
  borderBottom: "1px solid black",
  "-moz-appearance": "textfield",
  "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button": {
    "-webkit-appearance": "none",
    margin: 0,
  },
}));

export default function CartComponent({ item, handleDeleteFromCart, fetchData }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Loading state for quantity updates
  const [deleteLoading, setDeleteLoading] = useState(null); // Loading state for delete operation

  // Combined loading state for all items
  const isGlobalLoading = loading || deleteLoading !== null;

  const handleQuantityChange = useCallback(
    async (productId, productDetailId, delta) => {
      if (isGlobalLoading) return; // Prevent multiple clicks if any operation is in progress
      setLoading(true); // Start loading for quantity update
      try {
        console.log(
          `Update quantity for item productId ${productId} and productDetailId ${productDetailId} by ${delta}`
        );
        await addToCart(productDetailId, productId, delta);
        await fetchData();
      } catch (error) {
        console.error("Error updating cart:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    },
    [isGlobalLoading, fetchData]
  );

  const handleDelete = useCallback(
    async (productDetailId, productId) => {
      if (isGlobalLoading) return; // Prevent multiple clicks if any operation is in progress
      setDeleteLoading(productDetailId); // Start loading for delete operation
      try {
        await handleDeleteFromCart(productDetailId, productId);
        await fetchData();
      } catch (error) {
        console.error("Error deleting item:", error);
      } finally {
        setDeleteLoading(null); // Stop loading
      }
    },
    [isGlobalLoading, handleDeleteFromCart, fetchData]
  );

  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto", p: 0 }}>
      {/* Header */}
      <CartRow sx={{ backgroundColor: "transparent", mb: 2 }}>
        <HeaderText>Product</HeaderText>
        <HeaderText>Size</HeaderText>
        <HeaderText>Price</HeaderText>
        <HeaderText>Quantity</HeaderText>
        <HeaderText>Subtotal</HeaderText>
        <div /> {/* Empty space for delete button header */}
      </CartRow>

      {/* Items */}
      {item?.map((i) => {
        const isDeleteLoading = deleteLoading === i?.product_details?.products_details_id;

        return (
          <CartRow key={i?.product_details?.products_details_id}>
            <ResponsiveBox sx={{ gap: 1, flexDirection: "column" }}>
              <ProductImage>
                {isGlobalLoading ? (
                  <Skeleton variant="rectangular" width="100%" height="100%" />
                ) : (
                  <Image
                    src={i?.gallery_details?.gallary?.images[0]}
                    alt={i?.product_details?.product_name}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      router.push(
                        `/item/${i?.product_details?.product_name}?pid=${i?.product_details?.product_id}&pdid=${i?.product_details?.products_details_id}`
                      );
                    }}
                  />
                )}
              </ProductImage>
              {isGlobalLoading ? (
                <Skeleton variant="text" width="80%" height={24} />
              ) : (
                <TruncatedText maxWidth="15vw" fontSize="2vh">
                  {i?.product_details?.product_name || "No Name"}
                </TruncatedText>
              )}
            </ResponsiveBox>

            <ResponsiveBox>
              {isGlobalLoading ? (
                <Skeleton variant="rectangular" width={32} height={32} />
              ) : (
                <SizeBox>
                  <Typography variant="body2">
                    {i?.size_details?.size_name}
                  </Typography>
                </SizeBox>
              )}
            </ResponsiveBox>

            <ResponsiveBox>
              {isGlobalLoading ? (
                <Skeleton variant="text" width={50} height={24} />
              ) : (
                <Typography variant="body1">
                  ${i?.product_details?.product_price_inr}
                </Typography>
              )}
            </ResponsiveBox>

            <ResponsiveBox>
              <NumberControl>
                {isGlobalLoading ? (
                  <Skeleton variant="rectangular" width={20} height={20} />
                ) : (
                  <IconButton
                    size="small"
                    disabled={i?.cart_details?.quantity <= 1 || isGlobalLoading}
                    onClick={() =>
                      handleQuantityChange(
                        i?.product_details?.product_id,
                        i?.product_details?.products_details_id,
                        -1
                      )
                    }
                  >
                    <RemoveIcon />
                  </IconButton>
                )}
                {isGlobalLoading ? (
                  <Skeleton variant="rectangular" width={50} height={32} />
                ) : (
                  <NumberQuantity
                    type="number"
                    name="number"
                    value={i?.cart_details?.quantity}
                    readOnly
                  />
                )}
                {isGlobalLoading ? (
                  <Skeleton variant="rectangular" width={20} height={20} />
                ) : (
                  <IconButton
                    size="small"
                    disabled={isGlobalLoading}
                    onClick={() =>
                      handleQuantityChange(
                        i?.product_details?.product_id,
                        i?.product_details?.products_details_id,
                        1
                      )
                    }
                  >
                    <AddOutlinedIcon />
                  </IconButton>
                )}
              </NumberControl>
            </ResponsiveBox>

            <ResponsiveBox>
              {isGlobalLoading ? (
                <Skeleton variant="text" width={50} height={24} />
              ) : (
                <Typography variant="body1">
                  $
                  {(
                    i?.product_details?.product_price_inr *
                    i?.cart_details?.quantity
                  )?.toFixed(2)}
                </Typography>
              )}
            </ResponsiveBox>

            <ResponsiveBox>
              {isGlobalLoading ? (
                <Skeleton variant="circular" width={32} height={32} />
              ) : (
                <IconButton
                  size="small"
                  disabled={isGlobalLoading}
                  onClick={(e) =>
                    handleDelete(
                      i?.product_details?.products_details_id,
                      i?.product_details?.product_id
                    )
                  }
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              )}
            </ResponsiveBox>
          </CartRow>
        );
      })}

      {item?.length === 0 && <NoDataComponent />}
    </Box>
  );
}