import React, { useEffect, useState } from 'react';

import EventPreview from "./EventPreview";
import EventDetails from "./EventDetails";

export default function EventsList({league, events, isLoading}) {
  return (
    <div className="events-list-wrapper" id={league.href}>
      <div className="events-list-header">
        <h1 className="heading">
          {league.icon && <img className="league-icon" src={league.icon} alt="" />}
          {league.heading}
        </h1>
      </div>
      <div className="events-list">
        {isLoading ? (
          <>
            <EventPreview />
            <EventPreview />
            <EventPreview />
          </>
        ) : events.map((item) => (
          <EventDetails item={item} key={item.event.id} />
        ))}
      </div>
    </div>
  )
};
