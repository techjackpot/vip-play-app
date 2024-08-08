import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import './ListViewMatchesComponent.scss'; // Import the styles

const ListViewMatchesComponent = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get('https://eu-offering-api.kambicdn.com/offering/v2018/kambi/listView/baseball/all/all?lang=en_GB&market=GB&includeParticipants=false&useCombined=true&useCombinedLive=true');
        setEvents(response.data.events?.filter(item => item.event.group == 'MLB') || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Initial data fetch
    fetchData();

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
      socket.emit('subscribe', {topic: 'v2018.kambi.ev.json'})
    })
    socket.on('disconnect', (reason) => {
      console.log('Socket disconnected: ' + reason);
      socket.emit('unsubscribe', {topic: 'v2018.kambi.en_GB.ev.json'})
      socket.emit('unsubscribe', {topic: 'v2018.kambi.ev.json'})
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
          let eventIndex, betOfferIndex, outcomeIndex
          // console.log(message.mt)
          switch(message.mt) {
            case 18: // EventRemoved
              eventIndex = events?.findIndex(item => item.event.id === message.er.eventId)
              if (eventIndex > -1) {
                events.splice(eventIndex, 1)
                console.log('EventRemoved', message.er.eventId)
              }
              break;
            case 7: // BetOfferRemoved
              eventIndex = events?.findIndex(item => item.event.id === message.bor.eventId)
              if (eventIndex > -1) {
                betOfferIndex = events[eventIndex].betOffers.findIndex(betOffer => betOffer.id === message.bor.betOfferId)
                if (betOfferIndex > -1) {
                  events[eventIndex].betOffers.splice(betOfferIndex, 1)
                  console.log('BetOfferRemoved', message.bor.eventId, message.bor.betOfferId)
                }
              }
              break;
            case 11: // BetOfferOddsUpdated
              eventIndex = events?.findIndex(item => item.event.id === message.boou.eventId)
              if (eventIndex > -1) {
                message.boou.outcomes.forEach(outcome => {
                  betOfferIndex = events[eventIndex].betOffers.findIndex(betOffer => betOffer.id === outcome.betOfferId)
                  if (betOfferIndex > -1) {
                    outcomeIndex = events[eventIndex].betOffers[betOfferIndex].outcomes.findIndex(item => item.id === outcome.id)
                    if (outcomeIndex > -1) {
                      events[eventIndex].betOffers[betOfferIndex].outcomes[outcomeIndex] = {
                        ...events[eventIndex].betOffers[betOfferIndex].outcomes[outcomeIndex],
                        ...outcome
                      }
                      console.log('BetOfferOddsUpdated', message.boou.eventId, outcome.betOfferId, outcome.id)
                    }
                  }
                })
              }
              break;
            case 23: // BetOfferOddsRemoved
              eventIndex = events?.findIndex(item => item.event.id === message.boor.eventId)
              if (eventIndex > -1) {
                message.boor.outcomes.forEach(outcome => {
                  betOfferIndex = events[eventIndex].betOffers.findIndex(betOffer => betOffer.id === outcome.betOfferId)
                  if (betOfferIndex > -1) {
                    outcomeIndex = events[eventIndex].betOffers[betOfferIndex].outcomes.findIndex(item => item.id === outcome.id)
                    if (outcomeIndex > -1) {
                      events[eventIndex].betOffers[betOfferIndex].outcomes.splice(outcomeIndex, 1)
                      console.log('BetOfferOddsRemoved', message.boor.eventId, outcome.betOfferId, outcome.id)
                    }
                  }
                })
              }
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
    // // Cleanup socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="listviewmatches-container">
      {events ? (
        <div className="events-list">
          {events.map((item, index) => (
            <div className="event-details" key={index}>
              <div className="event-content">
                <div className="event-teams">
                  <div className="event-team">
                    {item.event.tags.includes('AWAY_HOME') ? item.event.awayName : item.event.homeName}
                    <div className="event-betinfo-cells">
                      <div className="event-betinfo-cell">
                        {item.betOffers[0]?.outcomes[0]?.odds}
                      </div>
                      <div className="event-betinfo-cell">
                        {item.betOffers[1]?.outcomes[0]?.odds}
                      </div>
                      <div className="event-betinfo-cell">
                        {item.betOffers[2]?.outcomes[0]?.odds}
                      </div>
                    </div>
                  </div>
                  <div className="event-team">
                    {item.event.tags.includes('AWAY_HOME') ? item.event.homeName : item.event.awayName}
                    <div className="event-betinfo-cells">
                      <div className="event-betinfo-cell">
                        {item.betOffers[0]?.outcomes[1]?.odds}
                      </div>
                      <div className="event-betinfo-cell">
                        {item.betOffers[1]?.outcomes[1]?.odds}
                      </div>
                      <div className="event-betinfo-cell">
                        {item.betOffers[2]?.outcomes[1]?.odds}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="event-footer">
                <div>
                  <span className="mark-spr">SPR</span>
                  <span>{new Date(item.event.start).toLocaleTimeString()}</span>
                </div>
                <a href="/" className="color-orange">More Wagers &gt;</a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default ListViewMatchesComponent;