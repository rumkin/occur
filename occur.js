// EVENTS ---------------------------------------------------------------------
/**
 * Event constructor
 * @constructor
 */
function Occur() {
	this._events = {};
}
/**
 * Add event listener to object
 * @param  {String}   event    Event name
 * @param  {Function} callback Event listener callback
 */
Occur.prototype.on = function(event, callback) {
	var _events = this._events;
	if ( ! _events.hasOwnProperty(event)) {
		_events[event] = [];
	}
	_events[event].push(callback);
	return this;
};
/**
 * Remove event listener or all of listeners from the event
 * @param  {String}   event    Event name
 * @param  {Function} callback Event listener to be removed
 */
Occur.prototype.off = function(event, callback) {
	var _events = this._events;
	if ( ! _events.hasOwnProperty(event)) {
		return;
	} else if (callback) {
		_events[event] = _events[event].filter(function(item){ return item !== callback; });
	} else {
		delete _events[event];
	}
	return this;
};

/**
 * Trigger event
 * @param  {Object|String} event Event type as string or event object or event params object
 * @param  {mixed}         arg   Any argument to pass to event
 * @return {Event}               Occure event
 */
Occur.prototype.trigger = function(event, arg) {
	var _events = this._events;

	if (event instanceof Event === false) {
		if (typeof event === 'string') {
			event = new Event(event, { target : this });
		} else {
			if ( ! event.target) {
				event.target = this;
			}
			event = new Event(event);
		}
	}

	if (_events.hasOwnProperty(event.type) === false) {
		return this;
	}

	var callbacks, callback, args;
	callbacks = this._events[event.type].slice();
	args      = [event].concat(Array.prototype.slice.call(arguments, 1));

	while (callbacks.length) {
		callback = callbacks.shift();
		callback.apply(this, args);

		if (event.isPropagationStopped) break;
	}

	return event;
};

// EVENT OBJECT ---------------------------------------------------------------

/**
 * Event object
 * @param {String} type   Event type
 * @param {Object} params Event params
 */
function Event(type, params) {
	this.isPropagationStopped = false;
	params = params || {};
	if (typeof type !== 'object') {
		params.type = type;
	} else {
		params = type;
	}
	// Define immutable properties
	var prop;
	for (prop in params) {
		if (params.hasOwnProperty(prop)) {
			Object.defineProperty(this, prop, {
				configurable : false, 
				value        : params[prop],
				enumerable   : true
			})
		}
	}
}
/**
 * Stop event propagation. Set isPropagationStopped to true
 * @return {Event} Event object
 */
Event.prototype.stopPropagation = function() {
	this.isPropagationStopped = true;
	return this;
}

module.exports = Occur;
module.exports.Event = Event;