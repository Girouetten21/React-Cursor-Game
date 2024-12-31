import React from 'react';

const Score = ({ score, incrementScore }) => {
  const handleIncrement = (value) => {
    incrementScore(value);
  };

  return (
    <div className="score">
      <h2>Score: {score}</h2>
    </div>
  );
};

export default Score;