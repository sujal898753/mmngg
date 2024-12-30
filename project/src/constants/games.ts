import { 
  Grid3X3, 
  CircleDot, 
  Brain, 
  Scissors, 
  Calculator,
  Target
} from 'lucide-react';

export const games = [
  {
    id: 'tictactoe',
    title: 'Tic Tac Toe',
    description: "Classic game of X's and O's",
    icon: Grid3X3
  },
  {
    id: 'snake',
    title: 'Snake',
    description: 'Eat the food, grow longer, don\'t hit yourself!',
    icon: CircleDot // Changed from Snake to CircleDot as Snake icon doesn't exist
  },
  {
    id: 'memory',
    title: 'Memory Match',
    description: 'Find matching pairs of cards',
    icon: Brain
  },
  {
    id: 'rps',
    title: 'Rock Paper Scissors',
    description: 'Can you beat the computer?',
    icon: Scissors
  },
  {
    id: 'calculator',
    title: 'Calculator Game',
    description: 'Reach the target number using basic operations',
    icon: Calculator
  },
  {
    id: 'guessnumber',
    title: 'Guess the Number',
    description: 'Guess the secret number between 1 and 100',
    icon: Target
  }
] as const;