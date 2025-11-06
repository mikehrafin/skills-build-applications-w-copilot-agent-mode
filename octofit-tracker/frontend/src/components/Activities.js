import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const codespace = process.env.REACT_APP_CODESPACE_NAME;
        const apiUrl = codespace 
          ? `https://${codespace}-8000.app.github.dev/api/activities/`
          : 'http://localhost:8000/api/activities/';
        
        console.log('Fetching activities from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        console.log('Activities data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const activitiesData = data.results || data;
        setActivities(activitiesData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchActivities();
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
        <h4 className="text-danger">Error Loading Activities</h4>
        <p className="text-danger">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4">
        <i className="bi bi-activity me-2"></i>
        Activities
      </h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Duration (min)</th>
              <th>Date</th>
              <th>User ID</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.id}>
                <td><strong>{activity.id}</strong></td>
                <td>
                  <span className="badge bg-primary">{activity.type}</span>
                </td>
                <td>{activity.duration}</td>
                <td>{new Date(activity.date).toLocaleDateString()}</td>
                <td>{activity.user}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {activities.length === 0 && (
        <div className="alert alert-info mt-3">
          No activities found. Start tracking your fitness journey!
        </div>
      )}
    </div>
  );
}

export default Activities;
