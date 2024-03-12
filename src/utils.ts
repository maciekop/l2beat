import * as fs from 'fs';
import { Rule } from './interfaces';
import { Hand, Rank } from './types';

export function validateInput(argv: string[]) {
  if (argv.length !== 4) {
    throw new Error(
      'Please provide paths to rules and hands files (example: npm start rules.json hands.{json|txt})'
    );
  }

  const [, , rulesFilePath, handsFilePath] = argv;

  if (!fs.existsSync(rulesFilePath) || !rulesFilePath.endsWith('.json')) {
    throw new Error(
      `Rules file ${rulesFilePath} does not exist or is not a json file`
    );
  }

  if (
    !fs.existsSync(handsFilePath) ||
    (!handsFilePath.endsWith('json') && !handsFilePath.endsWith('.txt'))
  ) {
    throw new Error(
      `Hands file ${handsFilePath} does not exist or is not json/txt file`
    );
  }

  return [rulesFilePath, handsFilePath];
}

export function loadRules(rulesFilePath: string): Rule[] {
  const rulesContent = fs.readFileSync(rulesFilePath, 'utf-8');
  const input: { [pattern: string]: number } = JSON.parse(rulesContent);

  return Object.keys(input).map((key: string) => {
    return {
      pattern: key.split(' '),
      score: input[key]
    } as Rule;
  });
}

export function loadHands(handsFilePath: string): Hand[] {
  const handsContent = fs.readFileSync(handsFilePath, 'utf-8');

  if (handsFilePath.endsWith('json')) {
    const input: string[][] = JSON.parse(handsContent);
    return input.map((hand: string[]) => hand.map(mapToRank));
  } else {
    return handsContent.split('\n').map((hand) => hand.split(' ')) as Hand[];
  }
}

function mapToRank(input: string): Rank {
  let rank: string;

  switch (input) {
    case 'Ace':
      rank = 'A';
      break;
    case 'King':
      rank = 'K';
      break;
    case 'Queen':
      rank = 'Q';
      break;
    case 'Jack':
      rank = 'J';
      break;
    default:
      rank = input;
  }

  return rank as Rank;
}
