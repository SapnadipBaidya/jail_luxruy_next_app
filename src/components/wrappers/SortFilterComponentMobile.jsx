"use client";
import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import GenericBtns from "../buttons/GenericBtns";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";

// ✅ Styled Components
const SortFilterWrapper = styled(Box)(({ theme }) => ({
  minWidth: "100%",
  height: "7vh",
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
}));

const DrawerContent = styled(Box)(({ theme }) => ({
  width: "100vw",
  maxWidth: "350px",
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.palette.background.paper,
  height: "100vh",
}));

const DrawerHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingBottom: theme.spacing(2),
}));

const SortFilterComponentMobile = ({ setShowFilters, showFilters ,setSortDetail, sortBy, setSortBy }) => {
  const theme = useTheme();
  const ismobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenDrawer = () => setDrawerOpen(true);
  const handleCloseDrawer = () => setDrawerOpen(false);

  const handleSortSelection = (value) => {
    setSortBy(value);
    setDrawerOpen(false); // Close drawer after selection
  };

  return (
    <>
      {/* Main Bar */}
      <SortFilterWrapper>
        <GenericBtns type="primary" btnText={<FilterListIcon />} executableFunction={() => setShowFilters(!showFilters)} minWidth="3vw" />
        <GenericBtns type="secondary" btnText={sortBy} executableFunction={handleOpenDrawer} minWidth="10vw" />
      </SortFilterWrapper>

      {/* Sort Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={handleCloseDrawer}>
        <DrawerContent>
          {/* Header */}
          <DrawerHeader>
            <Typography variant="h6">Sort Options</Typography>
            <IconButton onClick={handleCloseDrawer}>
              <CloseIcon />
            </IconButton>
          </DrawerHeader>

          <Divider />

          {/* Sort Options */}
          <List>
            {[
              { label: "None", value: "Sort By" },
              { label: "Price: Low to High", value: "Price: Low to High" },
              { label: "Price: High to Low", value: "Price: High to Low" },
              { label: "Newest Arrivals", value: "Newest Arrivals" },
              { label: "Best Rated", value: "Best Rated" },
            ].map((item) => (
              <ListItem button key={item.value} onClick={() => handleSortSelection(item.value)}>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SortFilterComponentMobile;
