
import React, { useEffect, useState } from 'react';

import EventsList from './EventsList';

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
