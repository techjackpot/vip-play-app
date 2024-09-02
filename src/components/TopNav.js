import React, { useEffect, useState } from 'react';

const searchIcon = "https://res.cloudinary.com/production/image/upload/v1723572404/Icons/VIP/search.svg";

function SearchContentLinkItem({item}) {
  const [isOpened, setOpened] = useState(false);
  return (
    <li className={`nav-link-li ${isOpened ? 'opened' : ''}`}>
      <a className="main-nav-link" onClick={() => setOpened(!isOpened)}>
        <div className="main-nav-link-prefix">
          {item.icon && <img src={item.icon} alt="" />}
        </div>
        {item.label}
        {item.has_more && <span className="caret">&gt;</span>}
      </a>
      {item.has_more && <SearchContentLinks links={item.children} total_count={item.total_count} />}
    </li>
  )
}
function SearchContentLinks({links, total_count}) {
  return (
    <ul className="main-nav-links">
      {links.map(item => <SearchContentLinkItem item={item} key={item.name} />)}
      {total_count > 0 && (
        <li className="nav-link-li total_count">
          <a className="main-nav-link">View All ({total_count})</a>
        </li>
      )}
    </ul>
  )
}

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
      has_more: true,
      children: [
        {
          name: 'atp_montreal',
          label: 'ATP Montreal',
          icon: 'https://res.cloudinary.com/production/image/upload/v1725267834/Icons/VIP/tennis-atp.svg',
        },
        {
          name: 'wta_toronto',
          label: 'WTA Toronto',
          icon: 'https://res.cloudinary.com/production/image/upload/v1725267834/Icons/VIP/tennis-wta.svg',
        },
      ],
    },
    {
      name: 'soccer',
      label: 'Soccer',
      icon: 'https://res.cloudinary.com/production/image/upload/v1725247268/Icons/VIP/soccer.svg',
      has_more: true,
      total_count: 30,
      children: [
        {
          name: 'italy-coppa_italia',
          label: 'Italy - Coppa Italia',
          icon: 'https://res.cloudinary.com/production/image/upload/v1725267833/Icons/VIP/soccer-italy.svg',
        },
        {
          name: 'leagues_cup',
          label: 'Leagues Cup',
          icon: 'https://res.cloudinary.com/production/image/upload/v1725267833/Icons/VIP/soccer-leagues.svg',
        },
        {
          name: 'england-championship',
          label: 'England - Championship',
          icon: 'https://res.cloudinary.com/production/image/upload/v1725267832/Icons/VIP/soccer-england.svg',
        },
        {
          name: 'argentina-liga_professional',
          label: 'Argentina - Liga Professional',
          icon: 'https://res.cloudinary.com/production/image/upload/v1725267832/Icons/VIP/soccer-argentina.svg',
        },
        {
          name: 'usa-mls',
          label: 'USA - MLS',
          icon: 'https://res.cloudinary.com/production/image/upload/v1725267834/Icons/VIP/soccer-usa.svg',
        },
      ],
    },
    {
      name: 'golf',
      label: 'Golf',
      icon: 'https://res.cloudinary.com/production/image/upload/v1725247265/Icons/VIP/golf.svg',
      has_more: true,
      total_count: 15,
      children: [
        {
          name: 'fedex_st',
          label: 'Fedex St. Jude Championship',
          icon: 'https://res.cloudinary.com/production/image/upload/v1725267830/Icons/VIP/golf-fedex.svg',
        },
        {
          name: 'liv_golf_tour',
          label: 'LIV Golf Tour - Greenbrier',
          icon: 'https://res.cloudinary.com/production/image/upload/v1725267831/Icons/VIP/golf-liv.svg',
        },
        {
          name: 'dd_real',
          label: 'D+D Real Czech Masters',
          icon: 'https://res.cloudinary.com/production/image/upload/v1725267829/Icons/VIP/golf-dd.svg',
        },
        {
          name: 'solheim_cup',
          label: 'Solheim Cup',
          icon: 'https://res.cloudinary.com/production/image/upload/v1725267831/Icons/VIP/golf-solheim.svg',
        },
      ],
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
  const sports = [
    {
      name: 'aussie_rules',
      label: 'Aussie Rules',
      icon: 'https://res.cloudinary.com/production/image/upload/v1725267827/Icons/VIP/aussie_rules.svg',
    },
    {
      name: 'baseball',
      label: 'Baseball',
      icon: 'https://res.cloudinary.com/production/image/upload/v1725268000/Icons/VIP/s-baseball.svg',
    },
    {
      name: 'basketball',
      label: 'Basketball',
      icon: 'https://res.cloudinary.com/production/image/upload/v1725267827/Icons/VIP/basketball.svg',
    },
    {
      name: 'boxing',
      label: 'Boxing',
      icon: 'https://res.cloudinary.com/production/image/upload/v1725267827/Icons/VIP/boxing.svg',
    },
    {
      name: 'cricket',
      label: 'Cricket',
      icon: 'https://res.cloudinary.com/production/image/upload/v1725267827/Icons/VIP/cricket.svg',
    },
    {
      name: 'cycling',
      label: 'Cycling',
      icon: 'https://res.cloudinary.com/production/image/upload/v1725267828/Icons/VIP/cycling.svg',
    },
    {
      name: 'darts',
      label: 'Darts',
      icon: 'https://res.cloudinary.com/production/image/upload/v1725267829/Icons/VIP/darts.svg',
    },
    {
      name: 'football',
      label: 'Football',
      icon: 'https://res.cloudinary.com/production/image/upload/v1725267829/Icons/VIP/football.svg',
    },
    {
      name: 'golf',
      label: 'Golf',
      icon: 'https://res.cloudinary.com/production/image/upload/v1725247265/Icons/VIP/golf.svg',
      has_more: true,
      total_count: 15,
      children: [
        {
          name: 'fedex_st',
          label: 'Fedex St. Jude Championship',
          icon: 'https://res.cloudinary.com/production/image/upload/v1725267830/Icons/VIP/golf-fedex.svg',
        },
        {
          name: 'liv_golf_tour',
          label: 'LIV Golf Tour - Greenbrier',
          icon: 'https://res.cloudinary.com/production/image/upload/v1725267831/Icons/VIP/golf-liv.svg',
        },
        {
          name: 'dd_real',
          label: 'D+D Real Czech Masters',
          icon: 'https://res.cloudinary.com/production/image/upload/v1725267829/Icons/VIP/golf-dd.svg',
        },
        {
          name: 'solheim_cup',
          label: 'Solheim Cup',
          icon: 'https://res.cloudinary.com/production/image/upload/v1725267831/Icons/VIP/golf-solheim.svg',
        },
      ],
    },
    {
      name: 'hockey',
      label: 'Hockey',
      icon: 'https://res.cloudinary.com/production/image/upload/v1725267827/Icons/VIP/hockey.svg',
    },
    {
      name: 'lacrosse',
      label: 'Lacrosse',
      icon: 'https://res.cloudinary.com/production/image/upload/v1725267827/Icons/VIP/lacrosse.svg',
    },
    {
      name: 'mma',
      label: 'MMA',
      icon: 'https://res.cloudinary.com/production/image/upload/v1725267828/Icons/VIP/mma.svg',
    },
    {
      name: 'motorsports',
      label: 'Motorsports',
      icon: 'https://res.cloudinary.com/production/image/upload/v1725267829/Icons/VIP/motorsports.svg',
    },
    {
      name: 'rugby_league',
      label: 'Rugby League',
      icon: 'https://res.cloudinary.com/production/image/upload/v1725267830/Icons/VIP/rugby_league.svg',
    },
    {
      name: 'rugby_union',
      label: 'Rugby Union',
      icon: 'https://res.cloudinary.com/production/image/upload/v1725267831/Icons/VIP/rugby_union.svg',
    },
    {
      name: 'snooker',
      label: 'Snooker',
      icon: 'https://res.cloudinary.com/production/image/upload/v1725267832/Icons/VIP/snooker.svg',
    },
    {
      name: 'soccer',
      label: 'Soccer',
      icon: 'https://res.cloudinary.com/production/image/upload/v1725247268/Icons/VIP/soccer.svg',
      has_more: true,
      total_count: 30,
      children: [
        {
          name: 'italy-coppa_italia',
          label: 'Italy - Coppa Italia',
          icon: 'https://res.cloudinary.com/production/image/upload/v1725267833/Icons/VIP/soccer-italy.svg',
        },
        {
          name: 'leagues_cup',
          label: 'Leagues Cup',
          icon: 'https://res.cloudinary.com/production/image/upload/v1725267833/Icons/VIP/soccer-leagues.svg',
        },
        {
          name: 'england-championship',
          label: 'England - Championship',
          icon: 'https://res.cloudinary.com/production/image/upload/v1725267832/Icons/VIP/soccer-england.svg',
        },
        {
          name: 'argentina-liga_professional',
          label: 'Argentina - Liga Professional',
          icon: 'https://res.cloudinary.com/production/image/upload/v1725267832/Icons/VIP/soccer-argentina.svg',
        },
        {
          name: 'usa-mls',
          label: 'USA - MLS',
          icon: 'https://res.cloudinary.com/production/image/upload/v1725267834/Icons/VIP/soccer-usa.svg',
        },
      ],
    },
    {
      name: 'tennis',
      label: 'Tennis',
      icon: 'https://res.cloudinary.com/production/image/upload/v1725247265/Icons/VIP/tennis.svg',
      has_more: true,
      children: [
        {
          name: 'atp_montreal',
          label: 'ATP Montreal',
          icon: 'https://res.cloudinary.com/production/image/upload/v1725267834/Icons/VIP/tennis-atp.svg',
        },
        {
          name: 'wta_toronto',
          label: 'WTA Toronto',
          icon: 'https://res.cloudinary.com/production/image/upload/v1725267834/Icons/VIP/tennis-wta.svg',
        },
      ],
    },
  ];

  const [searchType, setSearchType] = useState('favorites');
  const [isSearchFocus, setSearchFocus] = useState(false);
  const toggleSearchType = () => {
    if (searchType == 'all-sports') {
      setSearchType('favorites');
    } else if (searchType == 'favorites') {
      setSearchType('all-sports');
    }
  };

  return (
    <div className={`search-container ${!active ? 'closed' : ''}`}>
      <div className="search-header">
        <a className="go-back text-orange" onClick={(e) => setSearchActive(false)}>&lt; Back</a>
        <strong>Search</strong>
        <a className="close-search text-orange" onClick={(e) => setSearchActive(false)}>Close</a>
      </div>
      <div className="search-bar">
        <img src={searchIcon} alt="" />
        <input className="search-input" type="search" placeholder="Search" onFocus={() => setSearchFocus(true)} onBlur={() => setSearchFocus(false)} />
      </div>
      {isSearchFocus ? (
        <div className="search-result">
          <div className="search-trending">
            <div>
              <img src="https://res.cloudinary.com/production/image/upload/v1725288663/Icons/VIP/trending.svg" alt="Trending" />
              &nbsp;&nbsp;Trending
            </div>
            <div className="trending-keywords">
              <span>DRIVE PARLEYS</span>
              <span>NHL</span>
              <span>NCAAF</span>
              <span>GAME LINES</span>
              <span>LIVE TO SCORERS</span>
              <span>Aaron Judge</span>
            </div>
          </div>
          <div className="search-recent">
            <div>
              <img src="https://res.cloudinary.com/production/image/upload/v1725288663/Icons/VIP/recent-search.svg" alt="Recent Searches" />
              &nbsp;&nbsp;Recent Searches
            </div>
            <div className="recent-search-items">
              <div className="recent-search-item">
                <span>Tennis</span><span className="delete">&times;</span>
              </div>
              <div className="recent-search-item">
                <span>soce</span><span className="delete">&times;</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="search-content-type">
            <button className={`btn-search-type ${searchType}`} onClick={(e) => toggleSearchType()}>All Sports</button>
          </div>
          <div className="search-content">
            {searchType == 'favorites' && <SearchContentLinks links={navLinks} /> }
            {searchType == 'all-sports' && <SearchContentLinks links={sports} /> }
          </div>
        </>
      )}
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