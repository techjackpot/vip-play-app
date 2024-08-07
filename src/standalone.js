import React from 'react';
import ReactDOM from 'react-dom';
import ListViewMatchesComponent from './ListViewMatchesComponent';
import './ListViewMatchesComponent.scss'; // Import the styles

// This function will be called to inject the component into a container
window.injectListViewMatchesComponent = (containerId) => {
  const container = document.getElementById(containerId);
  if (container) {
    ReactDOM.createRoot(container).render(<ListViewMatchesComponent />)
  } else {
    console.error(`Container with id ${containerId} not found.`);
  }
};