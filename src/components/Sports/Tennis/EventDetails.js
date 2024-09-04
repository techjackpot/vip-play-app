import React, { useEffect, useState } from 'react';
import TeamDetails from "./TeamDetails";
import EventFooter from './EventFooter';

const separatorIcon = 'https://res.cloudinary.com/production/image/upload/v1723601390/Icons/VIP/team-separator.svg';

function TeamSeparator() {
  return (
    <div className="team-separator">
      VS <img src={separatorIcon} alt="" />
    </div>
  )
}

function EventContent({item}) {

  const [homeData, setHomeData] = useState(null);
  const [awayData, setAwayData] = useState(null);

  const fillMoneylineData = (outcome, teamData) => {
    teamData.moneyline = null;
    if (outcome) {
      teamData.moneyline = {
        ...outcome,
        text: (outcome.odds / 1000).toFixed(2),
        suspended: outcome.status === 'SUSPENDED',
      };
    }
  }

  useEffect(() => {
    const isAway = item.event.tags.includes('AWAY_HOME');
    const moneylineData = item.betOffers.find(betOffer => betOffer.betOfferType.name === 'Match');

    const homeData = {
      name: isAway ? item.event.awayName : item.event.homeName,
      event: item.event,
      moneylineData,
    };
    const awayData = {
      name: isAway ? item.event.homeName : item.event.awayName,
      event: item.event,
      moneylineData,
    };

    fillMoneylineData(moneylineData?.outcomes?.find(outcome => outcome.label === homeData.name), homeData);
    fillMoneylineData(moneylineData?.outcomes?.find(outcome => outcome.label === awayData.name), awayData);

    if (item.score && item.liveData) {
      homeData.score = isAway ? item.score.away : item.score.home;
      homeData.setScores = isAway ? item.liveData?.statistics?.sets?.away : item.liveData?.statistics?.sets?.home;
      awayData.score = isAway ? item.score.home : item.score.away;
      awayData.setScores = isAway ? item.liveData?.statistics?.sets?.home : item.liveData?.statistics?.sets?.away;
    }

    setHomeData(homeData);
    setAwayData(awayData);
  }, [item]);

  if (!homeData || !awayData) return <></>;

  return (
    <div className="event-content">
      <div className="event-teams">
        <TeamDetails teamData={homeData} />
        <TeamSeparator />
        <TeamDetails teamData={awayData} />
      </div>
    </div>
  )
}

export default function EventDetails({item}) {
  return (
    <div className="event-details">
      <EventContent item={item} />
      <EventFooter state={item.event.state} start={item.event.start} />
    </div>
  )
};
