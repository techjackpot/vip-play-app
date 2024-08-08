import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import './ListViewMatchesComponent.scss'; // Import the styles

const TeamDetails = ({teamData}) => {
  return (
    <div className="event-team">
      <div className="event-team-name">
        {teamData.event.state === 'STARTED' && (
          <span className="score">{teamData.score}</span>
        )}
        <span>{teamData.name}</span>
      </div>
      <div className="event-betinfo-cells">
        <div className={`event-betinfo-cell ${teamData.spreadData?.suspended ? 'suspended' : ''}`}>
          <span>{teamData.spread?.text1}</span>
          <span>{teamData.spread?.text2}</span>
        </div>
        <div className={`event-betinfo-cell ${teamData.totalData?.suspended ? 'suspended' : ''}`}>
          <span>{teamData.total?.text1}</span>
          <span>{teamData.total?.text2}</span>
        </div>
        <div className={`event-betinfo-cell ${teamData.moneylineData?.suspended ? 'suspended' : ''}`}>
          <span>{teamData.moneyline?.text}</span>
        </div>
      </div>
    </div>
  )
};

const EventDetails = ({item}) => {
  const [isAway, setIsAway] = useState(true);
  const [homeData, setHomeData] = useState(null);
  const [awayData, setAwayData] = useState(null);

  useEffect(() => {
    setIsAway(item.event.tags.includes('AWAY_HOME'));
  }, [item]);

  const fillSpreadData = (outcome, teamData) => {
    teamData.spread = null;
    if (outcome) {
      teamData.spread = {
        ...outcome,
        text1: outcome.line > 0 ? '+' + outcome.line / 1000 : outcome.line / 1000,
        text2: (outcome.odds / 1000).toFixed(2),
      };
    }
  };

  const fillTotalData = (outcome, teamData) => {
    teamData.total = null;
    if (outcome) {
      teamData.total = {
        ...outcome,
        text1: outcome.label[0] + ' ' + outcome.line / 1000,
        text2: (outcome.odds / 1000).toFixed(2),
      };
    }
  };

  const fillMoneylineData = (outcome, teamData) => {
    teamData.moneyline = null;
    if (outcome) {
      teamData.moneyline = {
        ...outcome,
        text: (outcome.odds / 1000).toFixed(2),
      };
    }
  }

  useEffect(() => {
    const spreadData = item.betOffers.find(betOffer => betOffer.betOfferType.name === 'Handicap');
    const totalData = item.betOffers.find(betOffer => betOffer.betOfferType.name === 'Over/Under');
    const moneylineData = item.betOffers.find(betOffer => betOffer.betOfferType.name === 'Match');

    const homeData = {
      name: isAway ? item.event.awayName : item.event.homeName,
      event: item.event,
      spreadData,
      totalData,
      moneylineData,
    };
    const awayData = {
      name: isAway ? item.event.homeName : item.event.awayName,
      event: item.event,
      spreadData,
      totalData,
      moneylineData,
    };

    fillSpreadData(spreadData?.outcomes?.find(outcome => outcome.participant === homeData.name), homeData);
    fillSpreadData(spreadData?.outcomes?.find(outcome => outcome.participant === awayData.name), awayData);

    fillTotalData(totalData?.outcomes?.find(outcome => outcome.label === 'Over'), homeData);
    fillTotalData(totalData?.outcomes?.find(outcome => outcome.label === 'Under'), awayData);

    fillMoneylineData(moneylineData?.outcomes?.find(outcome => outcome.participant === homeData.name), homeData);
    fillMoneylineData(moneylineData?.outcomes?.find(outcome => outcome.participant === awayData.name), awayData);

    if (item.score) {
      homeData.score = isAway ? item.score.away : item.score.home;
      awayData.score = isAway ? item.score.home : item.score.away;
    }

    setHomeData(homeData);
    setAwayData(awayData);
  }, [item]);

  if (!homeData || !awayData) return <></>;

  return (
    <div className="event-details">
      <div className="event-content">
        <div className="event-teams">
          <TeamDetails teamData={homeData} />
          <TeamDetails teamData={awayData} />
        </div>
      </div>
      <div className="event-footer">
        <div>
          <span className="event-status">SPR</span>
          {item.event.state === 'NOT_STARTED' && (
            <span>{new Date(item.event.start).toLocaleTimeString()}</span>
          )}
        </div>
        <a href="/" className="color-orange">More Wagers &gt;</a>
      </div>
    </div>
  )
};

