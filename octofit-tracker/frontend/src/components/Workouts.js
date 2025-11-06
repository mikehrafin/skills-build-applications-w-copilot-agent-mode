import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const codespace = process.env.REACT_APP_CODESPACE_NAME;
        const apiUrl = codespace 
          ? `https://${codespace}-8000.app.github.dev/api/workouts/`
          : 'http://localhost:8000/api/workouts/';
        
        console.log('Fetching workouts from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        console.log('Workouts data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        setWorkouts(workoutsData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching workouts:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWorkouts();
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
        <h4 className="text-danger">Error Loading Workouts</h4>
        <p className="text-danger">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4">
        <i className="bi bi-heart-pulse me-2"></i>
        Workouts
      </h2>
      <div className="row">
        {workouts.map((workout) => (
          <div key={workout.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">
                  <i className="bi bi-lightning-charge me-2"></i>
                  {workout.name}
                </h5>
                <p className="card-text">{workout.description}</p>
              </div>
              <div className="card-footer bg-transparent">
                <small className="text-muted">
                  <i className="bi bi-bookmark me-1"></i>
                  Workout #{workout.id}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
      {workouts.length === 0 && (
        <div className="alert alert-info mt-3">
          No workouts available at this time.
        </div>
      )}
    </div>
  );
}

export default Workouts;
