"use client";

import { useState, useEffect } from "react";

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);
  const [rzpLoaded, setRzpLoaded] = useState(false);

  // Load Razorpay script manually (Fix for Next.js 16)
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setRzpLoaded(true);
    script.onerror = () => {
      alert("Failed to load Razorpay SDK ❌");
    };
    document.body.appendChild(script);
  }, []);

  const startPayment = async () => {
    try {
      if (!rzpLoaded) {
        alert("Razorpay SDK not loaded yet ❌");
        return;
      }

      setLoading(true);

      // 1️⃣ Create Order (Backend API)
      const orderResponse = await fetch(
        "http://localhost:5000/api/payment/create-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: 1 }), // ₹500
        }
      );

      const data = await orderResponse.json();

      if (!data.success) {
        alert("Failed to create order ❌");
        setLoading(false);
        return;
      }

      const order = data.order;

      // 2️⃣ Razorpay Checkout Options
      const options: any = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Mallesh Store",
        description: "Amazon Style Payment",
        order_id: order.id,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/4/44/Razorpay_logo.svg",

        handler: async (response: any) => {
          // 3️⃣ Verify Payment
          const verifyRes = await fetch(
            "http://localhost:5000/api/payment/verify-payment",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            }
          );

          const verifyJson = await verifyRes.json();

          if (verifyJson.success) {
            alert("Payment Successful 🎉");
          } else {
            alert("Payment Verification Failed ❌");
          }
        },

        theme: { color: "#4F46E5" },

        method: {
          upi: true,
          card: true,
          wallet: true,
          netbanking: true,
          qr: true,
        },

        modal: {
          ondismiss: () => alert("Payment Cancelled"),
        },
      };

      // 4️⃣ Open Razorpay Payment Popup
      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();

      setLoading(false);
    } catch (err) {
      console.error("❌ Backend Not Connected:", err);
      setLoading(false);
      alert("Backend Not Connected ❌");
    }
  };

  // UI
 return (
  <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-5">
    <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-10 w-full max-w-md text-white transition-all duration-300">

      <div className="flex flex-col items-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Razorpay_logo.svg/960px-Razorpay_logo.svg.png?20171127075036"
          className="w-28 mb-6 drop-shadow-xl"
        />

        <h1 className="text-3xl font-extrabold tracking-wide mb-3">
          Secure Payment
        </h1>

        <p className="text-white/80 text-center mb-8">
          Pay using UPI, Cards, Wallets, NetBanking or Scan & Pay.
        </p>
      </div>

      <div className="bg-white/20 backdrop-blur-md rounded-2xl border border-white/20 p-6 mb-8">
        <div className="flex justify-between text-lg mb-2">
          <span className="font-medium">Amount</span>
          <span className="font-bold">₹1</span>
        </div>

        <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-yellow-300 to-yellow-500 w-full"></div>
        </div>
      </div>

      <button
        onClick={startPayment}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-xl font-bold shadow-[0_0_15px_rgba(255,224,102,0.8)] hover:shadow-[0_0_25px_rgba(255,224,102,1)] transition-all duration-300"
      >
        {loading ? "Processing..." : "💳 Pay Securely ₹1"}
      </button>

      <p className="text-center text-white/70 text-sm mt-5">
        🔒 100% Safe & Secure Payments
      </p>
    </div>
  </div>
);

}
