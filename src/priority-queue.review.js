/**
 * A priority queue stores a list of items but each can have a numeric priority value.
 * Items with a higher priority are dequeued before items with a lower priority.
 * Implemented as a hash of arrays where the hash keys are priority values.
 */

/**
 * REVIEW: (because there are fair number of improvements with this PR, in the real world I would 
 * do this incrementally as draft PR, because there are so many changes,
 * that it can be overwhelming to the developer :)  
 * 
 * The priority queue needs a bit of JS modernization. Also any code that does not have tests 
 * typically wouldn't make it to production. The code looks a bit dated/legacy. Therefore, tests are even more 
 * crucial for refactoring as this will allow developers to code fearlessly; without the worry of breaking something 
 * and maintaining compatiblty with the consumers of the library. Test also help self document the code as 
 * expected inputs and outputs are clearly defined, and shows how to use the class/function/library.
 */

/**
 * REVIEW: this function should be converted to a class syntax to make the use more intuitive and 
 * can get rid of using prototype throughout the class
 * @param {*} size REVIEW: This parameter is not used. Do we need it?
 */
function PriorityQueue(size) {
	this.store = {};	// keys are priorities, values are arrays of elements

    //REVIEW: it is hard to infer if count is suppose to be the number of items or priority levels
    //tracking items manually can be tricky and error prone. Can always iterate over the store to get the number of items.
    //not as performant but more reliable. Also count can be mutated by anyone and can lead to 
	//unwanted side affects 
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
        //REVIEW: define maxKey as const or let, this makes it hard to tell scope and should always declare
        //variables with const or let; const if not changing, let for mutable
        //Object keys need to be spread to work correctly example: ...Object.keys(this.store)
		//This fails if you add more than 1 priority bucket
		maxKey = Math.max(Object.keys(this.store));
		this.count--;
        //Review: this is great, good use of shift for FIFO
		return this.store[maxKey].shift();
	};
	/** REVIEW: iterate through and sum the total from the buckets (this.store) more reliable, 
	 * we can optimize if needed
	 */
	this.length = function() {
		return this.count;
	}
}
/**
 * REVIEW: This function should be renamed to getAllPriorities() method in the
 * class to be more idomatic of modern JS and consistent throughout the style of the code,
 * remove the use of prototype.
 */
PriorityQueue.prototype.get_all_priorities = function() {
	return Object.keys(this.store);
}

// iterates through all the queue elements in priority-then-FIFO order
/**
 * REVIEW: A more descriptive name method name would be better then overriding the forEach
 * also using prototype is not ideal  
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
	//my preference is to not use forEach method and use `for of` on collections
	//makes it easier for new devs especially coming from a different stack, debugging is more 
	//intuitive 
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
//module.exports = { PriorityQueue };