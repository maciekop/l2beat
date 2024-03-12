import { CardGame } from './CardGame';
import { HandMatcher } from './HandMatcher';
import { Result, Rule } from './interfaces';
import { Card, Hand } from './types';

const mockMatch = jest.fn();

jest.mock('./HandMatcher', () => {
  return {
    HandMatcher: jest.fn().mockImplementation(() => ({
      match: mockMatch
    }))
  };
});

const compareArrays = (a: string[], b: string[]): boolean =>
  a.length === b.length && a.every((element, index) => element === b[index]);

describe('CardGame', () => {
  describe('play', () => {
    it('should match rule with the highest score for each rule', () => {
      const mockRules = [
        { pattern: ['5', '5', '5'], score: 5 },
        { pattern: ['A', 'x', 'x'], score: 7 },
        { pattern: ['x', 'x', 'x', 'y', 'y'], score: 20 },
        { pattern: ['x', 'x', 'x'], score: 10 }
      ] as Rule[];

      const mockHands = [
        ['2', '2', '2', 'K', 'K'],
        ['5', '5', '5']
      ] as Hand[];

      mockMatch.mockImplementation((hand: Hand, pattern: Card[]): boolean => {
        if (
          (compareArrays(pattern, mockRules[2].pattern) &&
            compareArrays(hand, mockHands[0])) ||
          (compareArrays(pattern, mockRules[3].pattern) &&
            compareArrays(hand, mockHands[1]))
        ) {
          return true;
        }

        return false;
      });

      const expectedResult = [
        { hand: ['2', '2', '2', 'K', 'K'], score: 20 },
        { hand: ['5', '5', '5'], score: 10 }
      ] as Result[];

      const mockHandMatcher = new HandMatcher();
      const cardGame = new CardGame(mockHandMatcher);

      const result = cardGame.play([...mockRules], [...mockHands]);

      expect(result).toEqual(expectedResult);
    });
  });
});
