"use client"
import React from "react";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

const ProfileButton = styled(Button)(({ theme }) => ({
  "--button_radius": "0.75em",
  "--button_color": theme.custom?.btnBgColor || "#ccc",
  "--button_outline_color": theme.custom?.btnBorder || "#444",
  fontSize: theme.typography.pxToRem(14),
  border: "none",
  cursor: "pointer",
  borderRadius: "var(--button_radius)",
  background: "var(--button_outline_color)",
  padding: "0",
  position: "relative",
  overflow: "hidden",
  fontFamily: `"Bona Nova SC", serif !important`,  // ✅ Force MUI to use this font
  "& .button_top": {
    display: "block",
    boxSizing: "border-box",
    border: "2px solid var(--button_outline_color)",
    borderRadius: "var(--button_radius)",
    padding: `${theme.typography.pxToRem(15)} ${theme.typography.pxToRem(40)}`,
    background: "var(--button_color)",
    color: theme.custom?.primaryButtonFontColor || "#fff",
    transform: "translateY(-0.2em)",
    transition: "transform 0.1s ease",
    width: "100%",
    textAlign: "center",
    height: theme.typography.pxToRem(50),
    marginTop: theme.typography.pxToRem(2),

  },
  ".MuiTypography-root":{
    fontFamily: '"Bona Nova SC", serif !important',
    fontWeight: "700 !important",
    fontStyle: "normal !important",
  },

  "&:hover .button_top": {
    transform: "translateY(-0.40em)",
  },
  "&:active .button_top": {
    transform: "translateY(0)",
  },
  maxHeight: theme.typography.pxToRem(80),
}));

const ProfileBtn = ({ text, executableFunction }) => {
  return (
    <ProfileButton onClick={executableFunction}>
      <span className="button_top">{text}</span>
    </ProfileButton>
  );
};

export default ProfileBtn;
