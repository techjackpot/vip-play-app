import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Leagues from './Leagues';

const searchIcon = "https://res.cloudinary.com/production/image/upload/v1723572404/Icons/VIP/search.svg";

function Search() {
  return (
    <div className={`livenow-header-container`}>
      <div className="livenow-header">
        <strong>Live Now</strong>
      </div>
      <div className="livenow-search-bar">
        <img src={searchIcon} alt="" />
        <input className="search-input" type="search" placeholder="Search" />
      </div>
    </div>
  )
}

export default function LiveNowScreen() {
  
  const [leagues, setLeagues] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`https://eu-offering-api.kambicdn.com/offering/v2018/kambi/event/live/open.json?lang=en_GB&market=GB`);

      const leagues = [];

      const items = response.data.group.groups;

      items.forEach(item => {
        // item.groups.forEach(group => {
        //   leagues.push({
        //     path: '',
        //     fullPath: `https://eu-offering-api.kambicdn.com/offering/v2018/kambi/listView/${item.termKey}/all/all/all/in-play.json?lang=en_GB&market=GB&useCombined=true&useCombinedLive=true`,
        //     sport: item.sport,
        //     sport_code: item.termKey,
        //     group: group.name,
        //     group_code: group.termKey,
        //     label: group.name,
        //     heading: group.name,
        //     subheading: 'Today',
        //     max: 10,
        //     name: `${item.termKey}/${group.termKey}`,
        //     href: `${item.termKey}/${group.termKey}`,
        //     icon: '',
        //   });
        // });
        leagues.push({
          path: '',
          fullPath: `https://eu-offering-api.kambicdn.com/offering/v2018/kambi/listView/${item.termKey}/all/all/all/in-play.json?lang=en_GB&market=GB&useCombined=true&useCombinedLive=true`,
          sport: item.sport,
          sport_code: item.termKey,
          group: '',
          group_code: '',
          label: item.name,
          heading: '',
          subheading: 'Today',
          max: 10,
          name: `${item.termKey}`,
          href: `${item.termKey}`,
          icon: '',
        });
      });

      setLeagues(leagues);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="livenowscreen-container dark">
      <Search />
      {!isLoading && <Leagues leagues={leagues} is_live_now={true}></Leagues>}
    </div>
  )
};
