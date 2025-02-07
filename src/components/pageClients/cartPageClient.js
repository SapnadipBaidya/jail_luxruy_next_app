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
import { fetchUserCart } from "@/utils/API_lib";

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

  useEffect(() => {
    // Fetch wishlist data when the component mounts or accessToken changes
    const fetchData = async () => {
      try {
        const data = await fetchUserCart(); // Pass necessary arguments if required
        console.log("cart data",data)
        setCartData(data); // Update state with fetched data
        console.log("WishListPageClient: Data fetched successfully", data);
      } catch (error) {
        console.error(
          "WishListPageClient: Error fetching wishlist data",
          error
        );
      }
    };

    fetchData();
  }, [fetchUserCart]); 

  const router = useRouter();

  

  return (
    <CheckoutContainer>
      <CartSection>
        <Typography variant="h5">Checkout</Typography>
        <CartItemHeader />

        {/* Scrollable Table */}
        <TableWrapper>
          <StyledTable>
            <tbody>
              {cartData?.loading ? (
                <CartCartSkeleton cardNum={5} />
              ) : cartData?.length > 0 ? (
                cartData?.map((item, index) => (
                  <CartItemComp item={item} key={`cart_td_${index}`} />
                ))
              ) : (
                <Typography
                  variant="body1"
                  sx={{ textAlign: "center", padding: "2rem" }}
                >
                  Your cart is empty.
                </Typography>
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
