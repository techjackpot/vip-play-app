import React, { useEffect, useState } from 'react';

const lockIcon = 'https://res.cloudinary.com/production/image/upload/v1723596902/Icons/VIP/lock.svg';

function EventDetailsCell({odd}) {
  const [isActive, setActive] = useState(false);

  const handleBetClick = () => {
    if (!odd.available || odd.suspended || !odd.odds) {
      return;
    }
    setActive(!isActive);
  };

  return (
    <div onClick={handleBetClick} className={`event-betinfo-cell ${!odd.available ? 'empty' : ''} ${isActive ? 'active' : ''} ${odd.suspended || !odd.odds ? 'suspended' : ''}`}>
      <span className="text">{odd.odds}</span>
      {(odd.suspended || !odd.available || !odd.odds) && <img src={lockIcon} alt="" />}
    </div>
  )
}

export default function EventDetails({item}) {
  const [teamData, setTeamData] = useState(null);

  useEffect(() => {
    const matchData = item.betOffers.find(betOffer => betOffer.betOfferType.name === 'Match');

    const outcomes = !matchData ? [] : matchData?.outcomes.map(outcome => ({
      type: outcome.type,
      odds: outcome.odds / 1000,
    }));

    const teamData = {
      homeName: item.event.homeName,
      awayName: item.event.awayName,
      odds: [
          {
            label: 'HOME',
            type: 'OT_ONE',
          },
          {
            label: 'DRAW',
            type: 'OT_CROSS',
          },
          {
            label: 'AWAY',
            type: 'OT_TWO',
          },
        ].map(preset => {
          const outcome = outcomes.find(outcome => outcome.type === preset.type);
          return {
            ...preset,
            available: !!outcome,
            suspended: outcome?.status == 'SUSPENDED',
            odds: outcome ? outcome.odds : '',
          };
        }),
    };

    setTeamData(teamData);
  }, [item]);

  if (!teamData) return <></>;

  return (
    <div className="event-details">
      <div className="event-details-info">
        <div className="subheading">{new Date(item.event.start).toDateString()}</div>
        <div className="event-betinfo-cols">
          <div className="event-betinfo-col">Home</div>
          <div className="event-betinfo-col">Draw</div>
          <div className="event-betinfo-col">Away</div>
        </div>
      </div>
      <div className="event-content">
        <div className="event-teams">
          <div className="event-team">
            <div className="event-team-names">
              <div className="event-team-name">
                <span>{teamData.homeName}</span>
              </div>
              <span>&nbsp;&nbsp;@</span>
              <div className="event-team-name">
                <span>{teamData.awayName}</span>
              </div>
            </div>
            <div className={`event-betinfo-cells ${teamData.odds.every(odd => !odd.available) ? '' : ''}`}>
              {teamData.odds.map(odd => <EventDetailsCell odd={odd} key={odd.type} />)}
            </div>
          </div>
        </div>
      </div>
      <div className="event-footer">
        <div>
          <span className="event-status">SPR</span>
          {item.event.state === 'NOT_STARTED' && (
            <span>{new Date(item.event.start).toLocaleTimeString()}</span>
          )}
        </div>
        <a href="/" className="color-orange">More Wagers &gt;</a>
      </div>
    </div>
  )
};
