import { Card, Hand, Rank, Variable } from './types';

const VARS = ['x', 'y', 'z'] as Card[];

export class HandMatcher {
  public match(hand: Hand, pattern: Card[]): boolean {
    // parse hand and pattern to Map<rank, count>
    const handMap = this.parse(hand);
    const patternMap = this.parse(pattern);

    // split pattern into cards and variables
    const patternCards = new Map<Rank, number>();
    const patternVariables = new Map<Card, number>();
    patternMap.forEach((value, key) =>
      VARS.includes(key)
        ? patternVariables.set(key, value)
        : patternCards.set(key as Rank, value)
    );

    // take cards from hand
    for (const entry of patternCards) {
      const [rank, count] = entry;
      if (!handMap.has(rank)) {
        // cards of this rank not found on hand - rules does not match
        return false;
      }

      const cardsLeft = handMap.get(rank)! - count;

      if (cardsLeft < 0) {
        // not enough cards of this rank
        return false;
      } else if (cardsLeft === 0) {
        // all cards of this rank have been taken
        handMap.delete(rank);
      } else {
        handMap.set(rank, cardsLeft);
      }
    }

    // take variable matches from hand (both hand and pattern are sorted by count so
    // we are matching starting from the highest count)
    for (const count of patternVariables.values()) {
      const match = [...handMap.entries()].find(
        (entry: [Card, number]) => entry[1] >= count
      );

      if (!match) {
        // match was not found on hand
        return false;
      }

      // remove matching rank from hand
      const [matchRank] = match;
      handMap.delete(matchRank);
    }

    return true;
  }

  private parse(input: Card[]): Map<Card, number> {
    // count the number of each rank/var
    const cardSet = input.reduce((acc: Map<Card, number>, val: Card) => {
      if (acc.has(val)) {
        const count = acc.get(val)! + 1;
        acc.set(val, count);
      } else {
        acc.set(val, 1);
      }
      return acc;
    }, new Map<Card, number>());

    // sort by value
    return new Map([...cardSet.entries()].sort((a, b) => b[1] - a[1]));
  }
}
