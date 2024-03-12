import { HandMatcher } from './HandMatcher';
import { Result, Rule } from './interfaces';
import { Hand } from './types';

export class CardGame {
  constructor(private readonly handMatcher: HandMatcher) {}

  public play(rules: Rule[], hands: Hand[]): Result[] {
    // sort rules by score to match starting form the highest
    rules.sort((a, b) => b.score - a.score);

    return hands.reduce((acc: Result[], hand: Hand) => {
      let score = 0;

      // match rules starting from the highest score
      for (const rule of rules) {
        if (this.handMatcher.match(hand, rule.pattern)) {
          score = rule.score;
          break;
        }
      }

      acc.push({ hand, score });
      return acc;
    }, []);
  }
}
