/*"use client";

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
}*/


/*"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface NavbarProps {
  onNavigate: (section: string) => void;
}

export default function Navbar({ onNavigate }: NavbarProps) {
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
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold">Hiring Platform</h1>
      
      <div className="space-x-4">
        <button onClick={() => onNavigate("jobBoard")} className="hover:underline">
          Job Board
        </button>
        <button onClick={() => onNavigate("resumeBoard")} className="hover:underline">
          Resume Board
        </button>
        <button onClick={() => onNavigate("candidates")} className="hover:underline">
          Candidates
        </button>
        <button onClick={() => onNavigate("videoInterview")} className="hover:underline">
          Video Interview
        </button>
        <button onClick={() => onNavigate("payment")} className="hover:underline">
          Payment
        </button>
      </div>

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
*/


/*"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface NavbarProps {
  onNavigate: (section: string) => void;
}

export default function Navbar({ onNavigate }: NavbarProps) {
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
      <div className="flex gap-4">
        <button onClick={() => onNavigate("job-board")}>Job Board</button>
        <button onClick={() => onNavigate("resume-board")}>Resume Board</button>
        <button onClick={() => onNavigate("applications")}>Applications</button>
        <button onClick={() => onNavigate("job-search")}>Job Search</button>
        <button onClick={() => onNavigate("profile")}>Profile</button>
        <button onClick={() => onNavigate("interview")}>Interview</button>
        <button onClick={() => onNavigate("payment")}>Payment</button>
        {!isAuthenticated ? (
          <>
            <button onClick={() => router.push("/register")}>Register</button>
            <button onClick={() => router.push("/login")}>Login</button>
          </>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
}
*/


"use client";
import { useRouter } from "next/navigation";

interface NavbarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
  onNavigate: (section: string) => void;
}

export default function Navbar({ isAuthenticated, onLogout, onNavigate }: NavbarProps) {
  const router = useRouter();

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <h1 className="text-lg font-semibold">Hiring Platform</h1>
      <div className="flex gap-4">
        <button onClick={() => onNavigate("home")}>Home</button>
        
        {!isAuthenticated ? (
          <>
            <button onClick={() => router.push("/register")}>Register</button>
            <button onClick={() => router.push("/login")}>Login</button>
          </>
        ) : (
          <button onClick={onLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
}

