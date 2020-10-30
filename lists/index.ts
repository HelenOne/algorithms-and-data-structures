import {LinkedList} from './LinkedList';

const list = new LinkedList();

list.add(0,0);
list.add(1,1);
list.add(2,2);
list.add(3,3);
list.add(4,4);
list.add(5,5);
list.add(6,6);

list.remove(3);

console.log(list.get(0));
console.log(list.get(1));
console.log(list.get(2));
console.log(list.get(3));
console.log(list.get(4));
console.log(list.get(5));