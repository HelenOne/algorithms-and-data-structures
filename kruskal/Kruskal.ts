type Connection = {
  from: string;
  to: string;
  weight: number;
};
type WeightlessConnection = Omit<Connection, 'weight'>;

export class Graph {
  constructor(connections: Connection[]) {
    this.connections = connections;
  }
  fillFromString(description: string = '') {
    const nodesDescription = description.toString().split('\n');
    for (let node of nodesDescription) {
      const parent: string = node.split(' ')[0];
      const child: string = node.split(' ')[1];
      const weight: number = parseInt(node.split(' ')[2], 10);
      // @ts-ignore
      if (![parent, child, weight].includes(undefined) && !isNaN(weight)) {
        this.connections.push({
          from: parent,
          to: child,
          weight
        });
      }
    }
  }
  connections: Connection[];
  getMinFrame() {
    const result: WeightlessConnection[] = [];
    const sortedConnections: Connection[] = [...this.connections].sort((a, b) => a.weight - b.weight);
    const frameOfNode: { [frameRoot: string]: string } = {};
    for (const connection of sortedConnections) {
      frameOfNode[connection.from] = connection.from;
      frameOfNode[connection.to] = connection.to;
    }
    const replaceFrame = (oldFrame: string, newFrame: string) => {
      for (const connection of sortedConnections) {
        if (frameOfNode[connection.from] == oldFrame) {
          frameOfNode[connection.from] = newFrame;
        }
        if (frameOfNode[connection.to] == oldFrame) {
          frameOfNode[connection.to] = newFrame;
        }
      }
    };
    let sumWeight: number = 0;
    for (const connection of sortedConnections) {
      const { from, to, weight } = connection;
      if (frameOfNode[from] !== frameOfNode[to]) {
        sumWeight += weight;
        result.push({ from, to });
        const parentFrame = frameOfNode[from];
        const childFrame = frameOfNode[to];
        replaceFrame(childFrame, parentFrame);
      }
    }
    return {
      pairs: result,
      weight: sumWeight
    };
  }
  getMinFrameAsString() {
    const minFrame = this.getMinFrame();
    const connections = minFrame.pairs.map(({ from, to }) => `${from} ${to}`).join('\n');

    return `${connections}\n${minFrame.weight}`;
  }
}
