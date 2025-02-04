"use client"
import React, { useEffect } from 'react';
import GridWrapper from '../wrappers/GridWrapper';

function WishListPageClient({accessToken , itemsArr}) {

    
 
  return (
    <div style={{display:"flex",justifyContent:"center"}}>
      
        <GridWrapper type="Wishlist" itemsArr={itemsArr} accessToken={accessToken} />
      
      
    </div>
  );
}

export default WishListPageClient;
