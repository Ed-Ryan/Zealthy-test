'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  const [showWaffleMenu, setShowWaffleMenu] = useState(false);
  
    const toggleWaffleMenu = () => {
      setShowWaffleMenu(!showWaffleMenu);
    };

  useEffect(() => {
    // Start countdown
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Redirect when countdown reaches 0
    if (countdown === 0) {
      clearInterval(interval);
      router.push('/');
    }

    return () => clearInterval(interval); // Cleanup interval
  }, [countdown, router]);

  return (
    <div className="success-container">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <a href="https://linkedin.com/in/edward-b-ryan" target="_blank" rel="noopener noreferrer">
            <img src="/linkedIn.png" alt="LinkedIn" className="header-icon" />
          </a>
          <a href="https://ed-ryan.github.io/" target="_blank" rel="noopener noreferrer">
            <img src="/github.png" alt="GitHub" className="header-icon" />
          </a>
        </div>
        <h1 className="header-title">User Onboarding App</h1>
        <div className="waffle-menu">
          <button className="waffle-icon" onClick={toggleWaffleMenu}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </button>
          {showWaffleMenu && (
            <div className="waffle-dropdown">
                <a href="/">Home</a>
                <a href="/admin">Admin</a>
                <a href="/data">Data</a>
            </div>
            )}
        </div>
      </header>

      {/* Main Content */}
      <div className="shadow-box">
        <h2>Thank You for Submitting!</h2>
        <p>You will be redirected to the home page in <span className="countdown">{countdown}</span> seconds.</p>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>Thank you for choosing us!</p>
        <p>&copy; 2025 User Onboarding App</p>
      </footer>
    </div>
  );
}
