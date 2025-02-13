"use server"
import ImageCarousel from "@/components/ImageCarousel";
import { Box} from "@mui/material";
import CategoryCarousel from "@/pageComponents/homePageContent/catagoryComponentContainer/CatagoryComponent";
import ReviewComponent from "@/components/reviewComponent/ReviewComponent";
import BestSellerComponent from "@/pageComponents/homePageContent/bestSellerContainer/bestSellerComponent";
import LocalVideoPlayer from "@/pageComponents/homePageContent/videoPlayers/LocalVideoPlayer";




// ✅ Fetch images from API with caching



export default async function HomePage() {
  return (
    <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: "background.default" }}>
      {/* ✅ Image Carousel at the Top */}
      <ImageCarousel/>

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
      
        <CategoryCarousel/>
     
      
      <Box >
        <BestSellerComponent/>
      </Box>
      <Box >
      <LocalVideoPlayer videoSrc="JailLuxuryPromovid.mp4"/>
      </Box>
      {/* <ReviewComponent/> */}
    </Box>
  );
}