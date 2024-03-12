import * as fs from 'fs';
import { loadHands, loadRules, validateInput } from './utils';
import { Rule } from './interfaces';
import { Hand } from './types';

describe('utils', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('validateInput', () => {
    const mockRulesFilePath = 'rules.json';
    const mockHandsFilePath = 'hands.json';
    const mockArgv = ['1', '2', mockRulesFilePath, mockHandsFilePath];

    it('should throw error if not enough args', () => {
      const mockArgv: string[] = [];
      expect(() => validateInput(mockArgv)).toThrow(
        new Error(
          'Please provide paths to rules and hands files (example: npm start rules.json hands.{json|txt})'
        )
      );
    });

    it('should throw error if rules file does not exist', () => {
      jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false);
      expect(() => validateInput(mockArgv)).toThrow(
        new Error(
          `Rules file ${mockRulesFilePath} does not exist or is not a json file`
        )
      );
    });

    it('should throw error if hands file does not exist', () => {
      jest.spyOn(fs, 'existsSync').mockReturnValueOnce(true);
      jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false);
      expect(() => validateInput(mockArgv)).toThrow(
        new Error(
          `Hands file ${mockHandsFilePath} does not exist or is not json/txt file`
        )
      );
    });
  });

  describe('loadRules', () => {
    it('should load rules from json content', () => {
      const mockRules = `{
        "x x x y y": 20,
        "x x x": 10,
        "A x x": 7,
        "5 5 5": 5
      }`;

      const expectedResult = [
        { pattern: ['x', 'x', 'x', 'y', 'y'], score: 20 },
        { pattern: ['x', 'x', 'x'], score: 10 },
        { pattern: ['A', 'x', 'x'], score: 7 },
        { pattern: ['5', '5', '5'], score: 5 }
      ] as Rule[];

      jest.spyOn(fs, 'readFileSync').mockReturnValue(mockRules);

      const result = loadRules('rules.json');

      expect(result).toEqual(expectedResult);
    });
  });

  describe('loadHands', () => {
    it('should load hands from json content', () => {
      const mockHand = `[["2","2","2","King","King"],["5","5","5"]]`;
      jest.spyOn(fs, 'readFileSync').mockReturnValue(mockHand);

      const expectedResult = [
        ['2', '2', '2', 'K', 'K'],
        ['5', '5', '5']
      ] as Hand[];

      const result = loadHands('hands.json');

      expect(result).toEqual(expectedResult);
    });

    it('should load hands from txt content', () => {
      const mockHand = `[["2","2","2","King","King"],["5","5","5"]]`;
      jest.spyOn(fs, 'readFileSync').mockReturnValue(mockHand);

      const expectedResult = [
        ['2', '2', '2', 'K', 'K'],
        ['5', '5', '5']
      ] as Hand[];

      const result = loadHands('hands.json');

      expect(result).toEqual(expectedResult);
    });
  });
});
