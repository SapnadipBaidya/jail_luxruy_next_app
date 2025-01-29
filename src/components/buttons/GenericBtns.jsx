import React from 'react';
import { styled } from '@mui/system';
import { Button, useTheme, useMediaQuery } from '@mui/material';

function GenericBtns({ type, btnText, defaultText = "default", executableFunction, minWidth = "10vw" }) {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md")); // ✅ Detect Tablet View
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // ✅ Detect Mobile View

  // ✅ Adjust Button Size for Different Screens
  const buttonMinWidth = isMobile ? "100%" : isTablet ? "7vw" : minWidth;

  const renderButtonByType = () => {
    switch (type) {
      case 'primary':
        return (
          <StyledButton variant="contained" color="primary" onClick={executableFunction} minwidth={buttonMinWidth}>
            {btnText}
          </StyledButton>
        );
      case 'secondary':
        return (
          <StyledButton variant="outlined" color="secondary" onClick={executableFunction} minwidth={buttonMinWidth}>
            {btnText}
          </StyledButton>
        );
      case 'error':
        return (
          <StyledButton variant="text" color="error" onClick={executableFunction} minwidth={buttonMinWidth}>
            {btnText}
          </StyledButton>
        );
      default:
        return (
          <StyledButton variant="contained" color="primary" onClick={executableFunction} minwidth={buttonMinWidth}>
            {defaultText}
          </StyledButton>
        );
    }
  };

  return <>{renderButtonByType()}</>;
}

export default GenericBtns;

// Styled Components

const StyledButton = styled(Button)(({ theme, minwidth }) => ({
  padding: theme.spacing(1.5, 3),
  minWidth: minwidth, // ✅ Dynamic width based on breakpoints
  fontSize: theme.typography.pxToRem(14),
  fontWeight: theme.typography.fontWeightMedium,
  textTransform: 'none', // ✅ Disable uppercase transformation
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  transition: 'all 0.3s ease',
  padding:"1vh",
  color:theme.custom.primaryButtonFontColor,

  '&:hover': {
    boxShadow: theme.shadows[4],
    transform: 'scale(1.05)',
  },

  '&.MuiButton-contained': {
    backgroundColor: theme.palette.primary.main,
    color:theme.custom.primaryButtonFontColor,
  },

  '&.MuiButton-outlined': {
    borderColor:theme.palette.primary.main,
    color:theme.custom.primaryButtonFontColor,
  },

  '&.MuiButton-text': {
    color: theme.palette.error.main,
  },

  // ✅ Tablet View Adjustments
  [theme.breakpoints.down("md")]: {
    minWidth: "35vw", // ✅ Adjust width for tablets
    fontSize: theme.typography.pxToRem(12),
    padding: theme.spacing(1, 2),
    maxHeight:theme.typography.pxToRem(40)
  },

  // ✅ Mobile View Adjustments
  [theme.breakpoints.down("sm")]: {
    minWidth: "30vw", // ✅ Full width for mobile
    fontSize: theme.typography.pxToRem(12),
    padding: theme.spacing(1),
    maxHeight:theme.typography.pxToRem(30)
  },
}));