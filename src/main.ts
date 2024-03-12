import { CardGame } from './CardGame';
import { HandMatcher } from './HandMatcher';
import { Result } from './interfaces';
import { loadHands, loadRules, validateInput } from './utils';

try {
  const [rulesFilePath, handsFilePath] = validateInput(process.argv);
  const rules = loadRules(rulesFilePath);
  const hands = loadHands(handsFilePath);

  const handMatcher = new HandMatcher();
  const cardGame = new CardGame(handMatcher);

  const results = cardGame.play(rules, hands);
  results.forEach((result: Result) => {
    console.log(`${result.hand.join(' ')} (${result.score} points)`);
  });
} catch (error: any) {
  console.log(error.message);
}
