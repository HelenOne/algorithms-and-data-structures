import { AvlTree } from './AVL';

describe('AVL Tree', () => {
  it('should allow to push', () => {
    const tree = new AvlTree();

    tree.push(1);
    tree.push(1);
    tree.push(1);

    expect(tree.output).toBe(`   1\n1\n   1\n`);
  });
  it('should balance simple tree', () => {
    const tree = new AvlTree();

    tree.push(9);
    tree.push(3);
    tree.push(0);

    expect(tree.output).toBe(`   9\n3\n   0\n`);
  });
  it('should allow to remove', () => {
    const tree = new AvlTree();

    tree.push(9);
    tree.push(3);
    tree.push(0);
    tree.pop(3);

    expect(tree.output).toBe(`9\n   0\n`);
  });
  it('should allow to check key existing', () => {
    const tree = new AvlTree();

    tree.push(9);
    tree.push(3);
    tree.push(10);
    tree.push(3);
    tree.push(15);
    tree.push(0);
    tree.pop(3);
    tree.push(18);
    tree.push(15);
    tree.push(0);
    tree.pop(3);

    expect(tree.hasKey(18)).toBeTruthy();
    expect(tree.hasKey(11)).toBeFalsy();
  });
});
