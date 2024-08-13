import React, { useEffect, useState } from 'react';

function TopNavLink({active, item, onClick}) {
  return (
    <a href="/" className={`topnav-link ${active && !item.cannot_active ? 'active' : ''}`} onClick={(e) => onClick(e, item)}>
      {item.icon && <img src={item.icon} alt="" />}
      <span>{item.label}</span>
    </a>
  )
}

export default function TopNav() {
  const navLinks = [
    {
      name: 'all',
      label: 'All',
      icon: 'https://res.cloudinary.com/production/image/upload/v1723572404/Icons/VIP/search.svg',
      cannot_active: true,
    },
    {
      name: 'live',
      label: 'Live',
      icon: '',
    },
    {
      name: 'promos',
      label: 'Promos',
      icon: 'https://res.cloudinary.com/production/image/upload/v1723572404/Icons/VIP/promos.svg',
    },
    {
      name: 'boosts',
      label: 'Boosts',
      icon: 'https://res.cloudinary.com/production/image/upload/v1723572405/Icons/VIP/boosts.svg',
    },
    {
      name: 'mlb',
      label: 'MLB',
      icon: 'https://res.cloudinary.com/production/image/upload/v1723572404/Icons/VIP/mlb.svg',
    },
    {
      name: 'ncaaf',
      label: 'NCAAF',
      icon: '',
    },
    {
      name: 'ncaab',
      label: 'NCAAB',
      icon: '',
    },
    {
      name: 'nhl',
      label: 'NHL',
      icon: '',
    },
  ];
  const [activeNav, setActiveNav] = useState(null);

  const onClick = (e, item) => {
    e.preventDefault();
    setActiveNav(item.name);
    return false;
  };

  return (
    <div className="topnav-container">
      <div className="topnav-links">
        {navLinks.map(item => (
          <TopNavLink active={activeNav === item.name} item={item} key={item.name} onClick={onClick} />
        ))}
      </div>
    </div>
  )
}