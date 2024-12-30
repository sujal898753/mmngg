import React, { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [score, setScore] = useState(0);
  const [target, setTarget] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  const generateTarget = () => {
    const newTarget = Math.floor(Math.random() * 100) + 1;
    setTarget(newTarget);
    setDisplay('0');
    setEquation('');
    setMessage('');
  };

  const handleNumber = (num: string) => {
    if (display === '0') {
      setDisplay(num);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const handleEquals = () => {
    if (!target) return;

    try {
      const result = eval(equation + display);
      setDisplay(result.toString());
      setEquation('');

      if (result === target) {
        setScore(score + 1);
        setMessage('Correct! 🎉');
        setTimeout(generateTarget, 1500);
      } else {
        setMessage('Try again! 🤔');
      }
    } catch (error) {
      setDisplay('Error');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setMessage('');
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4">Calculator Game</h2>
      
      <div className="mb-4 text-center">
        <p className="text-lg">Score: {score}</p>
        {target && <p className="text-xl font-bold">Target: {target}</p>}
        {message && <p className="text-lg text-indigo-600">{message}</p>}
      </div>

      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <div className="bg-white p-2 mb-4 rounded text-right text-xl">
          {equation && <div className="text-sm text-gray-600">{equation}</div>}
          {display}
        </div>

        <div className="grid grid-cols-4 gap-2">
          {['7', '8', '9', '+'].map(btn => (
            <button
              key={btn}
              className="bg-white p-2 rounded shadow hover:bg-gray-50"
              onClick={() => isNaN(Number(btn)) ? handleOperator(btn) : handleNumber(btn)}
            >
              {btn}
            </button>
          ))}
          {['4', '5', '6', '-'].map(btn => (
            <button
              key={btn}
              className="bg-white p-2 rounded shadow hover:bg-gray-50"
              onClick={() => isNaN(Number(btn)) ? handleOperator(btn) : handleNumber(btn)}
            >
              {btn}
            </button>
          ))}
          {['1', '2', '3', '*'].map(btn => (
            <button
              key={btn}
              className="bg-white p-2 rounded shadow hover:bg-gray-50"
              onClick={() => isNaN(Number(btn)) ? handleOperator(btn) : handleNumber(btn)}
            >
              {btn}
            </button>
          ))}
          {['0', 'C', '=', '/'].map(btn => (
            <button
              key={btn}
              className="bg-white p-2 rounded shadow hover:bg-gray-50"
              onClick={() => {
                if (btn === 'C') handleClear();
                else if (btn === '=') handleEquals();
                else if (isNaN(Number(btn))) handleOperator(btn);
                else handleNumber(btn);
              }}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>

      <button
        className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        onClick={generateTarget}
      >
        New Target
      </button>
    </div>
  );
}