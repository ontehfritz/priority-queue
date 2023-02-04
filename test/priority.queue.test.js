const PriorityQueue = require('../src/priority.queue');

/**
 * Keeping the structure of the tests simple for this execrices but there are nice
 * was to group jest tests into suites and use describe() and it() also being to provide 
 * mutiple inputs. I usually promote every bug found becomes a test case.
 */
test('test add item to queue', () => {
    let queue = new PriorityQueue();
    expect(queue.count).toBe(0);

    try{
        queue.add(1, 1);
        queue.add(2, 1);
        queue.add(1, 2);
    }
    catch(e){
        //simple way to fail a test on exception
        expect(true).toBe(false);
    }
    expect(queue.count).toBe(3);
});

test('test pop item from queue', () => {
    let queue = new PriorityQueue();
    expect(queue.count).toBe(0);
    try{
        queue.add(1, 1);
        queue.add(2, 1);
        queue.add(3, 2);
        queue.add(4, 2);

    }
    catch(e){
        //simple way to fail a test on exception
        expect(true).toBe(false);
    }

    let item = queue.pop();
    expect(item).toBe(3);
    expect(queue.count).toBe(3);
    item = queue.pop();
    expect(item).toBe(4);
    expect(queue.count).toBe(2);
    item = queue.pop();
    expect(item).toBe(1);
    expect(queue.count).toBe(1);
    item = queue.pop();
    expect(item).toBe(2);
    expect(queue.count).toBe(0);
    item = queue.pop();
    expect(item).toBe(null);
    queue.add(1, 1);
    item = queue.pop();
    expect(item).toBe(1);
    expect(queue.count).toBe(0);
    item = queue.pop();
    expect(item).toBe(null);
});

test('get all priorities', () => {
    let queue = new PriorityQueue();
    expect(queue.count).toBe(0);
    try{
        queue.add(1, 1);
        queue.add(2, 1);
        queue.add(3, 2);
        queue.add(4, 2);
    }
    catch(e){
        //simple way to fail a test on exception
        expect(true).toBe(false);
    }
    const priorities = queue.getAllPriorities();
    expect(priorities.length).toBe(2);
});

test('test change priority', () => {
    let queue = new PriorityQueue();
    expect(queue.count).toBe(0);
    try{
        queue.add(1, 1);
        queue.add(2, 1);
        queue.add(5, 2);
        queue.add(4, 2);
    }
    catch(e){
        //simple way to fail a test on exception
        expect(true).toBe(false);
    }

    //adding a priority that does not exist so shouf be five
    queue.changePriority(1, 3);
    expect(queue.count).toBe(5);
    let item = queue.pop();
    expect(item).toBe(1);
    expect(queue.count).toBe(4);
});


