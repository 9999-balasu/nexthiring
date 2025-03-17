/*"use client";
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
}*/



/*"use client";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    Razorpay: new (options: object) => RazorpayInstance;
  }
}

interface RazorpayInstance {
  open: () => void;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export default function PaymentButton() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 500, currency: "INR" }),
      });

      const data = await res.json();
      if (!data.id) throw new Error("Failed to create payment");

      if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
        throw new Error("Razorpay Key ID is missing");
      }

      if (!window.Razorpay) {
        throw new Error("Razorpay SDK not loaded");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Your Company Name",
        description: "Payment for services",
        order_id: data.id,
        handler: (response: RazorpayResponse) => { // ✅ Correct type
          alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        },
        prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "9999999999",
        },
      };

      const razor = new window.Razorpay(options);
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
*/



"use client";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    Razorpay: new (options: object) => RazorpayInstance;
  }
}

interface RazorpayInstance {
  open: () => void;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export default function PaymentButton() {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState<number>(500);
  const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleTimeString());
  const [currentDate, setCurrentDate] = useState<string>(new Date().toLocaleDateString());
  const [currentDay, setCurrentDay] = useState<string>(new Date().toLocaleDateString("en-US", { weekday: "long" }));

  // Calculator State
  const [num1, setNum1] = useState<number | null>(null);
  const [num2, setNum2] = useState<number | null>(null);
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
      setCurrentDate(new Date().toLocaleDateString());
      setCurrentDay(new Date().toLocaleDateString("en-US", { weekday: "long" }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePayment = async () => {
    if (amount <= 0) {
      alert("Please enter a valid amount!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, currency: "INR" }),
      });

      const data = await res.json();
      if (!data.id) throw new Error("Failed to create payment");

      if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
        throw new Error("Razorpay Key ID is missing");
      }

      if (!window.Razorpay) {
        throw new Error("Razorpay SDK not loaded");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Your Company Name",
        description: "Payment for services",
        order_id: data.id,
        handler: (response: RazorpayResponse) => {
          alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        },
        prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "9999999999",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Calculator Functions
  const calculate = (operator: string) => {
    if (num1 === null || num2 === null) {
      alert("Please enter valid numbers.");
      return;
    }
    let res = 0;
    switch (operator) {
      case "+":
        res = num1 + num2;
        break;
      case "-":
        res = num1 - num2;
        break;
      case "*":
        res = num1 * num2;
        break;
      case "/":
        res = num2 !== 0 ? num1 / num2 : NaN;
        break;
    }
    setResult(res);
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg shadow-lg w-80">
      {/* Date & Time Section */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Current Date & Time</h2>
        <p>{currentDay}, {currentDate}</p>
        <p>{currentTime}</p>
      </div>

      {/* Payment Calculator */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Payment Calculator</h2>
        <label className="block mb-2">
          Enter Amount (INR):
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full mt-1 p-2 text-black rounded-md"
            min="1"
          />
        </label>
        <button 
          onClick={handlePayment} 
          className="w-full mt-3 px-4 py-2 bg-blue-600 text-white font-bold rounded-lg"
          disabled={loading}
        >
          {loading ? "Processing..." : `Pay ₹${amount}`}
        </button>
      </div>

      {/* Simple Calculator */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Simple Calculator</h2>
        <div className="flex space-x-2 mb-2">
          <input
            type="number"
            placeholder="Num 1"
            value={num1 ?? ""}
            onChange={(e) => setNum1(Number(e.target.value))}
            className="w-1/2 p-2 text-black rounded-md"
          />
          <input
            type="number"
            placeholder="Num 2"
            value={num2 ?? ""}
            onChange={(e) => setNum2(Number(e.target.value))}
            className="w-1/2 p-2 text-black rounded-md"
          />
        </div>
        <div className="flex space-x-2">
          <button onClick={() => calculate("+")} className="px-3 py-1 bg-green-500 rounded-md">+</button>
          <button onClick={() => calculate("-")} className="px-3 py-1 bg-red-500 rounded-md">-</button>
          <button onClick={() => calculate("*")} className="px-3 py-1 bg-blue-500 rounded-md">*</button>
          <button onClick={() => calculate("/")} className="px-3 py-1 bg-yellow-500 rounded-md">/</button>
        </div>
        {result !== null && <p className="mt-2">Result: {result}</p>}
      </div>
    </div>
  );
}

