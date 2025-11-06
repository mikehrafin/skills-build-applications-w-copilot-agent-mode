import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function Home() {
  return (
    <div className="container mt-5">
      <div className="home-container">
        <h1 className="display-4">Welcome to OctoFit Tracker</h1>
        <p className="lead">Track your fitness activities, compete with teams, and stay motivated!</p>
        <hr className="my-4" />
        <div className="row mt-5">
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body text-center">
                <i className="bi bi-activity" style={{fontSize: '3rem', color: '#667eea'}}></i>
                <h5 className="card-title mt-3">Activities</h5>
                <p className="card-text">Log and track your fitness activities</p>
                <Link to="/activities" className="btn btn-primary">View Activities</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body text-center">
                <i className="bi bi-people" style={{fontSize: '3rem', color: '#667eea'}}></i>
                <h5 className="card-title mt-3">Teams</h5>
                <p className="card-text">Join teams and compete together</p>
                <Link to="/teams" className="btn btn-primary">View Teams</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body text-center">
                <i className="bi bi-trophy" style={{fontSize: '3rem', color: '#667eea'}}></i>
                <h5 className="card-title mt-3">Leaderboard</h5>
                <p className="card-text">See who's leading the competition</p>
                <Link to="/leaderboard" className="btn btn-primary">View Leaderboard</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body text-center">
                <i className="bi bi-person-circle" style={{fontSize: '3rem', color: '#667eea'}}></i>
                <h5 className="card-title mt-3">Users</h5>
                <p className="card-text">View all registered users and their teams</p>
                <Link to="/users" className="btn btn-primary">View Users</Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body text-center">
                <i className="bi bi-heart-pulse" style={{fontSize: '3rem', color: '#667eea'}}></i>
                <h5 className="card-title mt-3">Workouts</h5>
                <p className="card-text">Browse personalized workout suggestions</p>
                <Link to="/workouts" className="btn btn-primary">View Workouts</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src="/octofitapp-small.png" alt="OctoFit Logo" />
              OctoFit Tracker
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">Activities</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">Teams</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">Workouts</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
