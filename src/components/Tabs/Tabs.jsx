import React, { useState } from 'react';
import './Tabs.css';

const Tabs = ({ items }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        {items.map((item, index) => (
          <button
            key={index}
            className={`tab-button ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {item.title}
          </button>
        ))}
      </div>
      <div className="tab-content active">
        {items[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;