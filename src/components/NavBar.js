import React, { useState, useEffect, useContext } from "react";
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
import { AppContext } from "@/context/applicationContext";
import CategoryDropdown from "@/components/catogeryComponent/CategoryDropdown"; // Import the CategoryDropdown component

// ✅ Mocked user for now
const user = { id: "111", name: "sapnadip" };

// ✅ Styled Components
const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontSize: "10px",
  color: theme.custom.primaryButtonFontColor,
  backgroundColor: "red",
  [theme.breakpoints.down("md")]: {},
}));

const HomeLogoWrapper = styled("div")(({ theme }) => ({
  backgroundColor: "red",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  cursor: "pointer",
  "& img": {
    width: "200px",
    height: "50px",
    [theme.breakpoints.down("md")]: {
      width: "150px",
      height: "40px",
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
  [theme.breakpoints.down("sm")]: {},
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

const NavLinksContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: 2,
  alignItems: "center",
}));

export default function Navbar({ carouselImages }) {
  const theme = useTheme();
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setCategoryItems } = useContext(AppContext);
  
  useEffect(() => {
    setCategoryItems(carouselImages);
  }, [carouselImages?.length])
  


  const isTablet = useMediaQuery(theme.breakpoints.down("sm"));

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const toggleMobileNav = () => setMobileOpen((prev) => !prev);

  useEffect(() => {
    router.prefetch("/products");
  }, [router]);

  const handleSearch = useDebounce((query) => {
    if (query.trim()) {
      const searchPath = `/search?userInput=${encodeURIComponent(query)}`;
      console.log("Navigating to:", searchPath);
      router.push(searchPath);
    }
  }, 500);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      const searchPath = `/search?userInput=${encodeURIComponent(searchQuery)}`;
      console.log("Navigating to:", searchPath);
      router.push(searchPath);
    }
  };


  return (
    <>
      <StyledAppBar position="sticky">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
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

          {!isTablet && (
            <NavLinksContainer>
              <CategoryDropdown/>
              <StyledButton component={Link} href="/about">
                About Us
              </StyledButton>
              <StyledButton component={Link} href="/contact">
                Contact Us
              </StyledButton>
            </NavLinksContainer>
          )}

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

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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