import React, { useEffect, useState } from 'react';

import '../assets/scss/AppScreen.scss';

import BottomNav from './BottomNav';
import KambiBC from './KambiBC';
import HomeScreen from './HomeScreen';
import LiveNowScreen from './LiveNowScreen';
import BetsScreen from './BetsScreen';
import CasinoScreen from './CasinoScreen';
import RewardsScreen from './RewardsScreen';

export default function AppScreen() {
  const [activeScreen, setActiveScreen] = useState('home');

  return (
    <div className="appscreen-container dark">
      <div className="screen-container">
        {activeScreen === 'home' && <HomeScreen />}
        {activeScreen === 'live' && <LiveNowScreen />}
        {activeScreen === 'bets' && <BetsScreen />}
        {activeScreen === 'casino' && <CasinoScreen />}
        {activeScreen === 'rewards' && <RewardsScreen />}
      </div>
      <BottomNav activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
      <KambiBC />
    </div>
  )
};
