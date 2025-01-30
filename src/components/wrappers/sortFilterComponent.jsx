"use client";
import React, { useState } from 'react';
import { Box, Menu, MenuItem, styled, useTheme, useMediaQuery } from '@mui/material';
import GenericBtns from '../buttons/GenericBtns';
import FilterListIcon from '@mui/icons-material/FilterList';

const SortFilterWrapper = styled('div')(({ theme }) => ({
  minWidth: "100%",
  height: "7vh",
  padding: "1rem",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  position: "sticky",
  top: 0,  // Ensures it sticks at the top
  backgroundColor: theme.palette.background.paper, // Ensures visibility over content
  zIndex: 1000, // Keeps it above other elements
  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)" // Optional: adds slight shadow to differentiate from content

}));

function SortFilterComponent({ setShowFilters, showFilters }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));  // ✅ Detects mobile view
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));  // ✅ Detects tablet view

  const [anchorEl, setAnchorEl] = useState(null);
  const [sortBy, setSortBy] = useState("Sort By");
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value) => {
    if (value) {
      setSortBy(value); // Update the selected sorting option
    }
    setAnchorEl(null);
  };

  const handleFilterClick = () => {
    setShowFilters(!showFilters);
  };

  return (
    <SortFilterWrapper>
      {isMobile && <GenericBtns type="primary" btnText={<FilterListIcon />} executableFunction={handleFilterClick} minWidth="3vw" />}
      <GenericBtns type="secondary" btnText={sortBy} executableFunction={handleClick} minWidth="10vw" />

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(null)}
        PaperProps={{
          sx: {
            width: isMobile ? "100vw" : isTablet ? "36.5vw" : "10vw",  // ✅ Responsive Width
            padding: "1vh",
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {[
          { label: "None", value: "Sort By" },
          { label: "Price: Low to High", value: "Price: Low to High" },
          { label: "Price: High to Low", value: "Price: High to Low" },
          { label: "Newest Arrivals", value: "Newest Arrivals" },
          { label: "Best Rated", value: "Best Rated" }
        ].map((item) => (
          <MenuItem
            key={item.value}
            onClick={() => handleClose(item.value)}
            sx={{
              fontSize: isMobile
                ? theme.typography.pxToRem(12)
                : isTablet
                ? theme.typography.pxToRem(12)
                : theme.typography.pxToRem(14),  // ✅ Adjust font size dynamically
              padding: isMobile ? "0.5vh" : "1vh",  // ✅ Adjust padding dynamically
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </SortFilterWrapper>
  );
}

export default SortFilterComponent;