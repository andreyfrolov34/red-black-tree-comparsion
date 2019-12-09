import Node from './Node';

export default class Tree {
  root: null | Node = null;

  constructor() {
    this.root = null;
  }
  /**
 * insert data
 */

  insert(data: number): void {
    this.root = this.insertNode(this.root, data);
  }

  /**
   * insert node, by recursively finding it's place using data
   */
  insertNode(node: null | Node, data: number): Node {
    if (node === null) return new Node(data);
    if (data < node.data) {
      node.left = this.insertNode(node.left, data);
    } else if (data > node.data) {
      node.right = this.insertNode(node.right, data);
    } else if (node.data === data) {
      return node;
    }
    node.height = 1 + Tree.getSize(node.left) + Tree.getSize(node.right);
    // const resNode: Node = this.balance(node) as Node;
    // TODO for this.balance(node) not work "full stack"
    return node;
  }

  /**
   * function used to balance node
   */
  static balance(node: Node): Node {
    // this.correctHeight(node);
    if (Tree.bFactor(node) === 2) {
      if (Tree.bFactor(node.right) < 0) {
        node.right = Tree.rotateRight(node.right);
      }
      return Tree.rotateLeft(node) as Node;
    }
    if (Tree.bFactor(node) === -2) {
      if (Tree.bFactor(node.left) > 0) {
        node.left = Tree.rotateLeft(node.left);
      }
      return Tree.rotateRight(node) as Node;
    }
    return node;
  }

  /**
   * corrects height of the node, in case left subtree height and right subtree heigth
   * is correct
   */
  static correctHeight(node: Node | null): void {
    let heightLeft = 0;
    let heightRight = 0;
    if (node instanceof Node) {
      heightLeft = Tree.getSize(node.left);
    }
    if (node instanceof Node) {
      heightRight = Tree.getSize(node.right);
    }
    if (node instanceof Node) {
      node.height = ((heightLeft > heightRight) ? heightLeft : heightRight) + 1;
    }
  }

  /**
   * returns balance factor of the node
   */

  static bFactor(node: Node | null): number {
    return Tree.getSize(node ? node.right : null) - Tree.getSize(node ? node.left : null);
  }


  /**
   * perform rotation around specific node
   */
  static rotateRight(node: Node | null): Node | null {
    if (!node) return null;

    const tempNode: Node = node.left as Node;

    node.left = tempNode.right ? tempNode.right : null;
    tempNode.right = node;

    Tree.correctHeight(node);
    Tree.correctHeight(tempNode);

    return tempNode;
  }

  /**
   * perform rotation left around specific node
   */
  static rotateLeft(node: Node | null): Node | null {
    if (!node) return null;
    console.log('rotRight');
    const tempNode = node.right as Node;
    if (tempNode instanceof Node) {
      tempNode.right = node.left;
      node.left = node;
    }


    Tree.correctHeight(node);
    Tree.correctHeight(tempNode);

    return node;
  }


  /**
   * gets node height
   */

  private static getSize(node: Node | null): number {
    if (!node) return 0;

    return node.height;
  }

  /**
   * find min height node
   * @param node
   */

  findMinHeight(node = this.root): number {
    if (node === null) {
      return -1;
    }
    const left: number = this.findMinHeight(node.left);
    const right: number = this.findMinHeight(node.right);
    if (left < right) {
      return left + 1;
    }
    return right + 1;
  }

  /**
   * find max height node
   * @param node
   */

  findMaxHeight(node = this.root): number {
    if (node === null) {
      return -1;
    }
    const left: number = this.findMaxHeight(node.left);
    const right: number = this.findMaxHeight(node.right);
    if (left > right) {
      return left + 1;
    }
    return right + 1;
  }

  isBalanced(): boolean {
    return (this.findMinHeight() >= this.findMaxHeight() - 1);
  }


  /**
   * get node by data value
   * @param data
   * @return node by example: Node { left: null, right: null, height: 0, data: 0 }
   */

  getNode(data: number): Node | null {
    let currentNode = this.root;
    while (currentNode != null) {
      if (data < currentNode.data) currentNode = currentNode.left;
      else if (data > currentNode.data) currentNode = currentNode.right;
      else if (currentNode.data === data) return currentNode;
    }
    return null;
  }

  /**
   * get min node
   */

  getMinNode(node = this.root): Node | null {
    if (node === null) {
      return null;
    }
    let current: Node = node;
    while (current.left != null) {
      current = current.left;
    }
    return current;
  }

  /**
   * get max node
   */

  getMaxNode(node = this.root): Node | null {
    if (node === null) {
      return null;
    }
    let current: Node = node;
    while (current.right != null) {
      current = current.right;
    }
    return current;
  }

