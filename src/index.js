import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import storeWithPersistor from './store';

import HomeScreen from './components/HomeScreen'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={storeWithPersistor.store}>
    <PersistGate loading={null} persistor={storeWithPersistor.persistor}>
      <HomeScreen />
    </PersistGate>
  </Provider>
);
