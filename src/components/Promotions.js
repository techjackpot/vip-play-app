import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';

export default function Promotions() {
  const promos = [
    {
      label: '',
      image: 'https://res.cloudinary.com/production/image/upload/v1723572900/Icons/VIP/promo1.png',
    },
    {
      label: '',
      image: 'https://res.cloudinary.com/production/image/upload/v1723572912/Icons/VIP/promo2.png',
    },
  ];

  return (
    <div className="promotions-container">
      <Carousel
        showArrows={false}
        showStatus={false}
        showIndicators={true}
        showThumbs={false}
        renderArrowPrev={() => {}}
        renderArrowNext={() => {}}
        className="specials-wrapper"
      >
        {promos.filter(promo => promo.image).map((promo, index) => (
          <img src={promo.image} alt="" key={index} />
        ))}
      </Carousel>
    </div>
  )
}