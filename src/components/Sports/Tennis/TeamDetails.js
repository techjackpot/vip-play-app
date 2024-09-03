import React, { useEffect, useState } from 'react';

import { useBetslips } from 'hooks/redux/betslips';

const lockIcon = 'https://res.cloudinary.com/production/image/upload/v1723596902/Icons/VIP/lock.svg';

export default function TeamDetails({teamData, teamIcon = ''}) {
  const [isSpreadActive, setSpreadActive] = useState(false);
  const [isTotalActive, setTotalActive] = useState(false);
  const [isMoneylineActive, setMoneylineActive] = useState(false);

  const betslips = useBetslips();

  useEffect(() => {
    setSpreadActive(!!betslips.find(betslip => betslip.id === teamData.spread?.id));
    setTotalActive(!!betslips.find(betslip => betslip.id === teamData.total?.id));
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

  const handleSpreadClick = () => {
    if (teamData.spreadData.suspended) {
      return;
    }
    // setSpreadActive(!isSpreadActive);
    handleWapiOutcomes(teamData.spread, !isSpreadActive);
  };
  const handleTotalClick = () => {
    if (teamData.totalData.suspended) {
      return;
    }
    // setTotalActive(!isTotalActive);
    handleWapiOutcomes(teamData.total, !isTotalActive);
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
            <img src={teamIcon} alt="" />
            <span className="team-name">{teamData.name}</span>
            {teamData.event.state === 'STARTED' && (
              <span className="score">{teamData.score}</span>
            )}
          </div>
        </div>
      </div>
      <div className={`event-betinfo-cells ${!teamData.spread && !teamData.total && !teamData.moneyline ? 'dim' : ''}`}>
        <div onClick={() => handleSpreadClick()} className={`event-betinfo-cell ${teamData.spreadData?.suspended ? 'suspended' : ''} ${!teamData.spread ? 'empty' : ''} ${isSpreadActive ? 'active' : 'notactive'}`}>
          <span className="text1">{teamData.spread?.text1}</span>
          <span className="text2">{teamData.spread?.text2}</span>
          {(teamData.spreadData?.suspended || (!teamData.spread?.text1 && !teamData.spread?.text2)) && <img src={lockIcon} alt="" />}
        </div>
        <div onClick={() => handleTotalClick()} className={`event-betinfo-cell ${teamData.totalData?.suspended ? 'suspended' : ''} ${!teamData.total ? 'empty' : ''} ${isTotalActive ? 'active' : ''}`}>
          <span className="text1">{teamData.total?.text1}</span>
          <span className="text2">{teamData.total?.text2}</span>
          {(teamData.totalData?.suspended || (!teamData.total?.text1 && !teamData.total?.text2)) && <img src={lockIcon} alt="" />}
        </div>
        <div onClick={() => handleMoneylineClick()} className={`event-betinfo-cell ${teamData.moneylineData?.suspended ? 'suspended' : ''} ${!teamData.moneyline ? 'empty' : ''} ${isMoneylineActive ? 'active' : ''}`}>
          <span className="text">{teamData.moneyline?.text}</span>
          {(teamData.moneylineData?.suspended || (!teamData.moneyline?.text)) && <img src={lockIcon} alt="" />}
        </div>
      </div>
    </div>
  )
};
