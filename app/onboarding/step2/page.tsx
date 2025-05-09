
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Step2Page() {
  const router = useRouter();

  
  const [config, setConfig] = useState({ fullName: false, aboutMe: false, birthdate: false  });

  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    aboutMe: '',
    birthdate: '',
    email: '',
  });

  useEffect(() => {
    
    const fetchConfig = async () => {
      try {
        const response = await fetch('/api/get-config');
        const data = await response.json();
        setConfig(data.step2Config); 
      } catch (error) {
        console.error('Error fetching configuration:', error);
      }
    };

    fetchConfig();
  }, []);

  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const [showWaffleMenu, setShowWaffleMenu] = useState(false);
    
      const toggleWaffleMenu = () => {
        setShowWaffleMenu(!showWaffleMenu);
      };

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      
      const response = await fetch('/api/submit-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('User data saved successfully');
        router.push('/onboarding/step3'); 
      } else {
        console.error('Error saving user data:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting user data:', error);
    }
  };
  

  return (
    <div className="step2-container">
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
        <h2>Thank You for Choosing Us!</h2>
        <form onSubmit={handleSubmit} className="form">
          {/* Full Name Fields (Conditionally Rendered) */}
          {config.fullName && (
            <div className="form-group name-fields">
              <div>
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your last name"
                />
              </div><br></br>
              {config.birthdate && (
                <div>
                  <label htmlFor="birthdate">Birthdate:</label>
                  <input
                    type="date"
                    id="birthdate"
                    name="birthdate"
                    value={formData.birthdate}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your birthdate"
                  />
                </div>
              )}
            </div>
          )}

          {/* About Me Section (Conditionally Rendered) */}
          {config.aboutMe && (
            <div className="form-group">
              <label htmlFor="aboutMe">Tell us about yourself:</label>
              <textarea
                id="aboutMe"
                name="aboutMe"
                value={formData.aboutMe}
                onChange={handleInputChange}
                required
                placeholder="Write about yourself..."
                rows={5}
              />
            </div>
          )}

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
