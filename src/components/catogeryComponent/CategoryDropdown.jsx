import React, { useState, forwardRef, useContext } from "react";
import NextLink from "next/link";
import { Menu, MenuItem, Button, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ChevronDownIcon from "@mui/icons-material/ExpandMore";

// ---- Example Icons from @mui/icons-material (pick whichever suits your design) ----
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import LuggageIcon from "@mui/icons-material/Luggage";
import HandshakeIcon from "@mui/icons-material/Handshake";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import StoreIcon from "@mui/icons-material/Store";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import zIndex from "@mui/material/styles/zIndex";
import { AppContext } from "@/context/applicationContext";

// ✅ Create a Link wrapper that forwards refs to Next.js's Link component
const LinkBehavior = forwardRef(function LinkBehavior(props, ref) {
  const { href, ...other } = props;
  return <NextLink ref={ref} href={href} {...other} />;
});

// ✅ Styled Components for Pixel-Perfect Look
const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  textTransform: "none",
  display: "flex",
  alignItems: "center",
  fontSize: "1rem",
  fontWeight: 500,
  padding: "8px 12px",
  borderRadius: "6px",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },

    color:theme.custom.primaryButtonFontColor
 
}));

const MenuContainer = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    minWidth: "200px",
    maxWidth: "260px",
    padding: "8px",
    borderRadius: "8px",
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    position: "absolute",
    top: "100%",
  },
}));

const MenuItemStyled = styled(MenuItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "12px 16px",
  borderRadius: "6px",
  gap: "12px",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.ascentColor.main,
  },
}));

// ---- Icon Mapper Example ----
// Update the keys (slugs) to match your own category slugs
const iconMap = {
  bag: <ShoppingBagIcon sx={{ fontSize: "24px" }} />,
  belt: <WorkOutlineIcon sx={{ fontSize: "24px" }} />,
  duffleBag: <BusinessCenterIcon sx={{ fontSize: "24px" }} />,
  gloves: <HandshakeIcon sx={{ fontSize: "24px" }} />,
  jacket: <CheckroomIcon sx={{ fontSize: "24px" }} />,
  shoes: <StoreIcon sx={{ fontSize: "24px" }} />,
  trolley: <LuggageIcon sx={{ fontSize: "24px" }} />,
  wallet: <AccountBalanceWalletIcon sx={{ fontSize: "24px" }} />,
};

const CategoryDropdown = () => {
  const { categoryItems } = useContext(AppContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      {/* ✅ Category Button */}
      <StyledButton onClick={handleOpen}>
        Categories <ChevronDownIcon fontSize="small" />
      </StyledButton>

      {/* ✅ Dropdown Menu */}
      <MenuContainer
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        {/* ✅ Dynamic Category List */}
        {categoryItems?.map((category, index) => {
          // Safely retrieve the icon from the map. Fallback to <ShoppingBagIcon /> if none is found.
          const icon = iconMap[category?.slug] || (
            <ShoppingBagIcon sx={{ fontSize: "24px" }} />
          );

          return (
            <MenuItemStyled
              key={index}
              onClick={handleClose}
              // Use the custom LinkBehavior as the component and pass the href prop
              component={LinkBehavior}
              href={`/products/${category?.category_mapping}`}
            >
              {icon}
              <Typography>{category?.catagory_name}</Typography>
            </MenuItemStyled>
          );
        })}
      </MenuContainer>
    </Box>
  );
};

export default CategoryDropdown;
