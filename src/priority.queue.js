/**
 * A priority queue implementation using a hash table.
 */
class PriorityQueue {
    constructor() {
        this.store = new Map(); // keys are priorities, values are arrays of elements
    }

    length() 
    {
        let totalItems = 0;
        for(let priority of Object.keys(this.store)) {
            totalItems += this.store[priority].length;
        }
        return totalItems;
    };

    add(value, priority) {
        //let this throw, if following liskov substitution principle, a custom exception
        //should be thrown here for all implementations, changing exceptions is a breaking change
        const intPriority = parseInt(priority);
        if (this.store[intPriority] === undefined)
            this.store[intPriority] = [];

        this.store[intPriority].push(value);
    };

    pop() {
        let maxKey = Math.max(...Object.keys(this.store));
        if(this.length() === 0) return null;
        if (this.store[maxKey].length === 0) {
            delete this.store[maxKey];
            return this.pop();
        }
        
        return this.store[maxKey].shift();
    };

    getAllPriorities() {
        return Object.keys(this.store);
    }
    // iterates through all the queue elements in priority-then-FIFO order
    getItems(callback) {
        var keys = Object.keys(this.store).sort();

        for (var a = keys.length; a > 0; a--) {
            for (var b = 0; b < this.store[a].length; b++)
                callback(this.store[a][b]);
        }
    }

    changePriority(value, newPriority) {
        //let this throw, if following liskov substitution principle, a custom exception
        //should be thrown here for all implementations, changing exceptions is a breaking change
        const intNewPriority = parseInt(newPriority);
        var foundItem = false;
        //instead of a function loop I prefer for of loops,they are easier to debug
        for(let priority of Object.keys(this.store)) {
            for(let item of this.store[priority]) {
                if(item === value) {
                    this.store[priority].splice(this.store[priority].indexOf(item), 1);
                    this.add(value, intNewPriority);
                    foundItem = true;
                    break;
                }
            }
        }
        if(foundItem === false) throw new Error('Item not found in queue');
    }
}

module.exports = PriorityQueue;



