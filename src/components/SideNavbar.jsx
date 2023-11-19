import React from 'react';
import LogoutButton from './LogoutButton';

const SideNavbar = ({ onLogout }) => {
  return (
    <div className='logo'>
      <div className='headinng'>
        <h1>Logo</h1>
      </div>
      <div className="logout">
        <LogoutButton onLogout={onLogout} />
      </div>
    </div>
  );
}

export default SideNavbar;
