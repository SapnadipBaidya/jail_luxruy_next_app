"use client";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box, useMediaQuery, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TruncatedText from "@/components/wrappers/TruncatedText";

const VideoContainer = styled(Box)(({ theme, ismobile }) => ({
  minWidth: ismobile ? "80vw" : "70%",
  minHeight: ismobile? "80vh":"70vh",
  display: "flex",
  marginLeft: ismobile? "0vw" : "5vw",
  marginRight: ismobile? "0vw" : "5vw",
  flexDirection: ismobile ? "column" : "row",
  alignItems: "center",
  justifyContent: ismobile ? "center" : "space-evenly",
  overflow: "hidden",
  borderRadius: "12px",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
  padding: theme.spacing(4),
  gap: theme.spacing(4),
  backgroundImage:
    theme.palette.mode === "dark"
      ? "url('./webps/darkmodeBackgroundImg.webp')"
      : "url('./webps/lightmodeBackgroundImg.webp')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "relative",
  backgroundSize: "cover", // or "contain" depending on your preference
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.7)",
    zIndex: 1,
  },
}));

const StyledVideo = styled("video")(({ ismobile }) => ({
  minWidth: ismobile ? "120vw" : "35vw",
  maxHeight: ismobile ? "50vh" : "60vh",
  objectFit: "cover",
  borderRadius: "12px",
  zIndex: 2,
}));

const VideoDescContainer = styled(Box)(({ theme ,ismobile}) => ({
 
  
  color: theme.palette.secondary.main,
  zIndex: 2,
}));

const TextContainer = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "1.6rem",
  lineHeight: "1.6",
  textAlign: "justify",
  marginBottom: theme.spacing(2),
  color: theme.custom.primaryButtonFontColor,
}));

const TitleText = styled(Typography)(({ theme }) => ({
  fontSize: "2.5rem",
  fontWeight: "bold",
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
}));

const LocalVideoPlayer = ({ videoSrc }) => {
  const theme = useTheme();
  const ismobile = useMediaQuery(theme.breakpoints.down("sm"));

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
    <VideoContainer ismobile={ismobile}>
      {videoSrcState ? (
        <StyledVideo autoPlay loop muted playsInline ismobile={ismobile}>
          <source src={videoSrcState} type="video/mp4" />
          Your browser does not support the video tag.
        </StyledVideo>
      ) : (
        <Typography variant="body1" color="textSecondary">
          Loading video...
        </Typography>
      )}

      <VideoDescContainer ismobile={ismobile}>
        <TitleText>WHY JAIL?</TitleText>
        <TextContainer>
          The name “Jail” is more than just a brand. It’s a nod to our roots. The
          original shop was located on Jail Road in Banka, and the name was born
          out of the simplicity of directions—“Jail Road, Jail Road.” Today, it
          stands as a symbol of our journey, from a small shop in Bihar to a
          luxury brand that resonates with customers around the world.
        </TextContainer>
      </VideoDescContainer>
    </VideoContainer>
  );
};

export default LocalVideoPlayer;