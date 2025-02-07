"use client";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import StyledCardWrapper from "./StyledCardWrapper";
import { styled } from "@mui/material/styles";
import StyledCardSkeleton from "./StyledCardSkeleton";
import NoDataComponent from "./noDataComponent";

const GridWrapperComponent = styled("div")(({ theme }) => ({
  minWidth:"70vw",
  padding: "2rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems:"flex-start",

  [theme.breakpoints.down("md")]: {
    minWidth: "99vw",
    maxWidth: "99vw",
    height: "70vh",
    maxHeight: "80vh",
    padding: "0.5rem",
    justifyContent: "space-evenly",
  },
}));

function GridWrapper({ itemsArr, type,loading ,accessToken,setWishlistData}) {
  const theme = useTheme();
  console.log("gridwrapper",accessToken)
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));
  console.log("loading", itemsArr?.loading ,StyledCardWrapper);
  
  const data =  itemsArr 
  console.log("data",Array?.isArray(data),data,data?.length,itemsArr)
  return (
    <GridWrapperComponent>
      <Grid container spacing={2} justifyContent="flex-start" alignItems="center">
        {loading ? (
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
        ) : data?.length > 0 ? (
          // ✅ Render actual product cards when data exists
          data?.map((item, index) => (
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
              <StyledCardWrapper type={type} item={item} accessToken={accessToken} setWishlistData={setWishlistData}/>
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
