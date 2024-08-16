import React, { useEffect, useState } from 'react';

import {
  useLoadBetslipsDispatch,
} from '../hooks/redux/betslips';

export default function KambiBC() {

  const loadBetslips = useLoadBetslipsDispatch();

  useEffect(() => {
    (function (global) {
      var CustomerSettings = function() {
        this.enableNavigationPanel = true;
      };
      global.customerSettings = new CustomerSettings();
    })(window);
    window._kc = {
      // Inject start-up parameters here when serving the page
      currency: 'USD',
      locale: 'en_GB',
      market: 'MT',
      playerId: '',
      ticket: '',
      oddsFormat: 'fractional',
      racingMode: 'false',
      environment: 'ctn'
    };
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://client-static.bc.ctn.kambicdn.com/client/integration3/kambi-bootstrap.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://kambi-widget-api.bc.ctn.kambicdn.com/kambi-widget-api.js";
    script.async = true;
    script.onload = () => {
      handleKambiWidget();
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
  }, []);

  const handleKambiWidget = () => {
    window.KambiWidget.ready.then(function (wapi) {
      window.wapi = wapi;

      wapi.request(wapi.BETSLIP_OUTCOMES);

      wapi.subscribe((response, wapi) => {
        switch (response.type) {
          case wapi.BETSLIP_OUTCOMES:
            loadBetslips(response.data.outcomes);
            break;
          default:
            break;
        }
      });
    });
  };

  return (
    <div className="hidden">
      <div id="KambiBC"></div>
    </div>
  )
}