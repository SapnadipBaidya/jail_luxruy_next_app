"use client";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box, useMediaQuery, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const VideoContainer = styled(Box)(({ theme, isMobile, mode }) => ({
  

  
  
  display: "flex",
  flexDirection: isMobile ? "column" : "row",
  alignItems: "center",
  justifyContent: isMobile ? "center" : "space-evenly",
  overflow: "hidden",
  borderRadius: "12px",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
  padding: theme.spacing(2),
  gap: theme.spacing(2),
  backgroundImage:
  theme.palette.mode === "dark"
    ? "url('./webps/darkmodeBackgroundImg.webp')"
    : "url('./webps/lightmodeBackgroundImg.webp')",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundSize: "cover", // or "contain" depending on your preference
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    zIndex: -1,
  },
}));

const StyledVideo = styled("video")(({ isMobile }) => ({
  width: isMobile ? "100%" : "20%",
  height: isMobile ? "auto" : "100%",
  objectFit: "cover",
  borderRadius: "1vh",
}));

const VideoDescContainer = styled(Typography)(({ theme }) => ({
  maxWidth: "90%",
  wordWrap: "break-word",
  textAlign: "justify",
  width: "100%",
  color: theme.palette.secondary.main,
}));

const TextContainer  = styled(Typography)(({ theme }) => ({
 
  color: theme.custom.primaryButtonFontColor,
}));


const LocalVideoPlayer = ({ videoSrc }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [videoSrcState, setVideoSrcState] = useState(videoSrc || "");

  useEffect(() => {
    if (!videoSrc) {
      const fetchVideo = async () => {
        try {
          const response = await fetch("/api/get-video");
          const data = await response.json();
          setVideoSrcState(data.videoUrl);
        } catch (error) {
          console.error("Error fetching video:", error);
        }
      };
      fetchVideo();
    }
  }, [videoSrc]);

  return (
    <VideoContainer isMobile={isMobile} mode={theme.palette.mode}>
      {videoSrcState ? (
        <StyledVideo autoPlay loop muted playsInline isMobile={isMobile}>
          <source src={videoSrcState} type="video/mp4" />
          Your browser does not support the video tag.
        </StyledVideo>
      ) : (
        <p>Loading video...</p> // Placeholder while fetching video
      )}

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <VideoDescContainer component="div">
          <TextContainer>
          <h1 style={{ margin: 0 }}>WHY JAIL ?</h1>
          <p>
            The name “Jail” is more than just a brand; it’s a nod to our roots.
            The original shop was located on Jail Road in Banka, and the name was born
            out of the simplicity of directions—“Jail Road, Jail Road.” Today, it
            stands as a symbol of our journey, from a small shop in Bihar to a
            luxury brand that resonates with customers around the world.
          </p>
          </TextContainer>
        </VideoDescContainer>
      </div>
    </VideoContainer>
  );
};

export default LocalVideoPlayer;