'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function AdminPage() {
  // Default configuration for Step 2
  const defaultConfig = {
    fullName: true, // Default to requiring Full Name
    aboutMe: false, // Default to not requiring About Me
    birthdate: false,
  };

  const [step2Config, setStep2Config] = useState(defaultConfig);

  // Handle checkbox changes
  const handleCheckboxChange = (component: 'fullName' | 'aboutMe' | 'birthdate') => {
    setStep2Config((prevConfig) => ({
      ...prevConfig,
      [component]: !prevConfig[component],
    }));
  };

  const [showWaffleMenu, setShowWaffleMenu] = useState(false);
  
    const toggleWaffleMenu = () => {
      setShowWaffleMenu(!showWaffleMenu);
    };

    const handleSaveConfig = async () => {
      if (!step2Config.fullName && !step2Config.aboutMe) {
        alert('You must select at least one option for Step 2.');
        return;
      }
    
      try {
        const response = await fetch('/api/save-config', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ step2Config }),
        });
    
        if (response.ok) {
          alert('Configuration Saved!');
        } else {
          alert('Error saving configuration');
        }
      } catch (error) {
        console.error('Error saving configuration:', error);
        alert('Error saving configuration');
      }
    };
    

  return (
    <div className="admin-container">
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
                //<a href="/">Home</a>
                //<a href="/admin">Admin</a>
                //<a href="/data">Data</a>
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
        <h2>Admin Section</h2>
        <p>The second page of the onboarding process is currently the only page that allows for customization. You as an admin are allowed to change if we require the users full name and/or their about me section. This system will not allow you to leave the second page totally blank.</p>

        {/* Step 2 Configuration */}
        <div className="form-group checkbox-maker">
          <label>
            <input
              type="checkbox"
              checked={step2Config.fullName}
              onChange={() => handleCheckboxChange('fullName')}
            />
            Require Full Name (First and Last Name)
          </label>
          <label>
            <input
              type="checkbox"
              checked={step2Config.aboutMe}
              onChange={() => handleCheckboxChange('aboutMe')}
            />
            Require About Me Section
          </label>
          <label>
            <input
              type="checkbox"
              checked={step2Config.birthdate}
              onChange={() => handleCheckboxChange('birthdate')}
            />
            Require Birthdate
          </label>
        </div>

        <button className="submit-button" onClick={handleSaveConfig}>Save Configuration</button>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>Thank you for choosing us!</p>
        <p>&copy; 2025 Ed-Ryan Zealthy Onboarding Test</p>
      </footer>
    </div>
  );
}
