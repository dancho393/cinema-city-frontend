import React from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ rating }) => {
  return (
    <div>
      {[...Array(5)].map((star, index) => {
        const value = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={value}
              disabled
            />
            <FaStar
              className="star"
              color={value <= rating ? '#ffc107' : '#e4e5e9'}
              size={25}
            />
          </label>
        );
      })}
      
    </div>
  );
};

export default StarRating;