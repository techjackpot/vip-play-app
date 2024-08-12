import React, { useEffect, useState } from 'react';

export default function EventPreview() {
  return (
    <div className="event-details preview-loading">
      <div className="event-content">
        <div className="event-teams">
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
