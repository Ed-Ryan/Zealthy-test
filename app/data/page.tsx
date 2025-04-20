
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface User {
  firstName: string;
  lastName: string;
}

export default function DataPage() {
  const [users, setUsers] = useState<User[]>([]); 
  const [totalUsers, setTotalUsers] = useState(0);


  const companies = [
    'Icelandair',
    'Wow Air',
    'Blue Lagoon',
    'Reykjavik Excursions',
    'Landsvirkjun',
    'Marel',
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/get-users');
        const data = await response.json();

        
        setUsers(data.users); 
        setTotalUsers(data.totalUsers); 
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUsers([]);         // fallback to avoid .map() on undefined
      setTotalUsers(0);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="data-page-container">
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
        <h1 className="header-title">User Dashboard</h1>
      </header>

      {/* Dashboard Stats */}
      <div className="dashboard-stats">
        <div className="stat-box">
          <h3>Total Users</h3>
          <p>{totalUsers}</p>
        </div>
        <div className="stat-box">
        <img src="/about-image.png" alt="Company Logo" className="company-logo" />
        </div>
        <div className="stat-box">
          <h3>Companies We Work With</h3>
          <ul>
            {companies.map((company, index) => (
              <li key={index}>{company}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* User Table */}
      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>Thank you for choosing us!</p>
        <p>&copy; 2025 Ed-Ryan Zealthy Onboarding Test</p>
      </footer>
    </div>
  );
}
