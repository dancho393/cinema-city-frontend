// Logged.jsx
import React, { useEffect, useState } from 'react';
import Navbar from './navigation/Navbar';
import StarRating from './images/StarRating';
import './Logged.css';
import { useHistory } from 'react-router-dom';

const Logged = (props) => {
  const { token } = props.location.state || {};
  const [moviesData, setMoviesData] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchMoviesData = async () => {
      const url = "http://localhost:8081/api/v1/movie/0";
      const method = "GET";
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      try {
        const response = await fetch(url, { method, headers });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setMoviesData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMoviesData();
  }, [token]);

  const handleTicketButtonClick = (movie) => {
    history.push({
      pathname: "/logged/movie",
      state: { 
        movie: movie,
        token:token
       }
    });
  };

  return (
    <div>
      <Navbar />
      <div className="movies-container">
        {moviesData && moviesData.movies.map(movie => (
          <div key={movie.title} className="movie-container">
            <a href={movie.pictureURL} target="_blank" rel="noopener noreferrer" className="movie-link">
              <img src={movie.pictureURL} alt={movie.title} className="movie-image" />
            </a>
            <div className="dropdown-content">
              <p>{movie.storyLine}</p>
              <button className="dropdown-button" onClick={() => handleTicketButtonClick(movie)}>
                Buy/Reserve Ticket
              </button>
            </div>
            <h3 className="movie-title">{movie.title}</h3>
            <p><StarRating rating={movie.rating / 2} /></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Logged;
