import ImageCarousel from "@/components/ImageCarousel";
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";
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
    <Box sx={{ width: "100vw", minHeight: "100vh", bgcolor: "background.default" }}>

      {/* ✅ Image Carousel at the Top */}
      <ImageCarousel images={carouselImages.data} />

      {/* ✅ Page Content Below the Carousel */}
      <Box sx={{ display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column", mt: 5 }}>
        <Typography variant="h3" sx={{ mt: 2 , width:"50%",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
         Quality <BlurOnIcon/> Design <BlurOnIcon/> Status
        </Typography>
      </Box>
      
      <CategoryCarousel categories={carouselImages.data}/>

    </Box>
  );
}
