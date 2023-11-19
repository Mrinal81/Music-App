import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); 
    navigate('/login'); 
  };

  return (
    <div className="logout">
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogoutButton;
