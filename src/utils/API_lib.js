// app/actions/wishlist-actions.js
"use server";

import { cookies } from "next/headers";

// Helper to get server-side API URL
const getApiUrl = (path) => {
  return `${process.env.NEXT_PUBLIC_API_URL}${path}`;
};

// Generic API handler for server actions
const serverApiRequest = async (path, method = "GET", body = null) => {
  try {
    const clientCookie = await cookies()
    const accessToken = clientCookie.get("accessToken")?.value;
    
    if (!accessToken) {
      throw new Error("Unauthorized - No access token found");
    }

    const response = await fetch(getApiUrl(path), {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Server API Error:", error.message);
    throw error;
  }
};

// Wishlist Actions
export const addOrEditWishlist = async (productDetailsId, productId) => {
  "use server";
  
  return serverApiRequest("/api/wishlist/addOrEditWishlist", "POST", {
    payloadObj: {
      productsDetailsId: productDetailsId,
      product_id: productId,
    }
  });
};

export const deleteFromUserWishlist = async (productDetailsId, productId) => {
  "use server";
  
  return serverApiRequest("/api/wishlist/deleteFromUserWishlist", "POST", {
    payloadObj: {
      productsDetailsId: productDetailsId,
      product_id: productId,
    }
  });
};

export const fetchUserWishlist = async () => {
  "use server";
  
  return serverApiRequest("/api/wishlist/fetchUserWishlist", "POST");
};

// Cart Actions
export const addToCart = async (productDetailsId, productId) => {
  "use server";
  
  return serverApiRequest("/api/cart/addOrEditCart", "POST", {
    payloadObj: {
      productsDetailsId: productDetailsId,
      product_id: productId,
    }
  });
};