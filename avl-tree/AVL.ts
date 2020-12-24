class TreeNode<T> {
  key: T;
  height: number;
  left: TreeNode<T>;
  right: TreeNode<T>;
  getOutput(level: number) {
    let result = '';
    if (this.right !== null) {
      result += this.right.getOutput(level + 1);
    }
    for (let i = 0; i < level; i++) {
      result += '   ';
    }
    result += this.key + '\n';

    if (this.left !== null) {
      result += this.left.getOutput(level + 1);
    }

    return result;
  }
  private turnRight() {
    const child: TreeNode<T> = this.left;
    this.left = this.right;
    child.right = this;
    this.updateHeight();
    child.updateHeight();

    return child;
  }
  private turnLeft() {
    const child: TreeNode<T> = this.right;
    this.right = this.left;
    child.left = this;
    this.updateHeight();
    child.updateHeight();

    return child;
  }

  private differenceHeight() {
    return (this.right === null ? 0 : this.right.height) - (this.left === null ? 0 : this.left.height);
  }
  private updateHeight() {
    const rightHeight = this.right === null ? 0 : this.right.height;
    const leftHeight = this.left === null ? 0 : this.left.height;

    this.height = Math.max(rightHeight, leftHeight) + 1;
  }
  balance() {
    this.updateHeight();

    if (this.differenceHeight() == 2) {
      if (this.right.differenceHeight() < 0) {
        this.right = this.right.turnRight();
      } else {
        return this.turnLeft();
      }
    }
    if (this.differenceHeight() == -2) {
      if (this.left.differenceHeight() > 0) {
        this.left = this.left.turnLeft();
      } else {
        return this.turnRight();
      }
    }

    return this;
  }

  hasKey(key: T) {
    if (this.key === key) {
      return true;
    }
    if (this.left && this.left.hasKey(key)) {
      return true;
    }
    if (this.right && this.right.hasKey(key)) {
      return true;
    }
    return false;
  }

  remove(key: T) {
    if (key < this.key) {
      // @ts-ignore
      this.left = this.left === null ? null : this.left.remove(key);
    } else if (key > this.key) {
      // @ts-ignore
      this.right = this.right === null ? null : this.right.remove(key);
    } else {
      if (this.right === null) return this.left;

      const min: TreeNode<T> = this.right.findMin();
      min.right = this.right.delMin();

      min.left = this.left;
      return min.balance();
    }
    return this.balance();
  }

  // @ts-ignore
  private findMin() {
    if (this.left !== null) {
      return this.left.findMin();
    }
    return this;
  }

  private delMin() {
    if (this.left == null) {
      return this.right;
    }
    this.left = this.left.delMin();

    return this.balance();
  }

  constructor(key: T) {
    this.key = key;
    // @ts-ignore
    this.left = null;
    // @ts-ignore
    this.right = null;
    this.height = 1;
  }
}
export class AvlTree<T = number> {
  private root = null;

  private pushNode(key: T, node: TreeNode<T>) {
    if (node === null) {
      return new TreeNode(key);
    }
    if (key < node.key) {
      node.left = this.pushNode(key, node.left);
    } else {
      node.right = this.pushNode(key, node.right);
    }
    return node.balance();
  }

  constructor() {
    this.root = null;
  }

  push(key: T) {
    // @ts-ignore
    this.root = this.pushNode(key, this.root);
  }

  pop(key: T) {
    // @ts-ignore
    if (key === this.root.key) {
      // @ts-ignore
      this.root = this.root.remove(key);
    } else {
      // @ts-ignore
      this.root.remove(key);
    }
  }

  hasKey(key: T) {
    if (this.root !== null) {
      // @ts-ignore
      return this.root.hasKey(key);
    }

    return false;
  }

  get output() {
    if (this.root === null) return '';

    // @ts-ignore
    return this.root.getOutput(0);
  }
}