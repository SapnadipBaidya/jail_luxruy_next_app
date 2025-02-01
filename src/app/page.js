import ImageCarousel from "@/components/ImageCarousel";
import { Box, Typography } from "@mui/material";
import { cache } from "react"; // ✅ React Server Cache
import BlurOnIcon from '@mui/icons-material/BlurOn';
import CategoryCarousel from "@/pageComponents/homePageContent/catagoryComponentContainer/CatagoryComponent";

// ✅ Fetch images from API with caching
const getCarouselImages = cache(async () => {
  try {
    const res = await fetch("http://localhost:8080/api/items/getAllCategories", {
      cache: "force-cache", // ✅ Statically caches the API response (No re-fetch on every request)
      next: { revalidate: 3600 }, // ✅ Refreshes API data every 1 hour (3600 seconds)
    });

    if (!res.ok) throw new Error("Failed to fetch images");
    return await res.json(); // Returns the JSON data
  } catch (error) {
    console.error("Error fetching images:", error);
    return { data: [] }; // Return empty array if API fails
  }
});

export default async function HomePage() {
  const carouselImages = await getCarouselImages(); // ✅ API Call Happens Only Once

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: "background.default" }}>
      {/* ✅ Image Carousel at the Top */}
      <ImageCarousel images={carouselImages.data} />

      {/* ✅ Page Content Below the Carousel */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          mt: 5,
          px: 2, // Add horizontal padding for smaller screens
        }}
      >
        <Typography
          variant="h3"
          sx={{
            mt: 2,
            width: "100%", // Full width on smaller screens
            maxWidth: "800px", // Limit width on larger screens
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: "center", // Center text on smaller screens
            fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" }, // Responsive font size
          }}
        >
          Quality <BlurOnIcon sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" } }} /> Design{" "}
          <BlurOnIcon sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" } }} /> Status
        </Typography>
      </Box>

      {/* ✅ Category Carousel */}
      <Box sx={{ mt: 5, px: 2 }}>
        <CategoryCarousel categories={carouselImages.data} />
      </Box>
      <Box sx={{ mt: 5, px: 2 }}>
        
      </Box>
    </Box>
  );
}