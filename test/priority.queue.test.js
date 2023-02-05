const PriorityQueue = require('../src/priority.queue');
/**
 * Keeping the structure of the tests simple for this execrice, but there are nice
 * was to group jest tests into suites and use describe() and it() 
 * I usually promote every bug found into a test case.
 */

/**
 * test adding to queue, an exception can be thrown if priority is not numeric
 */
test('test add item to queue', () => {
    let queue = new PriorityQueue();
    expect(queue.length()).toBe(0);

    try{
        queue.add(1, 1);
        queue.add(2, 1);
        queue.add(1, 2);
    }
    catch(e){
        //simple way to fail a test on exception
        expect(true).toBe(false);
    }
    expect(queue.length()).toBe(3);
});

/**
 * Test is length works correctly which gets the amount of items in the queue
 * Not how many priority buckets, removed count as that was error prone
 */
test('test item length', () => {
    let queue = new PriorityQueue();
    expect(queue.length()).toBe(0);

    try{
        queue.add(1, 1);
        queue.add(2, 1);
        queue.add(1, 2);
    }
    catch(e){
        //simple way to fail a test on exception
        expect(true).toBe(false);
    }
    expect(queue.length()).toBe(3);
});

/**
* test poping when there is nothing left to pop, null value
*/
test('test pop item from queue', () => {
    let queue = new PriorityQueue();
    expect(queue.length()).toBe(0);
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
    expect(queue.length()).toBe(3);
    item = queue.pop();
    expect(item).toBe(4);
    expect(queue.length()).toBe(2);
    item = queue.pop();
    expect(item).toBe(1);
    expect(queue.length()).toBe(1);
    item = queue.pop();
    expect(item).toBe(2);
    expect(queue.length()).toBe(0);
    item = queue.pop();
    expect(item).toBe(null);
    queue.add(1, 1);
    item = queue.pop();
    expect(item).toBe(1);
    expect(queue.length()).toBe(0);
    item = queue.pop();
    expect(item).toBe(null);
});

/**
 * test getting all the priorities, not items
 */
test('get all priorities', () => {
    let queue = new PriorityQueue();
    expect(queue.length()).toBe(0);
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

/**
 * Change priorities test if it will add another priority bucket
 */
test('test change priority', () => {
    let queue = new PriorityQueue();
    expect(queue.length()).toBe(0);
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
    expect(queue.length()).toBe(4);
    let item = queue.pop();
    expect(item).toBe(1);
    expect(queue.length()).toBe(3);
});

/**
 * removed the forEach in favour of getItems method which excepts a callback
 */
test('test getItems', () => {
    let queue = new PriorityQueue();
    expect(queue.length()).toBe(0);
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

    try{
        queue.getItems(printItem);
        expect(true).toBe(true);
    }catch(error){
        expect(true).toBe(false);
    }
});
//callback for getItems
function printItem(item){
    console.log(item);
}