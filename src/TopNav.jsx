import React, { useState } from 'react';
import './TopNav.css'; // Ensure this CSS file is created as well

function TopNav() {
  const [navItems, setNavItems] = useState([
    { id: 1, name: 'cpm', type: 'text' },
    { id: 2, name: 'cwpp', type: 'text' },
    { id: 3, name: 'image', type: 'image', src: '/path/to/your/image.jpg' }, // Update with the correct path
    { id: 4, name: 'tickets', type: 'text' },
  ]);

  const handleSwap = (index1, index2) => {
    const updatedItems = [...navItems];
    [updatedItems[index1], updatedItems[index2]] = [updatedItems[index2], updatedItems[index1]];
    setNavItems(updatedItems);
  };

  return (
    <div className="top-nav">
      {navItems.map((item, index) => (
        <div key={item.id} className="nav-item">
          {item.type === 'text' && <span>{item.name}</span>}
          {item.type === 'image' && <img src={item.src} alt={item.name} />}
          <button 
            onClick={() => handleSwap(index, index === 0 ? navItems.length - 1 : index - 1)}
            className="swap-button"
          >
            Swap Left
          </button>
          <button 
            onClick={() => handleSwap(index, index === navItems.length - 1 ? 0 : index + 1)}
            className="swap-button"
          >
            Swap Right
          </button>
        </div>
      ))}
    </div>
  );
}

export default TopNav;
