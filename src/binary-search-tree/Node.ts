export default class Node {
  data: number;

  left: null | Node = null;

  right: null | Node = null;

  height = 0;

  constructor(data: number) {
    this.data = data;
  }
}
