"use client";

import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { useRouter } from "next/navigation";

// ✅ Styled Components with Glassmorphism
const NoDataContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  textAlign: "center",
}));

const NoDataCard = styled(Box)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  borderRadius: "12px",
  padding: theme.spacing(4),
  maxWidth: "500px",
  boxShadow: `0 0vh 2vh 0.1vh ${theme.palette.secondary.main}`,
  border: `1px solid ${theme.palette.divider}`,
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)",
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  fontSize: "5rem",
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2),
  fontWeight: "bold",
  borderRadius: "8px",
  padding: theme.spacing(1.5, 4),
  textTransform: "none",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const NoDataComponent = () => {
  const router = useRouter();

  return (
    <NoDataContainer>
      <NoDataCard>
        <IconWrapper>
          <SentimentDissatisfiedIcon fontSize="inherit" />
        </IconWrapper>

        <Typography variant="h4" fontWeight="bold">
          Oops! No Data Found
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.7, marginTop: 1 }}>
          It looks like we couldn’t find any data matching your request.
        </Typography>

        {/* Buttons for User Action */}
        <StyledButton
          variant="contained"
          color="primary"
          onClick={() => router.back()}
        >
          Go Back
        </StyledButton>
        <StyledButton
          variant="outlined"
          color="secondary"
          onClick={() => router.push("/")}
        >
          Explore More
        </StyledButton>
      </NoDataCard>
    </NoDataContainer>
  );
};

export default NoDataComponent;
