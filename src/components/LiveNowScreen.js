import React, { useEffect, useState } from 'react';

import Leagues from './Leagues';

const searchIcon = "https://res.cloudinary.com/production/image/upload/v1723572404/Icons/VIP/search.svg";

function Search() {
  return (
    <div className={`livenow-header-container`}>
      <div className="livenow-header">
        <strong>Live Now</strong>
      </div>
      <div className="livenow-search-bar">
        <img src={searchIcon} alt="" />
        <input className="search-input" type="search" placeholder="Search" />
      </div>
    </div>
  )
}

export default function LiveNowScreen() {
  return (
    <div className="livenowscreen-container dark">
      <Search />
      <Leagues></Leagues>
    </div>
  )
};
