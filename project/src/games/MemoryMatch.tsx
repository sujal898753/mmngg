import React, { useState, useEffect } from 'react';

const CARD_SYMBOLS = ['🎮', '🎲', '🎯', '🎪', '🎨', '🎭', '🎪', '🎨', '🎭', '🎮', '🎲', '🎯'];

export default function MemoryMatch() {
  const [cards, setCards] = useState<Array<{ symbol: string; isFlipped: boolean; isMatched: boolean }>>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffledCards = [...CARD_SYMBOLS]
      .sort(() => Math.random() - 0.5)
      .map(symbol => ({
        symbol,
        isFlipped: false,
        isMatched: false
      }));
    setCards(shuffledCards);
    setFlippedIndices([]);
    setMoves(0);
    setMatches(0);
  };

  const handleCardClick = (index: number) => {
    if (
      flippedIndices.length === 2 ||
      cards[index].isFlipped ||
      cards[index].isMatched
    ) {
      return;
    }

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      setMoves(m => m + 1);
      
      const [firstIndex, secondIndex] = newFlippedIndices;
      if (cards[firstIndex].symbol === cards[secondIndex].symbol) {
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[firstIndex].isMatched = true;
          matchedCards[secondIndex].isMatched = true;
          setCards(matchedCards);
          setFlippedIndices([]);
          setMatches(m => m + 1);
        }, 500);
      } else {
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[firstIndex].isFlipped = false;
          resetCards[secondIndex].isFlipped = false;
          setCards(resetCards);
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4">Memory Match</h2>
      <div className="mb-4">
        <p className="text-lg">Moves: {moves}</p>
        <p className="text-lg">Matches: {matches}</p>
      </div>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {cards.map((card, index) => (
          <button
            key={index}
            className={`w-16 h-16 text-2xl rounded-lg transition-all duration-300 transform ${
              card.isFlipped || card.isMatched
                ? 'bg-indigo-200 rotate-0'
                : 'bg-indigo-600 rotate-180'
            }`}
            onClick={() => handleCardClick(index)}
          >
            {(card.isFlipped || card.isMatched) && card.symbol}
          </button>
        ))}
      </div>
      <button
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        onClick={initializeGame}
      >
        New Game
      </button>
    </div>
  );
}