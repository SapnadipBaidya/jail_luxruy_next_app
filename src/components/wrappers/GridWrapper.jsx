"use client";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import StyledCardWrapper from "./StyledCardWrapper";
import { styled } from "@mui/material/styles";
import StyledCardSkeleton from "./StyledCardSkeleton";
import NoDataComponent from "./noDataComponent";

const GridWrapperComponent = styled("div")(({ theme }) => ({
  minWidth: "70vw",
  maxWidth: "70vw",
  minHeight: "70vh", // ✅ Ensure it takes full height of parent
  maxHeight: "70vh",
  overflowY: "auto", // ✅ Enable vertical scrolling
  overflowX: "hidden",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",

  [theme.breakpoints.down("md")]: {
    minWidth: "99vw",
    maxWidth: "99vw",
    height: "70vh",
    maxHeight: "80vh",
    padding: "0.5rem",
    justifyContent: "space-evenly",
  },
}));

function GridWrapper({ itemsArr, type }) {
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));
  console.log("loading", itemsArr?.loading);
  
  const data = Array.isArray(itemsArr?.data) ? itemsArr.data : [];

  return (
    <GridWrapperComponent>
      <Grid container spacing={3} justifyContent="space-between" alignItems="stretch">
        {itemsArr?.loading ? (
          // ✅ Render 8 skeleton placeholders in Grid layout
          <>
            {Array.from({ length: 8 }).map((_, index) => (
              <Grid 
                item 
                xs={5} 
                sm={6} 
                md={4} 
                lg={3} 
                xl={3} 
                key={index} 
                style={{ display: "flex", flexGrow: 1 }} 
              >
                <StyledCardSkeleton />
              </Grid>
            ))}
          </>
        ) : data.length > 0 ? (
          // ✅ Render actual product cards when data exists
          data.map((item, index) => (
            <Grid 
              item 
              xs={5} 
              sm={6} 
              md={4} 
              lg={3} 
              xl={3} 
              key={index} 
              style={{ display: "flex", flexGrow: 1 }} 
            >
              <StyledCardWrapper type={type} item={item} />
            </Grid>
          ))
        ) : (
          // ✅ No data available, render NoDataComponent
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <NoDataComponent />
          </Grid>
        )}
      </Grid>
    </GridWrapperComponent>
  );
}

export default GridWrapper;
