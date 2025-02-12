"use client"

import React, { useEffect, useState } from 'react'
import GridWrapper from '../wrappers/GridWrapper';
import { styled } from '@mui/material';
const PageHeaderComp = styled("div")(({ theme }) => ({
    width: "100%",
    backgroundColor: theme.custom.banner,
    color: theme.custom.primaryButtonFontColor,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
    fontSize: theme.typography.pxToRem(60),
    fontFamily: "aboreto",
  }));
function BestSellerPageClient({ItemsData}) {
    const [itemsArr, setItemsArr] = useState(ItemsData?.data);
      const [gridLoading, setGridLoading] = useState(false);

        useEffect(() => {
          setGridLoading(ItemsData?.loading);
        }, [ItemsData?.loading]);
  return (
    <div> 
        <PageHeaderComp>BEST SELLERS</PageHeaderComp>
        {gridLoading ? (
        <div style={{minHeight:"70%", display:"flex",justifyContent:"center",alignItems:"center"}}>  <ThreeDotLoader/></div>
      
      ) : (
        <GridWrapper
          itemsArr={itemsArr}
          type="Product"
          loading={ItemsData?.loading}
        />
      )}</div>
  )
}

export default BestSellerPageClient