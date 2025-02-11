"use client";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Menu, MenuItem } from "@mui/material";

// Styled button component using MUI theme
const StyledButton = styled("button")(({ theme }) => ({
  position: "relative",
  display: "inline-block",
  padding: "1vh 3vh",
  border: `0.4vh solid ${theme.palette.primary.main}`, // Use theme primary color
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
    top: "6px",
    left: "-2px",
    width: "calc(90%)",
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
    left: "6px",
    top: "-2px",
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
        <span>{text}</span>
      </StyledButton>

      {/* MUI Menu */}
      <Menu
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
      </Menu>
    </>
  );
};

export default ProfileBtn;