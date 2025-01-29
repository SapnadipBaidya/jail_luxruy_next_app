"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import CartItemComp from "@/components/wrappers/cartItemComp";
import CartItemHeader from "@/components/wrappers/cartItemHeader";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CartCartSkeleton from "@/components/wrappers/cartCartSkeleton";
import LoginSignupPage from "@/app/login-signup/page"; // Import login page


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
  maxWidth: "60%",
  marginLeft: "10vh",
  [theme.breakpoints.up("md")]: {
    width: "65%",
  },
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
  "&::-webkit-scrollbar-thumb": { background: "#c0c0c0", borderRadius: theme.shape.borderRadius },
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

export default function CartPage() {
  const router = useRouter();
    const user = {id : "111",name:"sapnadip"} // ✅ Get user authentication status
  const [cartData, setCartData] = useState({ data: [], loading: true });

  // ✅ Simulated API call to fetch cart items
  useEffect(() => {
    async function fetchCartItems() {
      try {
        const res = await fetch("/api/cart"); // Replace with actual API
        const data = await res.json();
        setCartData({ data: data.items, loading: false });
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setCartData({ data: [], loading: false });
      }
    }

    fetchCartItems();
  }, []);

  // ✅ If user is NOT logged in, show login page
  if (!user?.id) return <LoginSignupPage />;

  return (
    <CheckoutContainer>
      <CartSection>
        <Typography variant="h5">Checkout</Typography>
        <CartItemHeader />

        {/* Scrollable Table */}
        <TableWrapper>
          <StyledTable>
            <tbody>
              {cartData.loading ? (
                <CartCartSkeleton cardNum={5} />
              ) : (
                cartData.data.length > 0 ? (
                  cartData.data.map((item, index) => (
                    <CartItemComp item={item} key={`cart_td_${index}`} />
                  ))
                ) : (
                  <Typography variant="body1" sx={{ textAlign: "center", padding: "2rem" }}>
                    Your cart is empty.
                  </Typography>
                )
              )}
            </tbody>
          </StyledTable>
        </TableWrapper>

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
