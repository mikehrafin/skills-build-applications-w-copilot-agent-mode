import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const codespace = process.env.REACT_APP_CODESPACE_NAME;
        const apiUrl = codespace 
          ? `https://${codespace}-8000.app.github.dev/api/leaderboard/`
          : 'http://localhost:8000/api/leaderboard/';
        
        console.log('Fetching leaderboard from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        console.log('Leaderboard data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        setLeaderboard(leaderboardData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return (
    <div className="container mt-5">
      <div className="loading-spinner">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="container mt-5">
      <div className="error-message">
        <h4 className="text-danger">Error Loading Leaderboard</h4>
        <p className="text-danger">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4">
        <i className="bi bi-trophy me-2"></i>
        Leaderboard
      </h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Team ID</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard
              .sort((a, b) => a.rank - b.rank)
              .map((entry, index) => (
                <tr key={entry.id} className={index === 0 ? 'table-warning' : ''}>
                  <td>
                    <strong>
                      {entry.rank === 1 && '🥇 '}
                      {entry.rank === 2 && '🥈 '}
                      {entry.rank === 3 && '🥉 '}
                      #{entry.rank}
                    </strong>
                  </td>
                  <td>
                    <span className="badge bg-info">Team {entry.team}</span>
                  </td>
                  <td>
                    <strong>{entry.points}</strong> pts
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {leaderboard.length === 0 && (
        <div className="alert alert-info mt-3">
          No leaderboard data available.
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
