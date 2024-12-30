import React, { useState } from 'react';

const choices = ['rock', 'paper', 'scissors'] as const;
type Choice = typeof choices[number];

const emojis: Record<Choice, string> = {
  rock: '✊',
  paper: '✋',
  scissors: '✌️'
};

export default function RockPaperScissors() {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<string>('');
  const [score, setScore] = useState({ player: 0, computer: 0 });

  const determineWinner = (player: Choice, computer: Choice) => {
    if (player === computer) return 'draw';
    if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      return 'win';
    }
    return 'lose';
  };

  const play = (choice: Choice) => {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    setPlayerChoice(choice);
    setComputerChoice(computerChoice);

    const gameResult = determineWinner(choice, computerChoice);
    
    if (gameResult === 'win') {
      setResult('You win! 🎉');
      setScore(prev => ({ ...prev, player: prev.player + 1 }));
    } else if (gameResult === 'lose') {
      setResult('Computer wins! 😢');
      setScore(prev => ({ ...prev, computer: prev.computer + 1 }));
    } else {
      setResult("It's a draw! 🤝");
    }
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult('');
    setScore({ player: 0, computer: 0 });
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4">Rock Paper Scissors</h2>
      
      <div className="mb-6 text-center">
        <div className="text-lg mb-2">Score</div>
        <div className="flex justify-center space-x-4">
          <div>Player: {score.player}</div>
          <div>Computer: {score.computer}</div>
        </div>
      </div>

      <div className="flex justify-center space-x-4 mb-8">
        {choices.map(choice => (
          <button
            key={choice}
            className="w-20 h-20 text-3xl bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
            onClick={() => play(choice)}
          >
            {emojis[choice]}
          </button>
        ))}
      </div>

      {playerChoice && computerChoice && (
        <div className="text-center mb-6">
          <div className="text-2xl mb-4">
            <span className="mr-4">You: {emojis[playerChoice]}</span>
            <span>vs</span>
            <span className="ml-4">Computer: {emojis[computerChoice]}</span>
          </div>
          <div className="text-xl font-bold">{result}</div>
        </div>
      )}

      <button
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        onClick={resetGame}
      >
        Reset Score
      </button>
    </div>
  );
}