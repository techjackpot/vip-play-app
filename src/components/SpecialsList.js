import { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';

import SpecialsListCard from "./SpecialsListCard";

export default function() {
  const [cardsData, setCardsData] = useState(null);
  const [isActive, setSpreadActive] = useState(false);

  useEffect(() => {
    axios.get(`https://eu-offering-api.kambicdn.com/offering/v2018/kambi/prepack/eventgroup/1000093656.json?lang=en_GB&market=GB&prePackTags=CUSTOM`).then((response) => {
      const specials = response.data;
      const cardsData = specials.prePacks.sort((a, b) => b.prePackSelections[0].combinations[0].odds.decimal - a.prePackSelections[0].combinations[0].odds.decimal).map(prePack => {
        const outcomes = prePack.prePackSelections[0].combinations[0].groups[0].groups.map(group => group.outcomes[0]); //.map(betOfferId => specials.betOffers.find(item => item.id === betOfferId));
        return {
          label: prePack.prePackSelections[0].label[0] || '',
          event: specials.events.find(event => event.id == outcomes[0].eventId),
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

  if (!cardsData || cardsData.length === 0) {
    return;
  }

  return (
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
  )
};
