"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, styled, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CartCartSkeleton from "@/components/wrappers/cartCartSkeleton";
import { deleteFromUserCart, fetchUserCart } from "@/utils/API_lib";
import CartComponent from "@/pageComponents/cartComponent";

// ✅ Styled Components (Same as Before)
const CheckoutContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(3),
  gap: theme.spacing(3),
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

const CartSection = styled(Box)(({ theme }) => ({
  maxWidth: "50%",
  marginLeft: "10vh",
  [theme.breakpoints.up("md")]: {
    width: "65%",
  },
  border: "solid 2px blue",
}));

const SummarySection = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(3),
  borderTop: "2px solid #ddd",
  [theme.breakpoints.up("md")]: {
    width: "30%",
    borderTop: "none",
    borderLeft: "2px solid #ddd",
  },
}));

const TableWrapper = styled(Box)(({ theme }) => ({
  maxHeight: "70vh",
  overflowY: "auto",
  scrollbarWidth: "thin",
  scrollbarColor: "#c0c0c0 transparent",
  "&::-webkit-scrollbar": { width: "8px" },
  "&::-webkit-scrollbar-track": { background: "transparent" },
  "&::-webkit-scrollbar-thumb": {
    background: "#c0c0c0",
    borderRadius: theme.shape.borderRadius,
  },
  "&:hover::-webkit-scrollbar-thumb": { background: "#909090" },
}));

const StyledTable = styled("table")({
  width: "100%",
  borderCollapse: "collapse",
});

const WishlistButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
  background: "#ddd",
  color: "#000",
  borderRadius: theme.spacing(1.5),
  padding: theme.spacing(1.5),
  margin: theme.spacing(1),
  "&:hover": { background: "#ccc" },
}));

const ProceedButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  fontSize: theme.typography.pxToRem(14),
  padding: theme.spacing(2),
}));

export default function CartPageClient() {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchData = useCallback(async () => {
    try {
      const data = await fetchUserCart();
      setCartData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart data", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDeleteFromCart = useCallback(async (productDetailsId, productId) => {
    try {
      await deleteFromUserCart(productId,productDetailsId);
      await fetchData(); // Refresh cart data
    } catch (error) {
      console.error("Error deleting item from cart", error);
    }
  }, [fetchData]);


  console.log("cartData",cartData)

  return (
    <CheckoutContainer>
      <CartSection>
        <Typography variant="h5">Checkout</Typography>
        
        {/* Scrollable Table */}
       <CartComponent item={cartData} handleDeleteFromCart={handleDeleteFromCart}/>

        <WishlistButton onClick={() => router.push("/wishlist")}>
          <Typography>Add More From Wishlist</Typography>
          <FavoriteIcon fontSize="medium" />
        </WishlistButton>
      </CartSection>

      {/* Summary Section */}
      <SummarySection>
        <Typography variant="subtitle1">Subtotal: ₹3300</Typography>
        <Typography variant="subtitle1">Discount: ₹300</Typography>
        <Typography variant="subtitle1">Delivery Charge: ₹50</Typography>
        <Typography variant="h6" mt={2}>
          Grand Total: ₹3050
        </Typography>
        <ProceedButton variant="contained" color="primary" fullWidth>
          Proceed to Payment
        </ProceedButton>
      </SummarySection>
    </CheckoutContainer>
  );
}