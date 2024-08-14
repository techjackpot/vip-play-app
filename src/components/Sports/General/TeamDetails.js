import React, { useEffect, useState } from 'react';

const lockIcon = 'https://res.cloudinary.com/production/image/upload/v1723596902/Icons/VIP/lock.svg';

export default function TeamDetails({teamData, teamIcon = ''}) {
  const [isSpreadActive, setSpreadActive] = useState(false);
  const [isTotalActive, setTotalActive] = useState(false);
  const [isMoneylineActive, setMoneylineActive] = useState(false);
  return (
    <div className="event-team">
      <div className="event-team-names">
        <div className="event-team-name">
          <div className="event-team-info">
            <img src={teamIcon} alt="" />
            <span>{teamData.name}</span>
          </div>
          {teamData.event.state === 'STARTED' && (
            <span className="score">{teamData.score}</span>
          )}
        </div>
      </div>
      <div className={`event-betinfo-cells ${!teamData.spread && !teamData.total && !teamData.moneyline ? 'dim' : ''}`}>
        <div onClick={() => setSpreadActive(!isSpreadActive)} className={`event-betinfo-cell ${teamData.spreadData?.suspended ? 'suspended' : ''} ${!teamData.spread ? 'empty' : ''} ${isSpreadActive ? 'active' : ''}`}>
          <span className="text1">{teamData.spread?.text1}</span>
          <span className="text2">{teamData.spread?.text2}</span>
          {teamData.spreadData?.suspended && <img src={lockIcon} alt="" />}
        </div>
        <div onClick={() => setTotalActive(!isTotalActive)} className={`event-betinfo-cell ${teamData.totalData?.suspended ? 'suspended' : ''} ${!teamData.total ? 'empty' : ''} ${isTotalActive ? 'active' : ''}`}>
          <span className="text1">{teamData.total?.text1}</span>
          <span className="text2">{teamData.total?.text2}</span>
        </div>
        <div onClick={() => setMoneylineActive(!isMoneylineActive)} className={`event-betinfo-cell ${teamData.moneylineData?.suspended ? 'suspended' : ''} ${!teamData.moneyline ? 'empty' : ''} ${isMoneylineActive ? 'active' : ''}`}>
          <span className="text">{teamData.moneyline?.text}</span>
        </div>
      </div>
    </div>
  )
};
