/**
 * A priority queue stores a list of items but each can have a numeric priority value.
 * Items with a higher priority are dequeued before items with a lower priority.
 * Implemented as a hash of arrays where the hash keys are priority values.
 */

/**
 * REVIEW (because there are fair number of improvements with this PR, in the real world I would 
 * do this incrementally as draft PR, because there are so many changes; that it can be overwhelming to the developer): 
 * 
 * The priority queue needs a bit of JS modernization. Also any code that does not have tests 
 * typically wouldn't make it to production. The code looks a bit dated/legacy. Therefore, tests are even more 
 * crucial for recatoring as the will allow 
 * developers to code fearlessly; without the worry of breaking something and maintaining compatible
 * with the consumers of the library. Test also help self document the code as 
 * expected inputs and outputs are clearly defined, and shows how to use the class/function/library.
 */

/**
 * REVIEW: this function should be converted to a class to make the use more intuitive and can get rid
 * of using prototype. 
 * @param {*} size REVIEW: This parameter is not used. Do we need it?
 */
function PriorityQueue(size) {
	this.store = {};	// keys are priorities, values are arrays of elements
    //REVIEW: it is hard to infer if this is suppose to be the number of items or priority levels
    //tracking items manually can be tricky and error prone. Can always iterate over the store to get the number of items.
    //Not as performant but more reliable. 
	this.count = 0; 
	// adds an item
	// priority must be an integer (higher value has higher priority)
    /**
     *REVIEW: This function should be renamed to add() method in the priority queue class
     * @param {*} value parameter should try to parse the value into a number and throw an error if it can't be parsed.
    */ 
	this.add = function(value, priority) {
		if (this.store[priority] == undefined)
			this.store[priority] = [];

		this.store[priority].push(value);
		this.count++;
	};

	// returns the oldest-added value with the highest priority
    /**
     * REVIEW: This function should be renamed to pop() to be more idomatic of JS and 
     * be consistent with the rest of the code base.
     */ 
	this.Pop = function() {
        //REVIEW: define this as const or let, this makes it hard to tell scope and should always declare
        //variables with const or let 
        //Object keys need to be spread to work correctly example: ...Object.keys(this.store)
		maxKey = Math.max(Object.keys(this.store));
		this.count--;
        //Review: this is great, good use of shift for FIFO
		return this.store[maxKey].shift();
	};
    //REVIEW: once agian make this explicit, items or the how many priority levels
	this.length = function() {
		return this.count;
	}
}
/**
 * REVIEW: This function should be renamed to getPriorities() method in the
 * class to be more idomatic of modern JS and
 * remove the use of prototype.
 */
PriorityQueue.prototype.get_all_priorities = function() {
	return Object.keys(this.store);
}

// iterates through all the queue elements in priority-then-FIFO order
/**
 * REVIEW: A more descriptive name would be a sort() method, also using prootype
 * on a forEach it is overwriting a native JS method which is not a good practice.  
 */
PriorityQueue.prototype.forEach = function(callback) {
    //REVIEW: use let instead of var, var is not idomatic of modern JS
	var keys = Object.keys(this.store).sort(); 
    //REVIEW: use let instead of var, var is not idomatic of modern JS
	for (var a = keys.length; a > 0; a--) {
		for (var b = 0; b < this.store[a].length; b++)
			callback(this.store[a][b]);
	}
}
/**
 * REVIEW: This function should be renamed to changePriority() method in the priority queue class
 * @param {*} value 
 * @param {*} newPriority 
 */
PriorityQueue.prototype.changePriority = function(value, newPriority) {
    //REVIEW: use let instead of var, var is not idomatic of modern JS
    //should parse the newPriority to a number and throw an error if it can't be parsed.
	var foundItem = false;
	this.store.forEach(function(bucket) {
		bucket.forEach(function(item, index) {
			if (item === value) {
				bucket.splice(index, 1);  // remove the item
				this.add(value, newPriority);
				foundItem = true;
                //REVIEW: this is a good to break, but just return without false
				return false;  // early exit from forEach
			}
		});
		if (foundItem) return false;
	});
}
//REVIEW: add the export to be usuable in other files
module.exports = { PriorityQueue };