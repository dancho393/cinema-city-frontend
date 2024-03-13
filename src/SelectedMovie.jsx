// SelectedMovie.jsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './navigation/Navbar';
import StarRating from './images/StarRating';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './SelectedMovie.css';
import { useHistory } from 'react-router-dom';


const hoursOptions = ['11:00', '14:00', '17:00', '21:00'];

const SelectedMovie = (props) => {
  
  const location = useLocation();
  const movie = location.state && location.state.movie;
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const history = useHistory();
  const { token } = props.location.state || {};


  const handleHourChange = (hour) => {
    setSelectedHour(hour);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleButtonClick = (action) => {
    history.push({
      pathname: "/logged/movie/seats",
      state: { 
        movieId: movie.id,
        action:action,
        date:selectedDate,
        hour:selectedHour,
        token:token}
    });
  };

  if (!movie) {
    return <div>No movie data available</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="selected-movie-container">
        <div className="selected-movie-border">
          <div className="selected-movie-header">
            <img src={movie.pictureURL} alt={movie.title} className="selected-movie-image" />
            <h2 className="selected-movie-title">{movie.title}</h2>
          </div>
          <div className="movie-info-container">
            <div className="movie-info-item">
              <strong>Rating:</strong> {movie.rating}
            </div>
            <div className="movie-info-item">
              <strong>Storyline:</strong> {movie.storyLine}
            </div>
            <div className="movie-info-item">
              <strong>Genres:</strong> {movie.genres.join(', ')}
            </div>
            <div className="movie-info-item">
              <strong>Status:</strong> {movie.status}
            </div>
            <div className="movie-info-item">
              <strong>Duration:</strong> {movie.duration}
            </div>
            <div className="movie-info-item">
              <strong>Actors:</strong> {movie.actors}
            </div>
            <div className="movie-info-item">
              <strong>Selected Hour:</strong> {selectedHour}
            </div>
            <div className="movie-info-item">
              <strong>Selected Date:</strong>
              <DatePicker selected={selectedDate} onChange={handleDateChange} />
            </div>
            <div className="movie-info-item">
              <strong>Projections:</strong>
              {hoursOptions.map((hour) => (
                <label key={hour}>
                  <input
                    type="radio"
                    name="projectionHour"
                    value={hour}
                    checked={selectedHour === hour}
                    onChange={() => handleHourChange(hour)}
                  />
                  {hour}
                </label>
              ))}
            </div>
          </div>
          <p className="selected-movie-rating">
            <StarRating rating={movie.rating / 2} />
          </p>
          <div className="selected-movie-buttons">
          <button className="reserve-button" onClick={() => handleButtonClick('reserve')}>
              Reserve
            </button>
            <button className="buy-button" onClick={() => handleButtonClick('buy')}>
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedMovie;
