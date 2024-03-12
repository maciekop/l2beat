import { Card, Hand } from './types';

export interface Rule {
  pattern: Card[];
  score: number;
}

export interface Result {
  hand: Hand;
  score: number;
}
