"use client";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Menu, MenuItem } from "@mui/material";

// Styled button component using MUI theme
const StyledButton = styled("button")(({ theme }) => ({
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  maxHeight:"5vh",
  position: "relative",
  display: "inline-block",
  padding: "0vh 3vh",
  border: `0.4vh solid ${theme.palette.secondary.main}`, // Use theme primary color
  borderRadius:"0.5vh",
  textTransform: "uppercase",
  color: theme.palette.text.primary, // Use theme text color
  textDecoration: "none",
  fontWeight: 600,
  fontSize: "20px",
  backgroundColor: "transparent",
  cursor: "pointer",
  "&::before": {
    content: '""',
    position: "absolute",
    top: theme.typography.pxToRem(6),
    left: `-${theme.typography.pxToRem(2)}`,
    width: "calc(100% + 4px)",
    height: "calc(100% - 12px)",
    backgroundColor: theme.palette.background.default, // Use theme background color
    transition: "transform 0.2s ease-in-out",
    transform: "scaleY(1)",
  },
  "&:hover::before": {
    transform: "scaleY(0)",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    left: theme.typography.pxToRem(6),
    top: `-${theme.typography.pxToRem(2)}`,
    height: "calc(100% + 4px)",
    width: "calc(100% - 12px)",
    backgroundColor: theme.palette.background.default, // Use theme background color
    transition: "transform 0.2s ease-in-out",
    transform: "scaleX(1)",
    transitionDelay: "0.3s",
  },
  "&:hover::after": {
    transform: "scaleX(0)",
  },
  "& span": {
    position: "relative",
    zIndex: 3,
  },
}));


const MenuContainer = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
  
    minWidth: theme.typography.pxToRem(155),
    maxWidth:  theme.typography.pxToRem(200),
    padding:  theme.typography.pxToRem(8),
    borderRadius: theme.typography.pxToRem(8),
    backgroundColor: theme.palette.background.paper,
    color: theme.custom.primaryButtonFontColor,
    boxShadow: theme.shadows[5],
    position: "absolute",
    top: "100%",
  },
}));

const ProfileBtn = ({ text }) => {
  const [anchorEl, setAnchorEl] = useState(null); // State to manage menu anchor
  const open = Boolean(anchorEl); // Check if menu is open

  // Handle button click to open menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle menu close
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* Styled Button */}
      <StyledButton onClick={handleClick}>
       {text}
      </StyledButton>

      {/* MUI Menu */}
      <MenuContainer
        anchorEl={anchorEl} // Anchor the menu to the button
        open={open} // Control menu visibility
        onClose={handleClose} // Close menu on item click or outside click
        MenuListProps={{
          "aria-labelledby": "profile-button", // Accessibility
        }}
        anchorOrigin={{
          vertical: "bottom", // Position menu below the button
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top", // Align menu with the top of the button
          horizontal: "left",
        }}
      >
        {/* Menu Items */}
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </MenuContainer>
    </>
  );
};

export default ProfileBtn;