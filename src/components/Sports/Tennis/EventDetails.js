import React, { useEffect, useState } from 'react';
import TeamDetails from "./TeamDetails";
import EventFooter from './EventFooter';

const separatorIcon = 'https://res.cloudinary.com/production/image/upload/v1723601390/Icons/VIP/team-separator.svg';
const teamIcon1 = 'https://res.cloudinary.com/production/image/upload/v1723623375/Icons/VIP/team-1.svg';
const teamIcon2 = 'https://res.cloudinary.com/production/image/upload/v1723623376/Icons/VIP/team-2.svg';

function TeamSeparator() {
  return (
    <div className="team-separator">
      @ <img src={separatorIcon} alt="" />
    </div>
  )
}

function EventContent({item}) {

  const [homeData, setHomeData] = useState(null);
  const [awayData, setAwayData] = useState(null);

  const fillSpreadData = (outcome, teamData) => {
    teamData.spread = null;
    if (outcome) {
      teamData.spread = {
        ...outcome,
        text1: outcome.line > 0 ? '+' + outcome.line / 1000 : outcome.line / 1000,
        text2: (outcome.odds / 1000).toFixed(2),
      };
    }
  };

  const fillTotalData = (outcome, teamData) => {
    teamData.total = null;
    if (outcome) {
      teamData.total = {
        ...outcome,
        text1: outcome.label[0] + ' ' + outcome.line / 1000,
        text2: (outcome.odds / 1000).toFixed(2),
      };
    }
  };

  const fillMoneylineData = (outcome, teamData) => {
    teamData.moneyline = null;
    if (outcome) {
      teamData.moneyline = {
        ...outcome,
        text: (outcome.odds / 1000).toFixed(2),
      };
    }
  }

  useEffect(() => {
    const isAway = item.event.tags.includes('AWAY_HOME');
    const spreadData = item.betOffers.find(betOffer => betOffer.betOfferType.name === 'Handicap');
    const totalData = item.betOffers.find(betOffer => betOffer.betOfferType.name === 'Over/Under');
    const moneylineData = item.betOffers.find(betOffer => betOffer.betOfferType.name === 'Match');

    const homeData = {
      name: isAway ? item.event.awayName : item.event.homeName,
      event: item.event,
      spreadData,
      totalData,
      moneylineData,
    };
    const awayData = {
      name: isAway ? item.event.homeName : item.event.awayName,
      event: item.event,
      spreadData,
      totalData,
      moneylineData,
    };

    fillSpreadData(spreadData?.outcomes?.find(outcome => outcome.participant === homeData.name), homeData);
    fillSpreadData(spreadData?.outcomes?.find(outcome => outcome.participant === awayData.name), awayData);

    fillTotalData(totalData?.outcomes?.find(outcome => outcome.label === 'Over'), homeData);
    fillTotalData(totalData?.outcomes?.find(outcome => outcome.label === 'Under'), awayData);

    fillMoneylineData(moneylineData?.outcomes?.find(outcome => outcome.participant === homeData.name), homeData);
    fillMoneylineData(moneylineData?.outcomes?.find(outcome => outcome.participant === awayData.name), awayData);

    if (item.score) {
      homeData.score = isAway ? item.score.away : item.score.home;
      awayData.score = isAway ? item.score.home : item.score.away;
    }

    setHomeData(homeData);
    setAwayData(awayData);
  }, [item]);

  if (!homeData || !awayData) return <></>;

  return (
    <div className="event-content">
      <div className="event-teams">
        <TeamDetails teamData={homeData} teamIcon={teamIcon1} />
        <TeamSeparator />
        <TeamDetails teamData={awayData} teamIcon={teamIcon2} />
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
