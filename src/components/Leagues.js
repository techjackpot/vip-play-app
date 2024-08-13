import React, { useEffect, useState } from 'react';

import EventsList from './EventsList';

export default function LeaguesComponent({children}) {
  const leagues = [
    {
      path: 'listView/baseball/mlb/all/all/matches.json?lang=en_GB&market=GB&includeParticipants=false&useCombined=true&useCombinedLive=true',
      sport: 'BASEBALL',
      sport_code: 'baseball',
      group: 'MLB',
      group_code: 'mlb',
      label: 'MLB',
      heading: 'MLB',
      subheading: 'Today',
      max: 10,
      name: 'baseball/mlb',
      href: 'baseball-mlb',
      icon: 'https://res.cloudinary.com/production/image/upload/v1723538992/Icons/VIP/baseball.svg',
    },
    {
      path: 'listView/american_football/ncaaf/all/all/matches.json?lang=en_GB&market=GB&includeParticipants=false&useCombined=true&useCombinedLive=true',
      sport: 'AMERICAN_FOOTBALL',
      sport_code: 'american_football',
      group: 'NCAAF',
      group_code: 'ncaaf',
      label: 'NCAAF',
      heading: 'American Football / NCAAF',
      subheading: 'Today',
      max: 3,
      name: 'american_football/ncaaf',
      href: 'american_football-ncaaf',
    },
    {
      path: 'listView/american_football/nfl/all/all/matches.json?lang=en_GB&market=GB&includeParticipants=false&useCombined=true&useCombinedLive=true',
      sport: 'AMERICAN_FOOTBALL',
      sport_code: 'american_football',
      group: 'NFL',
      group_code: 'nfl',
      label: 'NFL',
      heading: 'American Football / NFL',
      subheading: 'Today',
      max: 3,
      name: 'american_football/nfl',
      href: 'american_football-nfl',
    },
    {
      path: 'listView/baseball/all/all/matches.json?lang=en_GB&market=GB&includeParticipants=false&useCombined=true&useCombinedLive=true',
      sport: 'BASKETBALL',
      sport_code: 'basketball',
      group: 'NBA',
      group_code: 'nba',
      label: 'NBA',
      heading: 'NBA',
      subheading: 'Today',
      max: 3,
      name: 'basketball/nba',
      href: 'basketball-nba',
    },
    {
      path: 'listView/football/usa/mls/all/matches.json?lang=en_GB&market=GB&includeParticipants=false&useCombined=true&useCombinedLive=true',
      sport: 'FOOTBALL',
      sport_code: 'football',
      group: 'MLS',
      group_code: 'mls',
      label: 'MLS',
      heading: 'Football / USA / MLS',
      subheading: 'Today',
      max: 3,
      name: 'football/usa/mls',
      href: 'football-usa-mls',
    },
    {
      path: 'listView/football/england/premier_league/all/matches.json?lang=en_GB&market=GB&includeParticipants=false&useCombined=true&useCombinedLive=true',
      sport: 'FOOTBALL',
      sport_code: 'football',
      group: 'Premier League',
      group_code: 'premier_league',
      label: 'Premier League',
      heading: 'Football / England / Premier League',
      subheading: 'Today',
      max: 3,
      name: 'football/england/premier_league',
      href: 'football-england-premier_league',
    },
    {
      path: 'listView/football/spain/la_liga/all/matches.json?lang=en_GB&market=GB&includeParticipants=false&useCombined=true&useCombinedLive=true',
      sport: 'FOOTBALL',
      sport_code: 'football',
      group: 'La Liga',
      group_code: 'la_liga',
      label: 'La Liga',
      heading: 'Football / Spain / La Liga',
      subheading: 'Today',
      max: 3,
      name: 'football/spain/la_liga',
      href: 'football-span-la_liga',
    },
  ];
  const [league, setLeague] = useState(leagues[0]);
  const [activeLeague, setActiveLeague] = useState(leagues[0].name);

  const selectLeague = (e, league) => {
    e.preventDefault();
    setLeague(league);
    setActiveLeague(league.name);
    return false;
  };

  return (
    <div className="leagues-container dark">
      <div className="leagues-nav">
        {leagues.map((league) => (
          <a href={`#${league.href}`} className={`nav-link ${activeLeague === league.name ? 'active' : ''}`} key={league.name} onClick={(e) => selectLeague(e, league)}>{league.label}</a>
        ))}
      </div>
      {children}
      <div className="leagues-wrapper">
        <div className="events-list-container">
          <EventsList league={league} />
        </div>
      </div>
    </div>
  );
};
