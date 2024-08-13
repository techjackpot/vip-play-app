import React from 'react';
import ReactDOM from 'react-dom';
import HomeScreen from './HomeScreen';

// This function will be called to inject the component into a container
window.injectHomeScreen = (containerId) => {
  const container = document.getElementById(containerId);
  if (container) {
    ReactDOM.createRoot(container).render(<HomeScreen />)
  } else {
    console.error(`Container with id ${containerId} not found.`);
  }
};