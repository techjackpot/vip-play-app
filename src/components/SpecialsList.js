import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';

function SpecialsListCard({cardData}) {
  const [isActive, setActive] = useState(false);
  const icon = 'https://res.cloudinary.com/production/image/upload/v1723573889/Icons/VIP/special-line.svg';

  return (
    <div className="specials-card">
      {cardData.label && (
        <div className="special-card-label">
          {cardData.label}
        </div>
      )}
      <div className="special-card-event">
        <div className="special-card-event-heading">
          <div className="special-card-event-name">{cardData.event.name}</div>
          <div className="special-card-type">PARLAY</div>
        </div>
        <div className="special-card-betOffers">
          {cardData.betOffers.map(betOffer => betOffer.betOfferType.name === 'Over/Under' ? (
            <div className="special-card-betOffer" key={betOffer.id}>
              <img src={icon} alt="" />
              <div className="special-card-betOffer-outcome">Over {betOffer.outcome.line / 1000}</div>
              <div className="special-card-betOffer-criterion">&nbsp;- {betOffer.criterion.label}</div>
            </div>
          ) : (
            <div className="special-card-betOffer" key={betOffer.id}>
              <img src={icon} alt="" />
              <div className="special-card-betOffer-outcome">{betOffer.outcome.participant}</div>
              <div className="special-card-betOffer-criterion">&nbsp;- {betOffer.criterion.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={`special-card-odds ${isActive? 'active' : ''}`} onClick={() => setActive(!isActive)}><span className="text">{cardData.odds}</span></div>
    </div>
  )
};

export default function SpecialsList() {
  const [cardsData, setCardsData] = useState(null);

  useEffect(() => {
    axios.get(`https://ctn-api.kambi.com/offering/v2018/kambi/prepack/eventgroup/1000093656.json?lang=en_GB&market=GB&prePackTags=CUSTOM`).then((response) => {
      const specials = response.data;
      const cardsData = specials.prePacks.sort((a, b) => b.prePackSelections[0].combinations[0].odds.decimal - a.prePackSelections[0].combinations[0].odds.decimal).map(prePack => {
        const outcomes = prePack.prePackSelections[0].combinations[0].groups[0].groups.map(group => group.outcomes[0]); //.map(betOfferId => specials.betOffers.find(item => item.id === betOfferId));
        return {
          label: prePack.prePackSelections[0].label[0] || '',
          event: specials.events.find(event => event.id === outcomes[0].eventId),
          odds: (prePack.prePackSelections[0].combinations[0].odds.decimal / 1000).toFixed(2),
          betOffers: outcomes.map(outcome => {
            const betOffer = specials.betOffers.find(betOffer => betOffer.id === outcome.betOfferId);
            const outcomeSelected = betOffer.outcomes.find(item => item.id === outcome.id);
            return {
              ...betOffer,
              outcome: outcomeSelected,
            };
          }),
        };
      });
      setCardsData(cardsData);
    });
  }, []);

  return (
    <div className="specials-container">
      {!cardsData || cardsData.length === 0 ? (
        <></>
      ) : (
        <Carousel
          showArrows={false}
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          renderArrowPrev={() => {}}
          renderArrowNext={() => {}}
          className="specials-wrapper"
        >
          {cardsData.map(cardData => (
            <SpecialsListCard cardData={cardData} key={cardData.event.id} />
          ))}
        </Carousel>
      )}
    </div>
  )
};
