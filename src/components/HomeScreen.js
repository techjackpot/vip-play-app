import React, { useEffect, useState } from 'react';

import TopNav from './TopNav';
import Promotions from './Promotions';
import Leagues from './Leagues';
import SpecialsList from './SpecialsList';

export default function HomeScreen() {
  return (
    <div className="homescreen-container dark">
      <TopNav />
      <Promotions />
      <Leagues>
        <SpecialsList />
      </Leagues>
    </div>
  )
};
