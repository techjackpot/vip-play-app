import React, { useEffect, useState } from 'react';

import '../assets/scss/HomeScreen.scss';

import TopNav from './TopNav';
import Promotions from './Promotions';
import Leagues from './Leagues';
import SpecialsList from './SpecialsList';
import KambiBC from './KambiBC';

export default function HomeScreen() {
  return (
    <div className="homescreen-container dark">
      <TopNav />
      <Promotions />
      <Leagues>
        <SpecialsList />
      </Leagues>
      <KambiBC />
    </div>
  )
};
