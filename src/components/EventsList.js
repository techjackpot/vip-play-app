import { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

import EventPreview from "./EventPreview";
import EventDetails from "./EventDetails";

export default function({league}) {
  const [events, setEventsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // Function to fetch data from the API
  const fetchData = async (updateLoading = false) => {
    updateLoading && setIsLoading(true);
    try {
      const response = await axios.get(`https://eu-offering-api.kambicdn.com/offering/v2018/kambi/listView/${league.sport_code}/all/all?lang=en_GB&market=GB&includeParticipants=false&useCombined=true&useCombinedLive=true`);
      setEventsData(response.data.events?.filter(item => item.event.group === league.group).map(item => ({...item, score: item.liveData?.score})) || []);
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

  return (
    <div className="events-list-wrapper" id={league.href}>
      <div className="events-list-header">
        <h1 className="heading">
          {league.icon && <img className="league-icon" src={league.icon} />}
          {league.heading}
        </h1>
        <a href="/">More Bets &gt;</a>
      </div>
      <div className="events-list-info">
        <div className="subheading">{league.subheading}</div>
        <div className="event-betinfo-cols">
          <div className="event-betinfo-col">Spread</div>
          <div className="event-betinfo-col">Total</div>
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
};
