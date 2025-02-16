"use client";
import { checkout } from '@/utils/API_lib';
import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import ThreeDotLoader from '../loaders/threeDotLoader';

function CheckoutPageClient() {
  const [razorpayLoaded, setRazorpayLoaded] = useState(true);

  const checkoutHandler = async (name, amount) => {
    try {
      const { success, data } = await checkout({ name, amount });

      if (!success || !data) {
        console.error('Checkout failed');
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Ensure this is set in your .env.local
        amount: data.amount,
        currency: "INR",
        name: "Payment razorpay",
        description: "Test Transaction",
        order_id: data.id,
        handler: function (response) {
          console.log('Payment successful', response);
          // Handle payment success (e.g., redirect or show success message)
        },
        prefill: {
          name: "Sapnadip Baidya",
          email: "sapnadip.baidya.official@gmail.com",
          contact: "8013687055",
        },
        theme: {
          color: "#3399cc",
        },
      };

      if (window.Razorpay) {
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      } else {
        console.error('Razorpay not loaded');
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  useEffect(() => {
    if (razorpayLoaded) {
      checkoutHandler("sapnadip", 29999);
    }
  }, [razorpayLoaded]);

  return (
    <div>
      {/* Load Razorpay script using next/script */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive" // Load after the page becomes interactive
        onLoad={() => {
          console.log('Razorpay script loading');
          setRazorpayLoaded(true);
        }}
        
        onReady={() => {
          console.log('Razorpay script loaded');
          setRazorpayLoaded(false);
        }}
        
      />

      {razorpayLoaded ? (
        <div><ThreeDotLoader/></div>
      ) : (
        <div>checkoutPageClient</div>
      )}
    </div>
  );
}

export default CheckoutPageClient;