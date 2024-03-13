import React, { useState, useEffect } from 'react';
import './Seats.css';
import Navbar from './navigation/Navbar';

const Seats = (props) => {
  const totalSeats = 32;
  const seatsPerRow = 8;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatsData, setSeatsData] = useState(null);
  const [error, setError] = useState(null);
  const { token } = props.location.state || {};

  useEffect(() => {
    const fetchData = async () => {
      const method = "GET";
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const selectedDate = new Date(props.location.state.date);
      const formattedDate = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;

      const projectionTime = formattedDate + " " + props.location.state.hour;
      const body = JSON.stringify({
        projectionTime: projectionTime,
        movieId: props.location.state.movieId,
      });
      const getUrl = `http://localhost:8081/api/v1/projection?projectionTime=${projectionTime}&movieId=${props.location.state.movieId}`;
      try {
        const response = await fetch(getUrl, {
          method,
          headers,
        });

        if (!response.ok) {
          throw new Error('GET request failed');
        }

        const result = await response.json();
        setSeatsData(result);
      } catch (getError) {
        console.error('Error fetching data with GET request:', getError.message);

        const secondMethod = 'POST';
        const postUrl = "http://localhost:8081/api/v1/projection";

        try {
          const secondResponse = await fetch(postUrl, {
            method: secondMethod,
            headers,
            body,
          });

          if (!secondResponse.ok) {
            throw new Error('Both GET and POST requests failed');
          }

          const result = await secondResponse.json();
          setSeatsData(result);
        } catch (postError) {
          console.error('Error fetching data with POST request:', postError.message);
          setError('Both GET and POST requests failed');
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(seatsData);
  }, [seatsData]);

  const handleSeatClick = (seatNumber, isFree) => {
    if (isFree) {
      setSelectedSeats((prevSelectedSeats) => {
        if (prevSelectedSeats.includes(seatNumber)) {
          return prevSelectedSeats.filter((seat) => seat !== seatNumber);
        } else {
          return [...prevSelectedSeats, seatNumber];
        }
      });
    } else {
      // Handle logic for already taken seats (if needed)
    }
  };

  return (
    <div className="seats-container">
      <Navbar/>
      <h2>Select your seats</h2>
      <div className="seats-grid">
        {seatsData &&
          seatsData.seats.map((seat) => {
            const seatNumber = seat.column + (seat.row - 1) * seatsPerRow;
            const isSelected = selectedSeats.includes(seatNumber);
            const isEndOfRow = seatNumber % seatsPerRow === 0;

            return (
              <div
                key={seat.id}
                className={`seat ${seat.free ? 'free' : 'taken'} ${isSelected ? 'selected' : ''} ${
                  isEndOfRow ? 'end-of-row' : ''
                }`}
                onClick={() => handleSeatClick(seatNumber, seat.free)}
              >
                {seatNumber}
              </div>
            );
          })}
      </div>
      <p>You selected {selectedSeats.length} seat(s): {selectedSeats.join(', ')}</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Seats;
