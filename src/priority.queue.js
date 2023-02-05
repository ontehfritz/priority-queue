/**
 * A priority queue stores a list of items but each can have a numeric priority value.
 * Items with a higher priority are dequeued before items with a lower priority.
 * Implemented as a hash of arrays where the hash keys are priority values.
 */
/**
 * Typescript is getting heavy acceptance in the industry and preference would be to rewrite it in TS
 * as there are many advantages. 
 */
class PriorityQueue {
    constructor() {
        this.store = new Map(); // keys are priorities, values are arrays of elements
    }
    /**
     * length returns the number of items in the queue
     * @returns totalItems
     */
    length() 
    {
        let totalItems = 0;
        for(let priority of Object.keys(this.store)) {
            totalItems += this.store[priority].length;
        }
        return totalItems;
    };

    /**
     * adds an item to the queue, creates a bucket if one does not exist for the priority
     * @param {*} value 
     * @param {*} priority 
     */
    add(value, priority) {
        //let this throw, if following liskov substitution principle, a custom exception
        //should be thrown here for all implementations, changing exceptions is a breaking change
        const intPriority = parseInt(priority);
        if (this.store[intPriority] === undefined)
            this.store[intPriority] = [];

        this.store[intPriority].push(value);
    };

    /**
     * dequeues items from the priority buckets if non exist then returns null 
     * @returns the oldest added value with the highest priority
     */
    pop() {
        let maxKey = Math.max(...Object.keys(this.store));
        if(this.length() === 0) return null;
        if (this.store[maxKey].length === 0) {
            delete this.store[maxKey];
            return this.pop();
        }
        
        return this.store[maxKey].shift();
    };
    
    /**
     * 
     * @returns all priorities currently being used 
     */
    getAllPriorities() {
        return Object.keys(this.store);
    }

    /**
     * iterates through all the queue elements in priority-then-FIFO order
     * replaces the forEach for a more intuitive method, see tests for usuage
     * @param {*} callback 
     */
    getItems(callback) {
        var keys = Object.keys(this.store).sort();

        for (var a = keys.length; a > 0; a--) {
            for (var b = 0; b < this.store[a].length; b++)
                callback(this.store[a][b]);
        }
    }

    /**
     * this will change an items priority if it exists, else throws 
     * newPriority must be an int or it throws a parse error
     * @param {*} value 
     * @param {*} newPriority 
     */
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



