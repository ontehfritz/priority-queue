//This is test for the old code base just to see how it works

const { PriorityQueue } = require('../src/priority-queue.js');

/**
 * Keeping the structure of the tests simple for this execrices but there are nice
 * ways to group jest tests into suites and use describe() and it()
 */


test('add item to queue', () => {
    let queue = new PriorityQueue(5);
    expect(queue.count).toBe(0);
    queue.add(1, 1);
    queue.add(2, 1);
    queue.add(3, 2);
    //let items = queue.getAllPriorities();
    //console.log(JSON.stringify(items));
  });

test('pop item to queue', () => {
    expect(true).toBe(true);
  });

test('get all priorities', () => {
    expect(true).toBe(true);
  });

test('change priority', () => {
    expect(true).toBe(true);
  });