const edgeRegex = /^ *([A-z][A-z0-9]*) +([A-z][A-z0-9]*) +(\d+(.?\d+)?) *$/;

export class Edge {
  origin: string;
  destination: string;
  distance: number;

  constructor(origin: string, destination: string, distance: number) {
    this.origin = origin;
    this.destination = destination;
    this.distance = distance;
  }

  static processEdgeText(edgeText: string) {
    const match = edgeText.match(edgeRegex);
    if (!match || match[1] === match[2]) throw new Error('invalid edge');
    return new Edge(match[1], match[2], parseInt(match[3]));
  }

  static isValidEdge(edgeText: string) {
    return edgeRegex.exec(edgeText) ? true : false;
  }

  toString() {
    return `${this.origin} ${this.destination} ${this.distance}`;
  }

  static equals(first: Edge, second: Edge) {
    // (a, b) == (a, b) || (a, b) == (b, a)
    return (
      (first.origin === second.origin &&
        first.destination === second.destination) ||
      (first.origin === second.destination &&
        first.destination === second.origin)
    );
  }
}

export class Adjacency {
  //table: Record<string, Record<string, number>>;
  edges: Edge[];

  constructor() {
    this.edges = [];
  }

  getEdge(origin: string, destination: string) {
    const target = new Edge(origin, destination, 0);
    return this.edges.filter((e) => Edge.equals(e, target))[0];
  }

  edgeExists(edge: Edge) {
    return this.edges.some((e) => Edge.equals(e, edge));
  }

  addEdge(edge: Edge) {
    if (this.edgeExists(edge)) {
      throw new Error('Edge already exists');
    }
    this.edges.push(edge);
  }

  removeEdge(edge: Edge) {
    if (!this.edgeExists(edge)) {
      throw new Error("Edge doesn't exist");
    }
    this.edges = this.edges.filter((e) => !Edge.equals(e, edge));
  }

  getNodes() {
    const nodes: Set<string> = new Set();
    this.edges.forEach((e) => {
      nodes.add(e.origin);
      nodes.add(e.destination);
    });
    return Array.from(nodes).sort();
  }

  static newTable(length: number) {
    const table: Number[][] = Array(length)
      .fill(null)
      .map(() => Array(length).fill(0));

    return table;
  }

  getTable() {
    const nodes = this.getNodes();
    const table = Adjacency.newTable(nodes.length);

    this.edges.forEach((e) => {
      table[nodes.indexOf(e.origin)][nodes.indexOf(e.destination)] = e.distance;
      table[nodes.indexOf(e.destination)][nodes.indexOf(e.origin)] = e.distance;
    });

    return table;
  }

  indexesToVertices(result: number[]) {
    const nodes = this.getNodes();
    return result.map((i) => nodes[i]);
  }

  calculateCost(vertices: string[]) {
    let cost = 0;
    for (let i = 0; i < vertices.length - 1; i++) {
      cost += this.getEdge(vertices[i], vertices[i + 1]).distance;
    }
    return cost;
  }
}
