

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EmailPasswordPage() {
  const router = useRouter();

  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [emailExists, setEmailExists] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [showWaffleMenu, setShowWaffleMenu] = useState(false);

  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  
  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevData) => ({ ...prevData, password: value }));

    
    const errors = [];
    if (value.length < 8) errors.push("Must be at least 8 characters long.");
    if (!/[A-Z]/.test(value)) errors.push("Must include an uppercase letter.");
    if (!/[a-z]/.test(value)) errors.push("Must include a lowercase letter.");
    if (!/\d/.test(value)) errors.push("Must include a number.");
    if (!/[@#$%^&+=!]/.test(value)) errors.push("Must include a symbol.");

    setPasswordErrors(errors);
  };

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    
    const response = await fetch('/api/check-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: formData.email }),
    });
    const data = await response.json();

    if (data.emailExists) {
      setEmailExists(true);
    } else {
      setEmailExists(false);
      router.push('/onboarding/step2');
    }
  };

  const toggleWaffleMenu = () => {
    setShowWaffleMenu(!showWaffleMenu);
  };

  return (
    <div className="email-password-container">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <Link href="https://linkedin.com/in/edward-b-ryan" target="_blank" rel="noopener noreferrer">
            <img src="/linkedIn.png" alt="LinkedIn" className="header-icon" />
          </Link>
          <Link href="https://ed-ryan.github.io/" target="_blank" rel="noopener noreferrer">
            <img src="/github.png" alt="GitHub" className="header-icon" />
          </Link>
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
              <Link href="/">Home</Link>
              <Link href="/admin">Admin</Link>
              <Link href="/data">Data</Link>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="shadow-box">
        <img src="/about-image.png" alt="Company Logo" className="company-logo" />
        <h2>Thank you for choosing <span className="company-name">User Onboarding Form</span>!</h2>
        {emailExists && <p className="error-message">Email already exists</p>}
        <form onSubmit={handleSubmit} className="form">
          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handlePasswordInput}
              required
              placeholder="Enter password"
            />
            {passwordErrors.length > 0 && (
              <div className="error-message">
                {passwordErrors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
          </div>

          {/* Next Button */}
          <button type="submit" className="next-button">Next</button>
        </form>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>Thank you for choosing us!</p>
        <p>&copy; 2025 Ed-Ryan Zealthy Onboarding Test</p>
      </footer>
    </div>
  );
}
