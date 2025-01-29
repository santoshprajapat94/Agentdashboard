import React from 'react';

function HeaderTabs({
  title, data, stats, icon, bgColor,
}) {
  return (
    <div style={{ background: bgColor, alignItems: 'flex-start' }} className="header-cards-item">
      <img src={icon} alt={title} />
      <div className="header-cards-item-content">
        <span className="header-content-data">{data}</span>
        <span className="header-content-title">{title}</span>
      </div>
      {/* <span className='status-badge'>{stats}</span> */}
    </div>
  );
}

export default HeaderTabs;
