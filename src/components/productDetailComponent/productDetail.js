"use client"

import { useState, useEffect } from "react"
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Tabs, 
  Tab, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  Rating, 
  Card, 
  CardMedia, 
  IconButton 
} from "@mui/material"
import { FavoriteBorder, Star } from "@mui/icons-material"

// ProductInfo Component
const ProductInfo = ({ 
  title,
  price,
  description,
  colors,
  sizes,
  rating,
  defaultColor,
  defaultSize
}) => {
  const [selectedColor, setSelectedColor] = useState(defaultColor)
  const [selectedSize, setSelectedSize] = useState(defaultSize)

  useEffect(() => {
    setSelectedColor(defaultColor)
    setSelectedSize(defaultSize)
  }, [defaultColor, defaultSize])

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Title and Rating */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4" fontWeight="bold">
          {title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Rating value={rating.average} precision={0.1} readOnly />
          <Typography variant="body2" color="text.secondary">
            ({rating.count} ratings)
          </Typography>
        </Box>
      </Box>

      {/* Price */}
      <Typography variant="h5" fontWeight="bold">
        MRP {price}
      </Typography>

      {/* Description */}
      <Box>
        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
          Description
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
      </Box>

      {/* Color Selection */}
      <Box>
        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
          Color
        </Typography>
        <RadioGroup
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          row
        >
          {colors.map((color) => (
            <FormControlLabel
              key={color.id}
              value={color.id}
              control={
                <Radio
                  sx={{
                    color: color.value,
                    "&.Mui-checked": { color: color.value },
                  }}
                />
              }
              label=""
            />
          ))}
        </RadioGroup>
      </Box>

      {/* Size Selection */}
      <Box>
        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
          Size
        </Typography>
        <RadioGroup
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          row
        >
          {sizes.map((size) => (
            <FormControlLabel
              key={size.id}
              value={size.id}
              control={<Radio />}
              label={size.name}
            />
          ))}
        </RadioGroup>
      </Box>

      {/* Add to Cart Button */}
      <Button variant="contained" size="large" fullWidth>
        Add to Cart
      </Button>
    </Box>
  )
}

// ImageGallery Component
const ImageGallery = ({ images, mainImage }) => {
  const [currentImage, setCurrentImage] = useState(mainImage || images[0])

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Main Image */}
      <Card sx={{ aspectRatio: "1/1", borderRadius: 2 }}>
        <CardMedia
          component="img"
          image={currentImage}
          alt="Main product image"
          sx={{ height: "100%", objectFit: "cover" }}
        />
      </Card>

      {/* Thumbnails */}
      <Grid container spacing={2}>
        {images.map((image, i) => (
          <Grid item xs={3} key={i}>
            <Card
              sx={{
                aspectRatio: "1/1",
                borderRadius: 2,
                cursor: "pointer",
                border: currentImage === image ? "2px solid primary.main" : "none",
              }}
              onClick={() => setCurrentImage(image)}
            >
              <CardMedia
                component="img"
                image={image}
                alt={`Product thumbnail ${i + 1}`}
                sx={{ height: "100%", objectFit: "cover" }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

// ProductTabs Component
const ProductTabs = ({ information, reviews }) => {
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={tabValue} onChange={handleTabChange} centered>
        <Tab label="More Information" />
        <Tab label="Customer Reviews" />
      </Tabs>

      {/* Tab Content */}
      <Box sx={{ mt: 3 }}>
        {tabValue === 0 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {information.map((section, i) => (
              <Box key={i}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {section.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {section.content}
                </Typography>
              </Box>
            ))}
          </Box>
        )}

        {tabValue === 1 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {reviews.map((review) => (
              <Box key={review.id} sx={{ display: "flex", gap: 2 }}>
                <Box sx={{ width: 40, height: 40, borderRadius: "50%", bgcolor: "grey.200" }} />
                <Box>
                  <Typography variant="subtitle1" fontWeight="medium">
                    {review.author}
                  </Typography>
                  <Rating value={review.rating} readOnly />
                  <Typography variant="body2" color="text.secondary">
                    {review.content}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  )
}

// RelatedProducts Component
const RelatedProducts = ({ products }) => (
  <Box sx={{ mt: 8 }}>
    <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
      YOU MIGHT ALSO LIKE THESE PRODUCTS
    </Typography>
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
          <Card sx={{ cursor: "pointer" }}>
            <CardMedia
              component="img"
              image={product.image}
              alt={product.name}
              sx={{ aspectRatio: "1/1", objectFit: "cover" }}
            />
            <Box sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="medium">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.price}
              </Typography>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
)

// Main Component
export default function ProductDetail({data}) {
  console.log("inside productdetail ",data)
  const productData = {
    title: "Wallet",
    price: 2999,
    description: "Give into the world of sleek storage with this finely crafted leather wallet...",
    rating: { average: 4.3, count: 122 },
    colors: [
      { id: "black", value: "#000000", name: "Black" },
      { id: "red", value: "#ff0000", name: "Red" }
    ],
    sizes: [
      { id: "s", name: "S" },
      { id: "m", name: "M" },
      { id: "l", name: "L" },
      { id: "xl", name: "XL" }
    ],
    images: Array(4).fill("/placeholder.svg"),
    information: [
      {
        title: "Crafted With Care",
        content: "Revamp your style with the latest designer trends..."
      },
      {
        title: "Organized Essentials",
        content: "Keep your essentials at your fingertips..."
      }
    ],
    reviews: [
      {
        id: 1,
        author: "Stylish Relief",
        rating: 5,
        content: "The wallet is made of really good quality leather..."
      }
    ],
    relatedProducts: Array(4).fill({
      id: 1,
      name: "Product name",
      price: "Product price",
      image: "/placeholder.svg"
    })
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <ImageGallery 
            images={productData.images} 
            mainImage={productData.images[0]} 
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ProductInfo
            title={productData.title}
            price={productData.price}
            description={productData.description}
            colors={productData.colors}
            sizes={productData.sizes}
            rating={productData.rating}
            defaultColor={productData.colors[0].id}
            defaultSize={productData.sizes[1].id}
          />
        </Grid>
      </Grid>

      <ProductTabs 
        information={productData.information} 
        reviews={productData.reviews} 
      />

      <RelatedProducts products={productData.relatedProducts} />
    </Box>
  )
}