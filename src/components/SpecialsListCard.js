import React, { useEffect, useState } from 'react';

export default function SpecialsListCard({cardData}) {
  const [isActive, setActive] = useState(false);
  return (
    <div className="specials-card">
      {cardData.label && (
        <div className="special-card-label">
          {cardData.label}
        </div>
      )}
      <div className="special-card-event">
        <div className="special-card-event-name">{cardData.event.name}</div>
        <div className="special-card-betOffers">
          {cardData.betOffers.map(betOffer => betOffer.betOfferType.name === 'Over/Under' ? (
            <div className="special-card-betOffer" key={betOffer.id}>
              <div className="special-card-betOffer-outcome">Over {betOffer.outcome.line / 1000}</div>
              <div className="special-card-betOffer-criterion">&nbsp;- {betOffer.criterion.label}</div>
            </div>
          ) : (
            <div className="special-card-betOffer" key={betOffer.id}>
              <div className="special-card-betOffer-outcome">{betOffer.outcome.participant}</div>
              <div className="special-card-betOffer-criterion">&nbsp;- {betOffer.criterion.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={`special-card-odds ${isActive? 'active' : ''}`} onClick={() => setActive(!isActive)}>{cardData.odds}</div>
    </div>
  )
};
