"use client";

import React, { useState, useEffect } from "react";
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
  Card,
  Drawer,
  Box,
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
  fontSize: "10px",
  color: theme.custom.primaryButtonFontColor,
  backgroundColor:"red",
  [theme.breakpoints.down("md")]: {
    
  },
}));

// Update the logo wrapper to make the logo image smaller on tablet view.
const HomeLogoWrapper = styled("div")(({ theme }) => ({
  backgroundColor: "red",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  cursor: "pointer",
  // Responsive image sizing
  "& img": {
    width: "200px",
    height: "50px",
    [theme.breakpoints.down("md")]: {
      width: "150px", // smaller width for tablet
      height: "40px", // smaller height for tablet
    },
  },
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
  [theme.breakpoints.down("sm")]: {
    
  },
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderBottom: 1,
  borderColor: "divider",
}));

const StyledInput = styled("input")(({ theme }) => ({
  width: "100%",
  height: "100%",
  padding: "8px",
  fontSize: "1rem",
  border: `0.5vh solid ${theme.palette.secondary.main}`,
  backgroundColor: theme.palette.background.paper,
  borderRadius: "4px",
  outline: "none",
}));

export default function Navbar() {
  const theme = useTheme();
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Hooks for responsive behavior:
  // isTablet: true for screen sizes md and below.
  // isMobile: true for screen sizes sm and below.
  const isTablet = useMediaQuery(theme.breakpoints.down("sm"));
  

  const [anchorEl, setAnchorEl] = useState(null);

  // ✅ Handlers
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const toggleMobileNav = () => setMobileOpen((prev) => !prev);

  // Prefetch the products page
  useEffect(() => {
    router.prefetch("/products");
  }, [router]);

  // ✅ Debounced search handler
  const handleSearch = useDebounce((query) => {
    if (query.trim()) {
      const searchPath = `/search?userInput=${encodeURIComponent(query)}`;
      console.log("Navigating to:", searchPath);
      router.push(searchPath);
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
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          {/* ✅ Mobile/Tablet Menu Button: visible on md and below */}
          {isTablet && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleMobileNav}
              sx={{ display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* ✅ Desktop Navigation: visible only on larger screens */}
          {!isTablet && (
            <Box sx={{ display: "flex", gap: 2 }}>
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
          )}

          {/* ✅ Logo (always centered) */}
          <HomeLogoWrapper onClick={() => router.push("/")}>
            <img
              src={
                theme.palette.mode === "light"
                  ? "/webps/homePageLogoLight.webp"
                  : "/webps/homePageLogoDark.webp"
              }
              alt="Jail Logo"
              priority
            />
          </HomeLogoWrapper>

          {/* ✅ Right Side Icons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Grouping Search, Wishlist and Cart together */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
            </Box>

            {/* On Desktop and Tablet (but not mobile) show the Profile and ThemeToggle */}
            {!isTablet && (
              <>
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
              </>
            )}
          </Box>
        </Toolbar>

        {/* ✅ Search Bar: Visible when search is open */}
        {isSearchOpen && (
          <SearchBox>
            <StyledInput
              type="text"
              placeholder="Search for products..."
              value={searchQuery || ""}
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

      {/* ✅ Mobile/Tablet Drawer Navigation */}
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
          {/* ✅ In tablet/mobile view, include the profile/login link */}
          {isTablet &&
            (user?.id ? (
              <StyledButton
                onClick={() => {
                  toggleMobileNav();
                  router.push("/userContact");
                }}
              >
                Profile
              </StyledButton>
            ) : (
              <StyledButton
                onClick={() => {
                  toggleMobileNav();
                  router.push("/login-signup");
                }}
              >
                Login / Signup
              </StyledButton>
            ))}
        </Box>
      </MobileNav>
    </>
  );
}