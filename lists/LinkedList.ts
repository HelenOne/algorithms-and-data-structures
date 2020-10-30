export class Node<T> {
    public constructor(value: T, next: Node<T>) {
        this.value = value;
        this.next = next;
    }
    public value: T;
    public next?: Node<T>;
}

export class LinkedList<T> {
    public firstNode: Node<T>;
    public lastNode: Node<T>;

    public get length(): number {
        if (this.firstNode === undefined) {
            return 0;
        }
        let node: Node<T> = new Node<T>(null, this.firstNode);
        let length: number = 0;
        while (node.next) {
            node = node.next;
            length++;
        }

        return length;
    }

    // возвращает значение по индексу
    public get(targetIndex: number): T {
        let node: Node<T> = this.firstNode;
        let index: number = 0;
        while (index < targetIndex && node.next) {
            node = node.next;
            index++;
        };

        if (index !== targetIndex || node === undefined) {
            throw new Error(`Trying to get node out of boundaries`);
        }

        return node.value;
    }

    // принимает значение и адрес будущего узла, который добавляет в список по этому индексу
    public add(newNode: T, index: number): void {
        let node: Node<T> = new Node<T>(null, this.firstNode);
        for (let i = 0; i <= index; i++) {

            if (i === index) {
                const next = (this.lastNode === node || this.lastNode === undefined) ? undefined : node.next;
                const added = new Node<T>(newNode, next);

                if (node.next !== undefined) {
                    node.next = added;
                } else {
                    this.lastNode = node;
                }
                node.next = added;
                if (i === 0) {
                    this.firstNode = added;
                }
                if (this.lastNode === node || this.lastNode === undefined) {
                    this.lastNode = added;
                }
                return;
            }

            if (node === undefined) {
                throw new Error(`Trying to add node out of boundaries`);
            }

            node = node.next;
        }
        throw new Error(`Trying to add node out of boundaries`);
    }


    public remove(index: number): void {
        if (this.firstNode === undefined) {
            throw new Error(`Trying to remove node out of boundaries`);
        }


        let node: Node<T> = this.firstNode;
        let prevNode: Node<T> = null;

        for (let i = 0; i <= index; i++) {
            if (i === index) {

                if (this.firstNode === node) {
                    this.firstNode = node.next;
                }

                if (prevNode) {
                    prevNode.next = node.next;
                }

                if (this.lastNode === node) {
                    this.lastNode = prevNode;
                }

                return;
            }
            if (node === undefined) {
                throw new Error(`Trying to remove node out of boundaries`);
            }
            prevNode = node;
            node = node.next;
        }
        throw new Error(`Trying to remove an node out of boundaries`);
    }
}