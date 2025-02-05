import { useCallback } from "react";
import axios from "axios";

export const useWishlistApi = (accessToken) => {
  console.log("useWishlistApi", accessToken);

  const addOrEditWishlist = useCallback(
    async (productDetailsId, productId) => {
      if (!accessToken) {
        console.error("Access token is missing!");
        return;
      }

      console.log("Proceeding to make API call: addOrEditWishlist");
      const apiUrl = "http://localhost:8080/api/wishlist/addOrEditWishlist";

      try {
        const response = await axios.post(
          apiUrl,
          {
            payloadObj: {
              productsDetailsId: productDetailsId,
              product_id: productId,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Wishlist response:", response.data);
        return response.data;
      } catch (error) {
        console.error(
          "Error adding/editing wishlist:",
          error.response?.data || error.message
        );
        throw error;
      }
    },
    [accessToken]
  );

  const deleteFromUserWishlist = useCallback(
    async (productDetailsId, productId) => {
      if (!accessToken) {
        console.error("Access token is missing!");
        return;
      }

      console.log("Proceeding to make API call: deleteFromUserWishlist");
      const apiUrl =
        "http://localhost:8080/api/wishlist/deleteFromUserWishlist";

      try {
        const response = await axios.post(
          apiUrl,
          {
            payloadObj: {
              productsDetailsId: productDetailsId,
              product_id: productId,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Wishlist response:", response.data);
        return response.data;
      } catch (error) {
        console.error(
          "Error deleting from wishlist:",
          error.response?.data || error.message
        );
        throw error;
      }
    },
    [accessToken]
  );

  const fetchUserWishlist = useCallback(async () => {
    if (!accessToken) {
      console.error("Access token is missing!");
      return [];
    }

    console.log("Proceeding to make API call: fetchUserWishlist");
    const apiUrl = "http://localhost:8080/api/wishlist/fetchUserWishlist";

    try {
      const response = await axios.post(
        apiUrl,
        {}, // Add any required request body here
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Wishlist response:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching wishlist:",
        error.response?.data || error.message
      );
      return [];
    }
  }, [accessToken]);

  return { addOrEditWishlist, deleteFromUserWishlist, fetchUserWishlist };
};

export const useCartApi = (accessToken) => {
  console.log("useCartApi", accessToken);

  const addToCart = useCallback(
    async (productDetailsId, productId) => {
      if (!accessToken) {
        console.error("Access token is missing!");
        return;
      }

      console.log("Proceeding to make API call: addToCart");
      const apiUrl = "http://localhost:8080/api/cart/addToCart";

      try {
        const response = await axios.post(
          apiUrl,
          {
            payloadObj: {
              productsDetailsId: productDetailsId,
              product_id: productId,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Cart response:", response.data);
        return response.data;
      } catch (error) {
        console.error(
          "Error adding to cart:",
          error.response?.data || error.message
        );
        throw error;
      }
    },
    [accessToken]
  );

  return { addToCart };
};

