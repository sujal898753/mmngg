import React, { useState, useEffect } from 'react';

export default function GuessNumber() {
  const [target, setTarget] = useState(0);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [bestScore, setBestScore] = useState(Infinity);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    setTarget(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setMessage('Guess a number between 1 and 100');
    setAttempts(0);
    setGameOver(false);
  };

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (gameOver) return;

    const numberGuess = parseInt(guess);
    if (isNaN(numberGuess)) {
      setMessage('Please enter a valid number');
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (numberGuess === target) {
      setMessage(`Congratulations! You got it in ${newAttempts} attempts! 🎉`);
      if (newAttempts < bestScore) {
        setBestScore(newAttempts);
      }
      setGameOver(true);
    } else if (numberGuess < target) {
      setMessage('Too low! Try a higher number 📈');
    } else {
      setMessage('Too high! Try a lower number 📉');
    }

    setGuess('');
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4">Guess the Number</h2>
      
      <div className="mb-4 text-center">
        <p className="text-lg">Attempts: {attempts}</p>
        {bestScore < Infinity && (
          <p className="text-lg">Best Score: {bestScore}</p>
        )}
      </div>

      <div className="mb-4 text-lg text-center">
        {message}
      </div>

      <form onSubmit={handleGuess} className="flex flex-col items-center">
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          min="1"
          max="100"
          className="px-4 py-2 border rounded mb-4 text-center w-32"
          placeholder="Enter guess"
        />
        <div className="space-x-4">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            disabled={gameOver}
          >
            Guess
          </button>
          <button
            type="button"
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            onClick={startNewGame}
          >
            New Game
          </button>
        </div>
      </form>

      {gameOver && (
        <div className="mt-4 text-center">
          <p className="text-xl font-bold text-green-600">🎯 You won! 🎯</p>
          <p>Click New Game to play again</p>
        </div>
      )}
    </div>
  );
}