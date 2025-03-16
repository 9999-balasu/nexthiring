"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    router.push("/");
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <h1 className="text-lg font-semibold">Hiring Platform</h1>
      <div>
        {!isAuthenticated ? (
          <>
            <button className="mr-4" onClick={() => router.push("/register")}>
              Register
            </button>
            <button onClick={() => router.push("/login")}>Login</button>
          </>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
}
