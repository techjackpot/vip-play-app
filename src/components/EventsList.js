import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import moment from 'moment';

import FootballEventsList from './Sports/Football/EventsList';
import GeneralEventsList from './Sports/General/EventsList';

export default function EventsList({league}) {
  const [events, setEventsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // Function to fetch data from the API
  const fetchData = async (updateLoading = false) => {
    updateLoading && setIsLoading(true);
    try {
      const response = await axios.get(`https://ctn-api.kambi.com/offering/v2018/kambi/${league.path}`);
      setEventsData(
        response.data.events
          ?.filter(item => !league.groupMatches || item.event.group === league.group)
          .filter(item => moment(item.event.start).diff(moment(), 'days') > -1)
          .map(item => ({...item, score: item.liveData?.score}))
          || []
      );
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      updateLoading && setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(true); // Initial fetch
    const intervalId = setInterval(fetchData, 1000 * 15); // Fetch data every 15 seconds  
    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, [league]);

  useEffect(() => {
    // Setup socket connection for live updates
    const socket = io(`wss://eu-push.kambicdn.com`, {
      transports: ['websocket'],
      upgrade: false,
      autoConnect: false,
      path: '/socket.io'
    });
    socket.on('connect', () => {
      console.log('Socket connected');
      socket.emit('subscribe', {topic: 'v2018.kambi.en_GB.ev.json'})
    })
    socket.on('disconnect', (reason) => {
      console.log('Socket disconnected: ' + reason);
      socket.emit('unsubscribe', {topic: 'v2018.kambi.en_GB.ev.json'})
    })
    socket.on('reconnect', (attemptNumber) => {
      console.log('Socket reconnected');
    });
    socket.on('error', (error) => {
      console.log('Socket error: ' + error);
      socket.emit('unsubscribe', {topic: 'v2018.kambi.ev.json'})
    });
    socket.on('reconnect_attempt', (attemptNumber) => {
      console.log('Socket reconnect attempt ' + attemptNumber);
    });
    socket.on('message', incomingMessage => {
      // console.log('>' + incomingMessage)
      try {
        const messages = JSON.parse(incomingMessage);
        messages.forEach(message => {
          switch(message.mt) {
            case 4: // EventAdded
              if (message.ea.event.group === 'MLB') {
                setEventsData((prevEvents) => [...prevEvents, {
                  event: message.ea.event,
                  betOffers: [],
                }])
                // console.log('EventAdded', message.ea.event.id)
              }
              break;
            case 18: // EventRemoved
              setEventsData((prevEvents) => prevEvents.filter(item => item.event.id !== message.er.eventId))
              // console.log('EventRemoved', message.er.eventId)
              break;
            case 16: // EventScoreUpdated
              setEventsData((prevEvents) => prevEvents.map(item => item.event.id !== message.score.eventId ? item : {
                ...item,
                score: {
                  ...item.score,
                  ...message.score.score,
                },
              }))
              // console.log('EventScoreUpdated', message.score.eventId)
              break;
            case 6: // BetOfferAdded
              setEventsData((prevEvents) => prevEvents.map(item => item.event.id !== message.boa.eventId ? item : {
                ...item,
                betOffers: [
                  ...item.betOffers,
                  message.boa.betOffer,
                ],
              }))
              // console.log('BetOfferAdded', message.boa.eventId, message.boa.betOffer.id)
              break;
            case 7: // BetOfferRemoved
              setEventsData((prevEvents) => prevEvents.map(item => item.event.id !== message.bor.eventId ? item : {
                ...item,
                betOffers: item.betOffers.filter(betOffer => betOffer.id !== message.bor.betOfferId),
              }))
              // console.log('BetOfferRemoved', message.bor.eventId, message.bor.betOfferId)
              break;
            case 8: // BetOfferStatusUpdated
              setEventsData((prevEvents) => prevEvents.map(item => item.event.id !== message.bosu.eventId ? item : {
                ...item,
                betOffers: item.betOffers.map(betOffer => betOffer.id !== message.bosu.betOfferId ? betOffer : {
                  ...betOffer,
                  ...message.bosu,
                }),
              }))
              // console.log('BetOfferStatusUpdated', message.bosu.eventId, message.bosu.betOfferId)
              break;
            case 22: // BetOfferOddsAdded
              setEventsData((prevEvents) => prevEvents.map(item => item.event.id !== message.booa.eventId ? item : {
                ...item,
                betOffers: item.betOffers.map(betOffer => ({
                  ...betOffer,
                  outcomes: [
                    ...betOffer.outcomes,
                    ...message.booa.outcomes.filter(outcome => outcome.betOfferId === betOffer.id),
                  ]
                })),
              }))
              // console.log('BetOfferOddsAdded', message.booa.eventId)
              break;
            case 11: // BetOfferOddsUpdated
              setEventsData((prevEvents) => prevEvents.map(item => item.event.id !== message.boou.eventId ? item : {
                ...item,
                betOffers: item.betOffers.map(betOffer => ({
                  ...betOffer,
                  outcomes: betOffer.outcomes.map(outcome => ({
                    ...outcome,
                    ...message.boou.outcomes.find(oc => oc.id === outcome.id),
                  }))
                })),
              }))
              // console.log('BetOfferOddsUpdated', message.boou.eventId)
              break;
            case 23: // BetOfferOddsRemoved
              setEventsData((prevEvents) => prevEvents.map(item => item.event.id !== message.boor.eventId ? item : {
                ...item,
                betOffers: item.betOffers.map(betOffer => ({
                  ...betOffer,
                  outcomes: betOffer.outcomes.filter(outcome => message.boor.outcomes.findIndex(oc => oc.id === outcome.id) > -1),
                })),
              }))
              // console.log('BetOfferOddsRemoved', message.boor.eventId)
              break;
            case 28: // LiveStatistics
              console.log(message.ls);
              break;
            default:
              break;
          }
        });
      } catch(e) {
        console.log('Error', e);
      }
    })

    socket.open()
    // Cleanup socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  if (league.sport_code === 'football') {
    return <FootballEventsList league={league} events={events} isLoading={isLoading} />;
  } else {
    return <GeneralEventsList league={league} events={events} isLoading={isLoading} />;
  }
};
