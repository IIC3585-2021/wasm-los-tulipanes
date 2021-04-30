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
    console.log(match);
    if (!match) throw new Error('invalid edge');
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
}
