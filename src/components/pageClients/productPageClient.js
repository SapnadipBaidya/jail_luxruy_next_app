import { Box, Grid } from "@mui/material";
import ProductDetailsTabComponent from "../productDetailsTabComponent/ProductDetailsTabComponent";
import ProductImage from "../productDetailComponent/ProductImage";
import ProductDetails from "../productDetailComponent/productDetail";

const ProductPageClient = ({data,accessToken}) => {


  return (
    <>
      <Box
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 2, sm: 4 },
        }}
      >
        <Grid
          container
          spacing={4}
          sx={{
            maxWidth: "1200px",
            width: "100%",
          }}
        >
          {/* Image Section */}
          <Grid item xs={12} md={6}>
            <ProductImage images={data?.product_info?.gallery[0]?.urls?.images} />
          </Grid>

          {/* Product Details Section */}
          <Grid item xs={12} md={6}>
            <ProductDetails data={data} accessToken={accessToken}
            />
          </Grid>
        </Grid>
      </Box>
      <ProductDetailsTabComponent />
      {/* <RecommandationCard /> */}
    </>
  );
};

export default ProductPageClient;
