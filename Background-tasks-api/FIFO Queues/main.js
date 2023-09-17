//* A FIFO queue, which stands for "First-In-First-Out" queue, is a data structure that follows the principle of ordering elements in the order they were added. In other words, the first element added to the queue will be the first one to be removed.

// * we can create this type of queue in js

class Queue {
  constructor() {
    this.items = [];
  }
  // * enqueue
  enqueue(element) {
    this.items.push(element);
  }
  // * dequeue
  dequeue() {
    // * check if items has a element
    if (!this.items.length) {
      return new Error("items has no element");
    }
    return this.items.shift();
  }
  // * check if queue is empty
  isEmpty() {
    return this.items.length === 0;
  }
  // * pick first element of items
  pick() {
    if (items1.isEmpty()) {
      return "there is not any element";
    }
    return this.items[0];
  }
  // * check length of queue
  size() {
    return this.items.length;
  }
}

const items1 = new Queue();
items1.enqueue("a");
items1.enqueue("b");
items1.enqueue("c");
console.log(items1.items);
console.log(items1.dequeue());
console.log(items1.items);
console.log(items1.pick());
console.log(items1.size());
console.log(items1.isEmpty());
