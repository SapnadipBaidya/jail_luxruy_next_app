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
  Card,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  ShoppingCart,
  Favorite,
  Close as CloseIcon,
  KeyboardArrowDown as ChevronDownIcon,
} from "@mui/icons-material";
import { navigationConfig } from "@/app/configs/navigationConfig";
import ProfileBtn from "./buttons/profileBtn";
import TruncatedText from "./wrappers/TruncatedText";
import ThemeToggle from "./themeToggle";
import { useTheme } from "@emotion/react";
import useDebounce from "@/utils/customHooks/useDebounce";

// ✅ Mocked user for now
const user = { id: "111", name: "sapnadip" };

// ✅ Styled Components
const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontSize: "0.875rem",
  color: theme.custom.primaryButtonFontColor,
}));

const HomeLogoWrapper = styled("div")(({ theme }) => ({}));

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

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderBottom: 1,
  borderColor: "divider",
}));

const StyledInput = styled("input")(({ theme }) => ({
  width: "100%", // Full width
  height: "100%", // Full height of the container
  padding: "8px", // Add padding for better UX
  fontSize: "1rem", // Adjust font size
  border: `0.5vh solid ${theme.palette.secondary.main}`, // Add border
  backgroundColor:theme.palette.background.paper,
  borderRadius: "4px", // Add border radius
  outline: "none", // Remove default outline
}));

export default function Navbar() {
  const theme = useTheme();
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState(null);

  // ✅ Handlers
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const toggleMobileNav = () => setMobileOpen(!mobileOpen);

  // Prefetch the products page
  React.useEffect(() => {
    router.prefetch("/products");
  }, [router]);

  // ✅ Debounced search handler
  const handleSearch = useDebounce((query) => {
    if (query.trim()) {
      const searchPath = `/search?userInput=${encodeURIComponent(query)}`;
      console.log("Navigating to:", searchPath);
      router.push(searchPath); // This will navigate to /search
    }
  }, 500);

  // ✅ Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  // ✅ Handle search submission
  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      const searchPath = `/search?userInput=${encodeURIComponent(searchQuery)}`;
      console.log("Navigating to:", searchPath);
      router.push(searchPath);
    }
  };

  return (
    <>
      {/* ✅ Top AppBar */}
      <StyledAppBar position="sticky">
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
                <MenuItem onClick={() => router.push("/login-signup")}>
                  <Card sx={{ padding: "1vw" }}>
                    <h2>Welcome</h2>
                    <h6>
                      To access account and <br /> manage orders...
                    </h6>
                    Login / Signup
                  </Card>
                </MenuItem>
              ) : (
                [
                  <MenuItem
                    key="profile"
                    onClick={() => router.push("/userContact")}
                  >
                    Profile
                  </MenuItem>,
                  <MenuItem
                    key="logout"
                    onClick={() => {
                      // logout();
                    }}
                  >
                    Logout
                  </MenuItem>,
                ]
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
          <HomeLogoWrapper onClick={() => router.push("/")}>
            <img
              src={
                theme.palette.mode === "light"
                  ? "/webps/homePageLogoLight.webp"
                  : "/webps/homePageLogoDark.webp"
              }
              alt="Jail Logo"
              width={200}
              height={50}
              priority
            />
          </HomeLogoWrapper>

          {/* ✅ Right Side Icons */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <StyledButton
              color="inherit"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="search"
            >
              {isSearchOpen ? <CloseIcon /> : <SearchIcon />}
            </StyledButton>
            <StyledButton
              color="inherit"
              onClick={() => router.push("/wishlist")}
              aria-label="wishlist"
            >
              <Favorite />
            </StyledButton>
            <StyledButton
              color="inherit"
              onClick={() => router.push("/cart")}
              aria-label="cart"
            >
              <ShoppingCart />
            </StyledButton>

            <ProfileBtn
              text={
                user?.id ? (
                  <TruncatedText maxWidth="9vw">{user.name}</TruncatedText>
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
            <StyledInput
              type="text"
              placeholder="Search for products..."
              value={searchQuery || ""} // Ensure value is never undefined
              onChange={handleSearchChange}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearchSubmit();
                }
              }}
            />
          </SearchBox>
        )}
      </StyledAppBar>

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
