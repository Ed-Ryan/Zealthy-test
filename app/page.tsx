
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [showWaffleMenu, setShowWaffleMenu] = useState(false);

  const toggleWaffleMenu = () => {
    setShowWaffleMenu(!showWaffleMenu);
  };

  return (
    <div className="home-container">
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

      {/* Message */}
      <div className="little-message">
        <span>The process you as a user will take for onboarding!</span>
      </div>
      {/* Bubbles Section */}
      <div className="bubbles-section">
        <div className="bubble">
          <h2>Email and Password</h2>
          <img
            src="/step1.png" // Replace with actual image URL
            alt="Email and Password"
            className="bubble-image"
          />
          <div className="hover-text">The user must first enter their email address and account password. If the provided email address already exists in the database, a notification will be sent to the user.</div>
        </div>
        <div className="bubble">
          <h2>Getting to Know You</h2>
          <img
            src="/step2.png" // Replace with actual image URL
            alt="Getting to Know You"
            className="bubble-image"
          />
          <div className="hover-text">The user will be required to provide a brief description of themselves to help other users learn more about them.</div>
        </div>
        <div className="bubble">
          <h2>Personal Identification</h2>
          <img
            src="/step3.png" // Replace with actual image URL
            alt="Personal Identification"
            className="bubble-image"
          />
          <div className="hover-text">The user will complete their contact information by providing details such as their name and address.</div>
        </div>
      </div>

      {/* Start Onboarding Button */}
      <div className="welcome-content">
        <a href="/onboarding" className="welcome-button">
          Start Onboarding
        </a>
      </div>

      {/* About Us Section */}
      <div className="about-us-section">
        <div className="about-us-text">
            <h2>About Us</h2>
            <p>Founded in 1692 in the windswept highlands of Northern Scotland, <span className="company-name">User Onboarding Form</span> has long been at the vanguard of user integration and data collection—centuries before digital systems even existed. What began as a humble effort to record and organize community information has evolved into a mission-driven enterprise dedicated to streamlining user onboarding processes. From quill and parchment to dynamic digital platforms, our heritage of meticulous record-keeping and structured data intake has remained the cornerstone of our operations.<br></br>
            <br></br>Our origins are as storied as they are strategic. Traversing the rugged North Atlantic aboard Viking ships, our early pioneers carried more than cargo—they carried a vision of connection. As they moved from village to village, collecting stories, names, and places, they laid the groundwork for today's user experience principles. Their journey ultimately brought them to the shores of what is now modern-day Iceland, where our founders established a lasting settlement and, unknowingly, a legacy. Today, <span className="company-name">User Onboarding Form</span> honors this legacy by enabling users to seamlessly enter their information—names, addresses, personal insights—into systems designed to foster engagement, trust, and continuity.</p>
        </div>
        <img
            src="/about-image.png"
            alt="About Us"
            className="about-us-image"
        />
      </div>


      {/* Footer */}
      <footer className="footer">
        <p>Thank you for choosing us!</p>
        <p>&copy; 2025 Ed-Ryan Zealthy Onboarding Test</p>
      </footer>
    </div>
  );
}
