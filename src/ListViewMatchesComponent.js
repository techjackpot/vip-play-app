import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import './ListViewMatchesComponent.scss'; // Import the styles

const icons = {
  baseball: `data:image/png;base64,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`,
};

const TeamDetails = ({teamData}) => {
  const [isSpreadActive, setSpreadActive] = useState(false);
  const [isTotalActive, setTotalActive] = useState(false);
  const [isMoneylineActive, setMoneylineActive] = useState(false);
  return (
    <div className="event-team">
      <div className="event-team-name">
        {teamData.event.state === 'STARTED' && (
          <span className="score">{teamData.score}</span>
        )}
        <span>{teamData.name}</span>
      </div>
      <div className={`event-betinfo-cells ${!teamData.spread && !teamData.total && !teamData.moneyline ? 'dim' : ''}`}>
        <div onClick={() => setSpreadActive(!isSpreadActive)} className={`event-betinfo-cell ${teamData.spreadData?.suspended ? 'suspended' : ''} ${!teamData.spread ? 'empty' : ''} ${isSpreadActive ? 'active' : ''}`}>
          <span className="text1">{teamData.spread?.text1}</span>
          <span className="text2">{teamData.spread?.text2}</span>
        </div>
        <div onClick={() => setTotalActive(!isTotalActive)} className={`event-betinfo-cell ${teamData.totalData?.suspended ? 'suspended' : ''} ${!teamData.total ? 'empty' : ''} ${isTotalActive ? 'active' : ''}`}>
          <span className="text1">{teamData.total?.text1}</span>
          <span className="text2">{teamData.total?.text2}</span>
        </div>
        <div onClick={() => setMoneylineActive(!isMoneylineActive)} className={`event-betinfo-cell ${teamData.moneylineData?.suspended ? 'suspended' : ''} ${!teamData.moneyline ? 'empty' : ''} ${isMoneylineActive ? 'active' : ''}`}>
          <span className="text">{teamData.moneyline?.text}</span>
        </div>
      </div>
    </div>
  )
};

const EventPreview = () => {
  const previewData = {
    event: {
      state: '',
    },
    spread: null,
    total: null,
    moneyline: null,
  };

  return (
    <div className="event-details preview-loading">
      <div className="event-content">
        <div className="event-teams">
          <TeamDetails teamData={previewData} />
          <TeamDetails teamData={previewData} />
        </div>
      </div>
      <div className="event-footer">
        <div>
          <span className="event-status">SPR</span>
          Loading....
        </div>
      </div>
    </div>
  )
};

const EventDetails = ({item}) => {
  const [homeData, setHomeData] = useState(null);
  const [awayData, setAwayData] = useState(null);

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
    const isAway = item.event.tags.includes('AWAY_HOME');
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
            <span>{new Date(item.event.start).toLocaleString()}</span>
          )}
        </div>
        <a href="/" className="color-orange">More Wagers &gt;</a>
      </div>
    </div>
  )
};

