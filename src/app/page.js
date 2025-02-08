"use server"
import ImageCarousel from "@/components/ImageCarousel";
import { Box } from "@mui/material";
import { cache } from "react"; // ✅ React Server Cache
import CategoryCarousel from "@/pageComponents/homePageContent/catagoryComponentContainer/CatagoryComponent";
import ReviewComponent from "@/components/reviewComponent/ReviewComponent";
import BestSellerComponent from "@/pageComponents/homePageContent/bestSellerContainer/bestSellerComponent";
import LocalVideoPlayer from "@/pageComponents/homePageContent/videoPlayers/LocalVideoPlayer";




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
      </Box>

      {/* ✅ Category Carousel */}
      
        <CategoryCarousel categories={carouselImages.data} />
     
      
      <Box sx={{ m: 5, p: 2 }}>
        <BestSellerComponent/>
      </Box>
      <Box sx={{ m: 5, p: 2 }}>
      <LocalVideoPlayer videoSrc="./JailLuxuryPromovid.mp4"/>
      </Box>
      <ReviewComponent/>
    </Box>
  );
}