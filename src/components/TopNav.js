import React, { useEffect, useState } from 'react';

const searchIcon = "https://res.cloudinary.com/production/image/upload/v1723572404/Icons/VIP/search.svg";

function Search({active, setSearchActive}) {
  const  navLinks = [
    {
      name: 'live',
      label: 'Live Now',
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
      name: 'nfl',
      label: 'NFL',
      icon: 'https://res.cloudinary.com/production/image/upload/v1725247268/Icons/VIP/nfl.svg',
    },
    {
      name: 'wnba',
      label: 'WNBA',
      icon: 'https://res.cloudinary.com/production/image/upload/v1725247268/Icons/VIP/wnba.svg',
    },
    {
      name: 'tennis',
      label: 'Tennis',
      icon: 'https://res.cloudinary.com/production/image/upload/v1725247265/Icons/VIP/tennis.svg',
    },
    {
      name: 'soccer',
      label: 'Soccer',
      icon: 'https://res.cloudinary.com/production/image/upload/v1725247268/Icons/VIP/soccer.svg',
    },
    {
      name: 'golf',
      label: 'Golf',
      icon: 'https://res.cloudinary.com/production/image/upload/v1725247265/Icons/VIP/golf.svg',
    },
    {
      name: 'nhl',
      label: 'NHL',
      icon: 'https://res.cloudinary.com/production/image/upload/v1725247267/Icons/VIP/nhl.svg',
    },
    {
      name: 'nba',
      label: 'NBA',
      icon: 'https://res.cloudinary.com/production/image/upload/v1725247267/Icons/VIP/nba.svg',
    },
    {
      name: 'ufc',
      label: 'UFC',
      icon: 'https://res.cloudinary.com/production/image/upload/v1725247266/Icons/VIP/ufc.svg',
    },
    {
      name: 'ncaa_football',
      label: 'NCAA Football',
      icon: 'https://res.cloudinary.com/production/image/upload/v1725247266/Icons/VIP/ncaa_football.svg',
    },
    {
      name: 'ncaa_basketball',
      label: 'NCAA Basketball',
      icon: 'https://res.cloudinary.com/production/image/upload/v1725247266/Icons/VIP/ncaa_basketball.svg',
    },
  ];
  const sports = [];
  return (
    <div className={`search-container ${!active ? 'closed' : ''}`}>
      <div className="search-header">
        <a className="go-back text-orange" onClick={(e) => setSearchActive(false)}>&lt; Back</a>
        <strong>Search</strong>
        <a className="close-search text-orange" onClick={(e) => setSearchActive(false)}>Close</a>
      </div>
      <div className="search-bar">
        <img src={searchIcon} alt="" />
        <input className="search-input" type="search" placeholder="Search" />
      </div>
      <div className="search-content-type">
        <button className={`btn-search-type`}>All Sports</button>
      </div>
      <div className="search-content">
        <ul className="main-nav-links">
          {navLinks.map(item => (
            <li className="nav-link-li">
              <a className="main-nav-link">
                <div className="main-nav-link-prefix">
                  {item.icon && <img src={item.icon} alt="" />}
                </div>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

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
      is_search: true,
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
  const [isSearchActive, setSearchActive] = useState(false);

  const onClick = (e, item) => {
    e.preventDefault();
    setActiveNav(item.name);
    if (item.is_search) {
      setSearchActive(true);
    }
    return false;
  };

  return (
    <div className="topnav-container">
      <div className="topnav-links">
        {navLinks.map(item => (
          <TopNavLink active={activeNav === item.name} item={item} key={item.name} onClick={onClick} />
        ))}
      </div>
      <Search active={isSearchActive} setSearchActive={setSearchActive} />
    </div>
  )
}