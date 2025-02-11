"use client";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Menu, MenuItem } from "@mui/material";

// Styled button component
const StyledButton = styled("button")(({ theme }) => ({
  all: "unset",
  display: "flex",
  alignItems: "center",
  position: "relative",
  padding: "0.2vh 1em",
  border: "#483030 solid 0.15em",
  borderRadius: "2vh",
  borderWidth: "0.125em",
  color: "#c6bbab",
  fontFamily: "Almarai, sans-serif",
  fontSize: "1.5em",
  fontWeight: "600",
  cursor: "pointer",
  overflow: "hidden",
  transition: "border 300ms, color 300ms",
  userSelect: "none",
  maxHeight:"5vh",
  "& p": {
    zIndex: 1,
  },
  "&:hover": {
    color: "#c6bbab",
  },
  "&:active": {
    borderColor: "#c6bbab",
  },
  "&::after, &::before": {
    content: '""',
    position: "absolute",
    width: "9em",
    aspectRatio: "1",
    background: "#483030",
    opacity: "50%",
    borderRadius: "50%",
    transition: "transform 500ms, background 300ms",
  },
  "&::before": {
    left: 0,
    transform: "translateX(-9em)",
  },
  "&::after": {
    right: 0,
    transform: "translateX(9em)",
  },
  "&:hover::before": {
    transform: "translateX(0em)",
  },
  "&:hover::after": {
    transform: "translateX(0em)",
  },
  "&:active::before, &:active::after": {
    background: "#483030",
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
        <p>{text}</p>
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