"use client"

import React, { useEffect, useState } from 'react'
import GridWrapper from '../wrappers/GridWrapper';
import { styled } from '@mui/material';
const PageHeaderComp = styled("div")(({ theme }) => ({

    backgroundColor: theme.custom.banner,
    color: theme.custom.primaryButtonFontColor,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
    fontSize: theme.typography.pxToRem(60),
    fontFamily: "aboreto",
    minWidth:"100vw"
  }));
function BestSellerPageClient({ItemsData}) {
    const [itemsArr, setItemsArr] = useState(ItemsData?.data);
      const [gridLoading, setGridLoading] = useState(false);

        useEffect(() => {
          setGridLoading(ItemsData?.loading);
        }, [ItemsData?.loading]);
  return (
    <div style={{ display:"flex",justifyContent:"center",alignItems:"center" , flexDirection:"column"}}> 
        <PageHeaderComp>BEST SELLERS</PageHeaderComp>
        {gridLoading ? (
        <div style={{minHeight:"70%", display:"flex",justifyContent:"center",alignItems:"center"}}>  <ThreeDotLoader/></div>
      
      ) : (
        <div style={{maxWidth:"80vw"}}>
           <GridWrapper
          itemsArr={itemsArr}
          type="Product"
          loading={ItemsData?.loading}
        />
        </div>
       
      )}</div>
  )
}

export default BestSellerPageClient