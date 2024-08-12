import TeamDetails from "./TeamDetails";

export default function() {
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
