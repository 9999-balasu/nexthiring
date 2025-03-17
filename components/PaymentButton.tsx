"use client";
import { useState } from "react";

export default function PaymentButton() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        body: JSON.stringify({ amount: 500, currency: "INR" }), // Change amount as needed
      });

      const data = await res.json();
      if (!data.id) throw new Error("Failed to create payment");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: data.amount,
        currency: data.currency,
        name: "Your Company Name",
        description: "Payment for services",
        order_id: data.id,
        handler: (response: any) => {
          alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
        },
        prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "9999999999",
        },
      };

      const razor = new (window as any).Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handlePayment} 
      className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg"
      disabled={loading}
    >
      {loading ? "Processing..." : "Pay Now"}
    </button>
  );
}
