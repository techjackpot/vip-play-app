import React, { useEffect, useState } from 'react';

import EventPreview from "./EventPreview";
import EventDetails from "./EventDetails";

function EventsList({league, group, events, isLoading}) {
  return (
    <div className="events-list-wrapper tennis-list" id={league.href}>
      <div className="events-list-header">
        <h1 className="heading">
          {league.icon && <img className="league-icon" src={league.icon} alt="" />}
          {league.heading} / {group}
        </h1>
        <a className="btn-more-bets" href="/">More Bets &gt;</a>
      </div>
      <div className="events-list-info">
        <div className="subheading">{league.subheading}</div>
        <div className="event-betinfo-cols">
          <div className="event-betinfo-col">Moneyline</div>
        </div>
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
}

export default function EventsListGroups({league, events, isLoading}) {
  const eventGroups = {};
  events.forEach(item => {
    if (!eventGroups[item.event.group]) {
      eventGroups[item.event.group] = [];
    }
    eventGroups[item.event.group].push(item);
  });

  return Object.keys(eventGroups).sort().map(key => (
    <EventsList league={league} group={key} events={eventGroups[key]} key={key} isLoading={isLoading} />
  ));
};
