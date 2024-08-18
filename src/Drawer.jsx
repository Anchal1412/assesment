import React from 'react';
import './Drawer.css'; 
import TopNav from './TopNav';

function Drawer({ isOpen, onClose, onConfirm }) {
  return (
    <div className={`drawer ${isOpen ? 'open' : ''}`}>
      <div className="drawer-content">
        <button className="drawer-button confirm" onClick={onConfirm}>
          Confirm
        </button>
        <button className="drawer-button cancel" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Drawer;
