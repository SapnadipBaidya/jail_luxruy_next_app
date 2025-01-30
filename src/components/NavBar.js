"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Typography,
  Drawer,
  Box,
  TextField,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  ShoppingCart,
  Favorite,
  Person,
  Close as CloseIcon,
  KeyboardArrowDown as ChevronDownIcon,
} from "@mui/icons-material";
import { navigationConfig } from "@/app/configs/navigationConfig";
import ProfileBtn from "./buttons/profileBtn";
import TruncatedText from "./wrappers/TruncatedText";
import ThemeToggle from "./themeToggle";
import { useTheme } from "@emotion/react";

// ✅ Mocked user for now
const user = { id: "111", name: "sapnadip" };

// ✅ Styled Components
const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontSize: "0.875rem",
  color: theme.custom.primaryButtonFontColor,
}));

const HomeLogoWrapper = styled('div')(({ theme }) => ({
    
  }));

const MobileNav = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: "250px",
    padding: theme.spacing(2),
  },
}));

const SearchBox = styled(Box)(({ theme }) => ({
    padding: 2,
    borderTop: 1,
    borderColor: "divider",
  }));
export default function Navbar() {
  const theme = useTheme();
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  // ✅ Handlers
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const toggleMobileNav = () => setMobileOpen(!mobileOpen);

  return (
    <>
      {/* ✅ Top AppBar */}
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "background.paper",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* ✅ Mobile Menu Button */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleMobileNav}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* ✅ Desktop Navigation */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            <StyledButton onClick={handleMenuOpen}>
              Category <ChevronDownIcon fontSize="small" />
            </StyledButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {!user?.id ? (
                <MenuItem
                  onClick={() => {
                    router.push("/login-signup");
                  }}
                >
                  <Card sx={{ padding: "1vw" }}>
                    <h2>Welcome</h2>
                    <h6>
                      To access account and <br /> manage orders...
                    </h6>
                    Login / Signup
                  </Card>
                </MenuItem>
              ) : (
                <>
                  {/* <MenuItem onClick={handleProfileMenuClose}>Orders</MenuItem> */}
                  <MenuItem
                    onClick={(e) => {
                      // handleProfileMenuClose(e);
                      router.push("userContact");
                    }}
                  >
                    profile
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      // handleProfileMenuClose(e);
                      // logout();
                    }}
                  >
                    Logout
                  </MenuItem>
                </>
              )}
            </Menu>
            <StyledButton component={Link} href="/about">
              About Us
            </StyledButton>
            <StyledButton component={Link} href="/contact">
              Contact Us
            </StyledButton>
          </Box>

          {/* ✅ Logo */}
          <HomeLogoWrapper onClick={()=>router.push("/")}>
          {theme.palette.mode == "light" ? (
            <img
              src="http://localhost:3000/webps/homePageLogoLight.webp"
              alt="Jail Logo"
              width={200}
              height={50}
              priority
            />
          ) : (
            <img
              src="http://localhost:3000/webps/homePageLogoDark.webp"
              alt="Jail Logo"
              width={200}
              height={50}
              priority
            />
          )}
          </HomeLogoWrapper>
        
          {/* ✅ Right Side Icons */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <StyledButton
              color="inherit"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              {isSearchOpen ? <CloseIcon /> : <SearchIcon />}
            </StyledButton>
            <StyledButton
              color="inherit"
              onClick={() => router.push("/wishlist")}
            >
              <Favorite />
            </StyledButton>
            <StyledButton color="inherit" onClick={() => router.push("/cart")}>
              <ShoppingCart />
            </StyledButton>

            <ProfileBtn
              text={
                user?.id ? (
                  <TruncatedText maxWidth="9vw">{"sapnadip"}</TruncatedText>
                ) : (
                  "Profile"
                )
              }
              executableFunction={handleMenuOpen}
            />
            <ThemeToggle />
          </Box>
        </Toolbar>

        {/* ✅ Search Bar */}
        {isSearchOpen && (
          <SearchBox>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchBox>
        )}
      </AppBar>

      {/* ✅ Mobile Drawer Navigation */}
      <MobileNav anchor="left" open={mobileOpen} onClose={toggleMobileNav}>
        <IconButton onClick={toggleMobileNav} sx={{ alignSelf: "flex-end" }}>
          <CloseIcon />
        </IconButton>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {navigationConfig.map((item) => (
            <StyledButton
              key={item.path}
              component={Link}
              href={item.path}
              onClick={toggleMobileNav}
            >
              {item.label}
            </StyledButton>
          ))}
        </Box>
      </MobileNav>
    </>
  );
}
