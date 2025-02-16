"use client";
import { checkout } from '@/utils/API_lib';
import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import ThreeDotLoader from '../loaders/threeDotLoader';

function CheckoutPageClient({ onClose }) {
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [paymentInitialized, setPaymentInitialized] = useState(false);

  const checkoutHandler = async (name, amount) => {
    try {
      const { success, data } = await checkout({ name, amount });
      if (!success || !data) {
        console.error('Checkout failed');
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        name: "Payment Razorpay",
        description: "Test Transaction",
        order_id: data.id,
        handler: function (response) {
          console.log('Payment successful', response);
          onClose();
        },
        prefill: {
          name: "Sapnadip Baidya",
          email: "sapnadip.baidya.official@gmail.com",
          contact: "8013687055",
        },
        theme: {
          color: "#3399cc",
        },
        modal: {
          ondismiss: function () {
            console.log('Modal dismissed');
            setPaymentInitialized(false);
            onClose();
          }
        }
      };

      if (window.Razorpay) {
        const rzp1 = new window.Razorpay(options);

        rzp1.on('payment.failed', function (response) {
          console.error('Payment failed', response);
          onClose();
        });

        rzp1.open();
      } else {
        console.error('Razorpay not loaded');
      }
    } catch (error) {
      console.error("Checkout error:", error);
      onClose();
    }
  };

  useEffect(() => {
    if (window.Razorpay && !paymentInitialized) {
      checkoutHandler("sapnadip", 1);
      setPaymentInitialized(true);
    }
  }, [razorpayLoaded, paymentInitialized]);

  // Reset body overflow when component unmounts
  useEffect(() => {
    return () => {
      setPaymentInitialized(false);
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
        onLoad={() => {
          setRazorpayLoaded(true);
        }}
      />
      {!razorpayLoaded && <div style={{marginTop:"5vh"}}><ThreeDotLoader /></div>}
    </div>
  );
}

export default CheckoutPageClient;