import React, { useEffect, useState } from 'react';

import { useBetslips } from 'hooks/redux/betslips';

const lockIcon = 'https://res.cloudinary.com/production/image/upload/v1723596902/Icons/VIP/lock.svg';

export default function TeamDetails({teamData, teamIcon = ''}) {
  const [isMoneylineActive, setMoneylineActive] = useState(false);

  const betslips = useBetslips();

  useEffect(() => {
    setMoneylineActive(!!betslips.find(betslip => betslip.id === teamData.moneyline?.id));
  }, [betslips, teamData]);

  const handleWapiOutcomes = (outcome, is_adding) => {
    const wapi = window.wapi;
    if (!wapi) return;
    if (is_adding) {
      wapi.set(wapi.BETSLIP_OUTCOMES, {
        updateMode: wapi.BETSLIP_OUTCOMES_ARGS.UPDATE_APPEND,
        outcomes: [outcome.id],
        couponType: wapi.BETSLIP_OUTCOMES_ARGS.TYPE_SINGLE
      });
    } else {
      wapi.set(wapi.BETSLIP_OUTCOMES_REMOVE, {outcomes: [outcome.id]});
    }
  };

  const handleMoneylineClick = () => {
    if (teamData.moneylineData.suspended) {
      return;
    }
    // setMoneylineActive(!isMoneylineActive);
    handleWapiOutcomes(teamData.moneyline, !isMoneylineActive);
  };
  return (
    <div className="event-team">
      <div className="event-team-names">
        <div className="event-team-name">
          <div className="event-team-info">
            {teamIcon && <img src={teamIcon} alt="" />}
            <span className="team-name">{teamData.name}</span>
            {teamData.event.state === 'STARTED' && (
              <>
                <span className="score">{teamData.score}</span>
                {teamData.setScores.filter(score => score >= 0).map((score, index) => <span className="set-score" key={index} round={index+1}>{score}</span>)}
              </>
            )}
          </div>
        </div>
      </div>
      <div className={`event-betinfo-cells ${!teamData.moneyline ? 'dim' : ''}`}>
        <div onClick={() => handleMoneylineClick()} className={`event-betinfo-cell ${teamData.moneyline?.suspended ? 'suspended' : ''} ${!teamData.moneyline ? 'empty' : ''} ${isMoneylineActive ? 'active' : ''}`}>
          <span className="text">{teamData.moneyline?.text}</span>
          {(teamData.moneyline?.suspended || (!teamData.moneyline?.text)) && <img src={lockIcon} alt="" />}
        </div>
      </div>
    </div>
  )
};