const ListViewMatchesComponent = () => {
  const [events, setEventsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch data from the API
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://eu-offering-api.kambicdn.com/offering/v2018/kambi/listView/baseball/all/all?lang=en_GB&market=GB&includeParticipants=false&useCombined=true&useCombinedLive=true');
      setEventsData(response.data.events?.filter(item => item.event.group === 'MLB').map(item => ({...item, score: item.liveData?.score})) || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 1000 * 15); // Fetch data every 15 seconds  
    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);  

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
            case 4: // EventAdded
              if (message.ea.event.group === 'MLB') {
                setEventsData((prevEvents) => [...prevEvents, {
                  event: message.ea.event,
                  betOffers: [],
                }])
                console.log('EventAdded', message.ea.event.id)
              }
              break;
            case 18: // EventRemoved
              setEventsData((prevEvents) => prevEvents.filter(item => item.event.id !== message.er.eventId))
              console.log('EventRemoved', message.er.eventId)
              break;
            case 16: // EventScoreUpdated
              setEventsData((prevEvents) => prevEvents.map(item => item.event.id !== message.score.eventId ? item : {
                ...item,
                score: {
                  ...item.score,
                  ...message.score.score,
                },
              }))
              console.log('EventScoreUpdated', message.score.eventId)
              break;
            case 6: // BetOfferAdded
              setEventsData((prevEvents) => prevEvents.map(item => item.event.id !== message.boa.eventId ? item : {
                ...item,
                betOffers: [
                  ...item.betOffers,
                  message.boa.betOffer,
                ],
              }))
              console.log('BetOfferAdded', message.boa.eventId, message.boa.betOffer.id)
              break;
            case 7: // BetOfferRemoved
              setEventsData((prevEvents) => prevEvents.map(item => item.event.id !== message.bor.eventId ? item : {
                ...item,
                betOffers: item.betOffers.filter(betOffer => betOffer.id !== message.bor.betOfferId),
              }))
              console.log('BetOfferRemoved', message.bor.eventId, message.bor.betOfferId)
              break;
            case 8: // BetOfferStatusUpdated
              setEventsData((prevEvents) => prevEvents.map(item => item.event.id !== message.bosu.eventId ? item : {
                ...item,
                betOffers: item.betOffers.map(betOffer => betOffer.id !== message.bosu.betOfferId ? betOffer : {
                  ...betOffer,
                  ...message.bosu,
                }),
              }))
              console.log('BetOfferStatusUpdated', message.bosu.eventId, message.bosu.betOfferId)
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
              console.log('BetOfferOddsAdded', message.booa.eventId)
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
              console.log('BetOfferOddsUpdated', message.boou.eventId)
              break;
            case 23: // BetOfferOddsRemoved
              setEventsData((prevEvents) => prevEvents.map(item => item.event.id !== message.boor.eventId ? item : {
                ...item,
                betOffers: item.betOffers.map(betOffer => ({
                  ...betOffer,
                  outcomes: betOffer.outcomes.filter(outcome => message.boor.outcomes.findIndex(oc => oc.id === outcome.id) > -1),
                })),
              }))
              console.log('BetOfferOddsRemoved', message.boor.eventId)
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
  }, [])

  return (
    <div className="listviewmatches-container">
      <div className="events-list-header">
        <h1>Today</h1>
        <div className="event-betinfo-cols">
          <div className="event-betinfo-col">Spread</div>
          <div className="event-betinfo-col">Total</div>
          <div className="event-betinfo-col">Moneyline</div>
        </div>
      </div>
      {events ? (
        <div className="events-list">
          {events.map((item) => (
            <EventDetails item={item} key={item.event.id} />
          ))}
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default ListViewMatchesComponent;