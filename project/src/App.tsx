import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import GameCard from './components/GameCard';
import { games } from './constants/games';
import TicTacToe from './games/TicTacToe';
import Snake from './games/Snake';
import MemoryMatch from './games/MemoryMatch';
import RockPaperScissors from './games/RockPaperScissors';
import Calculator from './games/Calculator';
import GuessNumber from './games/GuessNumber';

const gameComponents = {
  tictactoe: TicTacToe,
  snake: Snake,
  memory: MemoryMatch,
  rps: RockPaperScissors,
  calculator: Calculator,
  guessnumber: GuessNumber
};

function App() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const GameComponent = selectedGame ? gameComponents[selectedGame as keyof typeof gameComponents] : null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {!selectedGame ? (
          <>
            <h1 className="text-4xl font-bold text-center mb-8">Welcome to GameHub</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map(game => (
                <GameCard
                  key={game.id}
                  title={game.title}
                  description={game.description}
                  icon={game.icon}
                  onClick={() => setSelectedGame(game.id)}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-2xl mx-auto">
            <button
              className="mb-4 flex items-center text-indigo-600 hover:text-indigo-800"
              onClick={() => setSelectedGame(null)}
            >
              ← Back to Games
            </button>
            {GameComponent && <GameComponent />}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;