  insertNotRecursiveNode(data: number): Node { // TODO need refactor
    const node: null | Node = this.root;
    const newNode = new Node(data);
    if (node === null) {
      this.root = new Node(data);
      return this.root;
    }

    let x: Node | null = node;
    let p: Node | null = null; // must usage var because need override "p" -(((
    while (x != null) {
      p = x;
      if (data <= x.data) {
        x = x.left;
      } else {
        x = x.right;
      }
    }

    if (p && data <= p.data) {
      p.left = newNode;
    } else if (p instanceof Node) {
      p.right = newNode;
    }
    node.height = 1 + Tree.getSize(node.left) + Tree.getSize(node.right);
    return node;
  }

  /**
   * recursive function used to delete node in the tree
   * repressively we are checking
   * if node has no children. if no - return null
   * if node has no left children. if no - return node.right
   * if node has no right children. if no - return node.left
   * if node has two children. if no - return node.left
   * @param  node type Node.
   */

  remove(node: null | Node, data: number): void{
    // eslint-disable-next-line no-shadow
    const removeNode = (node: null | Node, data: number): Node | null => {
      if (node === null) {
        return null;
      }
      if (data === node.data) {
        // node has no children
        if (node.left === null && node.right === null) {
          return null;
        }
        // node has no left children
        if (node.left === null) {
          return node.right;
        }
        // node has no right children
        if (node.right === null) {
          return node.left;
        }
        // node has two children
        // TODO !!! ?
        let tempNode: Node = node.right;
        while (tempNode.left != null) {
          tempNode = tempNode.left;
        }
        node.data = tempNode.data;
        node.right = removeNode(node.right, tempNode.data);
        return Tree.balance(node);
      } if (data < node.data) {
        node.left = removeNode(node.left, data);
        return Tree.balance(node);
      }
      node.right = removeNode(node.right, data);
      return Tree.balance(node);
    };
    removeNode(this.root, data);
  }

  /**
   * recursive function used to delete minimal item in the tree
   * repressively we are checking if node has left child. if no - return right child.
   * @param  node type Node.
   */
  deleteMinNode(): void {
    const deleteMin = (node: Node | null): Node | null => {
      if (node === null) return null;
      if (node.left == null) return node.right;

      node.left = deleteMin(node.left);
      node.height = 1 + Tree.getSize(node.left) + Tree.getSize(node.right);
      return node;
    };
    deleteMin(this.root);
  }


  /**
   * recursive function used to delete maximal node in the tree
   * repressively we are checking if node has right child. if no - return left child.
   * @param  node type Node.
   */

  deleteMaxNode(): void {
    const deleteMax = (node: Node | null): Node | null => {
      if (node === null) return null;
      if (node.right == null) return node.left;

      node.right = deleteMax(node.right);
      node.height = 1 + Tree.getSize(node.right) + Tree.getSize(node.left);
      return node;
    };
    deleteMax(this.root);
  }


  /**
   * get sorting array from array
   */

  getTreeByInOrder(): Array<number> | null {
    if (this.root === null) {
      return null;
    }
    const res: Array<number> = [];
    const inOrder = (node: Node): void => {
      if (node.left) inOrder(node.left);
      res.push(node.data);
      if (node.right)inOrder(node.right);
    };
    inOrder(this.root);
    return res;
  }

  /**
   * get data by array elements in order as in a tree
   */

  getTreeByPrefixOrder(): Array<number> | null {
    if (this.root === null) {
      return null;
    }
    const res: number[] = [];
    const prefixOrder = (node: Node): void => {
      res.push(node.data);
      if (node.left) prefixOrder(node.left);
      if (node.right) prefixOrder(node.right);
    };
    prefixOrder(this.root);
    return res;
  }

  /**
   * get data  by array elements in reverse order as in a tree
   */


  getTreeByPostOrder(): Array<number> | null {
    if (this.root === null) {
      return null;
    }
    const res: number[] = [];
    const postOrder = (node: Node): void => {
      if (node.left) postOrder(node.left);
      if (node.right) postOrder(node.right);
      res.push(node.data);
    };
    postOrder(this.root);
    return res;
  }
}
/**
 *       rotation
 IF tree is right heavy
 {
  IF tree's right subtree is left heavy
  {
     Perform Double Left rotation
  }
  ELSE
  {
     Perform Single Left rotation
  }
}
 ELSE IF tree is left heavy
 {
  IF tree's left subtree is right heavy
  {
     Perform Double Right rotation
  }
  ELSE
  {
     Perform Single Right rotation
  }
}
 */
