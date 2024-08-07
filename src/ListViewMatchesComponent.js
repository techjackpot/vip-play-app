import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import './ListViewMatchesComponent.scss'; // Import the styles

const ListViewMatchesComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get('https://your-api-endpoint.com/data');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Initial data fetch
    fetchData();

    // Setup socket connection for live updates
    const socket = io('https://your-socket-server.com');
    socket.on('dataUpdate', (newData) => {
      setData(newData);
    });

    // Cleanup socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div class="listviewmatches-container">
      <h1>Live Data Component</h1>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default ListViewMatchesComponent;