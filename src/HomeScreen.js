import React, { useEffect, useState } from 'react';

import './HomeScreen.scss';

import TopNav from './components/TopNav';
import Promotions from './components/Promotions';
import Leagues from './components/Leagues';
import SpecialsList from './components/SpecialsList';
import KambiBC from './components/KambiBC';

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
