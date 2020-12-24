import * as readline from 'readline';
import { Graph } from './Kruskal';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let input = '';

rl.on('line', (line) => {
  if (line) {
    input += '\n' + line;
  } else {
    const graph = new Graph([]);
    graph.fillFromString(input);
    const result = graph.getMinFrameAsString();
    console.log(result);
    process.exit();
  }
});