const EventsList = ({events, league, isLoading}) => {
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

const SpecialsList = () => {
  const [cardsData, setCardsData] = useState(null);

  useEffect(() => {
    axios.get(`https://eu-offering-api.kambicdn.com/offering/v2018/kambi/prepack/eventgroup/1000093656.json?lang=en_GB&market=GB&prePackTags=CUSTOM`).then((response) => {
      const specials = response.data;
      const cardsData = specials.prePacks.sort((a, b) => b.prePackSelections[0].combinations[0].odds.decimal - a.prePackSelections[0].combinations[0].odds.decimal).map(prePack => {
        const outcomes = prePack.prePackSelections[0].combinations[0].groups[0].groups.map(group => group.outcomes[0]); //.map(betOfferId => specials.betOffers.find(item => item.id === betOfferId));
        return {
          label: prePack.prePackSelections[0].label[0] || '',
          event: specials.events.find(event => event.id == outcomes[0].eventId),
          odds: (prePack.prePackSelections[0].combinations[0].odds.decimal / 1000).toFixed(2),
          betOffers: outcomes.map(outcome => {
            const betOffer = specials.betOffers.find(betOffer => betOffer.id === outcome.betOfferId);
            const outcomeSelected = betOffer.outcomes.find(item => item.id === outcome.id);
            return {
              ...betOffer,
              outcome: outcomeSelected,
            };
          }),
        };
      });
      setCardsData(cardsData);
    });
  }, []);

  if (!cardsData || cardsData.length === 0) {
    return;
  }

  return (
    <div className="specials-wrapper">
      {cardsData.map(cardData => (
        <div className="specials-card" key={cardData.event.id}>
          {cardData.label && (
            <div className="special-card-label">
              {cardData.label}
            </div>
          )}
          <div className="special-card-event">
            <div className="special-card-event-name">{cardData.event.name}</div>
            <div className="special-card-betOffers">
              {cardData.betOffers.map(betOffer => betOffer.betOfferType.name == 'Over/Under' ? (
                <div className="special-card-betOffer" key={betOffer.id}>
                  <div className="special-card-betOffer-outcome">Over {betOffer.outcome.line / 1000}</div>
                  <div className="special-card-betOffer-criterion">&nbsp;- {betOffer.criterion.label}</div>
                </div>
              ) : (
                <div className="special-card-betOffer" key={betOffer.id}>
                  <div className="special-card-betOffer-outcome">{betOffer.outcome.participant}</div>
                  <div className="special-card-betOffer-criterion">&nbsp;- {betOffer.criterion.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="special-card-odds">{cardData.odds}</div>
        </div>
      ))}
    </div>
  )
};

const ListViewMatchesComponent = () => {
  const [events, setEventsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const leagues = [
    {
      sport: 'AMERICAN_FOOTBALL',
      sport_code: 'american_football',
      group: 'NFL',
      group_code: 'nfl',
      label: 'NFL',
      heading: 'American Football / NFL',
      subheading: 'Today',
      max: 3,
      name: 'american_football/nfl',
      href: 'american_football-nfl',
    },
    {
      sport: 'BASEBALL',
      sport_code: 'baseball',
      group: 'MLB',
      group_code: 'mlb',
      label: 'MLB',
      heading: 'MLB',
      subheading: 'Today',
      max: 10,
      name: 'baseball/mlb',
      href: 'baseball-mlb',
      icon: icons.baseball,
    },
    {
      sport: 'BASKETBALL',
      sport_code: 'basketball',
      group: 'NBA',
      group_code: 'nba',
      label: 'NBA',
      heading: 'NBA',
      subheading: 'Today',
      max: 3,
      name: 'basketball/nba',
      href: 'basketball-nba',
    },
    {
      sport: 'AMERICAN_FOOTBALL',
      sport_code: 'american_football',
      group: 'NCAAF',
      group_code: 'ncaaf',
      label: 'NCAAF',
      heading: 'American Football / NCAAF',
      subheading: 'Today',
      max: 3,
      name: 'american_football/ncaaf',
      href: 'american_football-ncaaf',
    },
  ];
  const [league, setLeague] = useState(leagues[0]);
  const [activeLeague, setActiveLeague] = useState(leagues[0].name);

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

  const selectLeague = (league) => {
    setLeague(league);
    setActiveLeague(league.name);
  };

  return (
    <div className="listviewmatches-container">
      <div className="listviewmatches-nav">
        {leagues.map((league) => (
          <a href={`#${league.href}`} className={`nav-link ${activeLeague === league.name ? 'active' : ''}`} key={league.name} onClick={() => selectLeague(league)}>{league.label}</a>
        ))}
      </div>
      <div className="listviewmatches-wrapper">
        <div className="specials-container">
          <SpecialsList />
        </div>
        <div className="events-list-container">
          <EventsList events={events} league={league} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default ListViewMatchesComponent;