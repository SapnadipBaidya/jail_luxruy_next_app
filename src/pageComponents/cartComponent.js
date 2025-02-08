"use client";

import { Box, IconButton, TextField, Typography, styled, useTheme } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";

const CartRow = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "minmax(150px, 2fr) repeat(4, minmax(80px, 1fr)) 40px",
  alignItems: "center",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: "#f5f5f5",
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(1),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: "repeat(3, 1fr) 40px",
    "& > :nth-of-type(3)": { display: "none" }, // Hide price column
    "& > :nth-of-type(5)": { display: "none" }, // Hide subtotal column
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: "1fr 40px",
    "& > :not(:first-of-type):not(:last-child)": { display: "none" },
  },
}));

const ProductImage = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  backgroundColor: "#fff",
  borderRadius: 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down('sm')]: {
    width: 60,
    height: 60,
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

const InputField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: "#fff",
    width: '100%',
    maxWidth: 120,
  },
  [theme.breakpoints.down('sm')]: {
    '& .MuiOutlinedInput-root': {
      maxWidth: '80px',
    },
  },
}));

const HeaderText = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.875rem',
  },
}));

const ResponsiveBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
}));

const Image = styled("img")(({ theme }) => ({
    width: "10vh",
    height: "10vh",
    objectFit: "cover",
    borderRadius: "8px",
  }));
  

export default function CartComponent({item,handleDeleteFromCart}) {
  const theme = useTheme();
  const router = useRouter();
  console.log("item",item)

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', p: 0 }}>
      {/* Header */}
      <CartRow sx={{ backgroundColor: 'transparent', mb: 2 }}>
        <HeaderText>Product</HeaderText>
        <HeaderText>Size</HeaderText>
        <HeaderText>Price</HeaderText>
        <HeaderText>Quantity</HeaderText>
        <HeaderText>Subtotal</HeaderText>
        <div /> {/* Empty space for delete button header */}
      </CartRow>

      {/* Items */}
      {item?.map((i) => (
        <CartRow key={i?.product_details?.products_details_id}>
          <ResponsiveBox sx={{ gap: 2 }}>
            <ProductImage>
            <Image
              src={i?.gallery_details?.gallary?.images[0]}
              alt={i?.product_details?.product_name}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                router.push(
                  `/item/` +
                    "/" +
                    i?.product_details?.product_name +
                    "?pid=" +
                    i?.product_details?.product_id +
                    "&pdid=" +
                    i?.product_details?.products_details_id
                );
              }}
              width={20}
              height={20}
            />
            </ProductImage>
          </ResponsiveBox>

          <ResponsiveBox>
            <SizeBox>
              <Typography variant="body2">{i?.size_details?.size_name}</Typography>
            </SizeBox>
          </ResponsiveBox>

          <ResponsiveBox>
            <Typography variant="body1">${i?.product_details?.product_price_inr}</Typography>
          </ResponsiveBox>

          <ResponsiveBox>
            <InputField
              variant="outlined"
              size="small"
              type="number"
              value={i?.cart_details?.quantity}
              inputProps={{ min: 1 }}
            />
          </ResponsiveBox>

          <ResponsiveBox>
            <Typography variant="body1">
              ${(i?.product_details?.product_price_inr * i?.cart_details?.quantity)?.toFixed(2)}
            </Typography>
          </ResponsiveBox>

          <ResponsiveBox>
            <IconButton size="small">
              <DeleteIcon fontSize="small" onClick={(e)=>handleDeleteFromCart(i?.product_details?.products_details_id,i?.product_details?.product_id)}/>
            </IconButton>
          </ResponsiveBox>
        </CartRow>
      ))}
    </Box>
  );
}