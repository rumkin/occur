Occur
=====

Occur event is an implementation of w3c-like events.

Example
---

Example with inheritance. 

```javascript
var Occur = require('occur');
var utils = require('utils');

function SomeHandler() {
    Occur.call(this);
}

utils.inherits(SomeHandler, Occur);

var handler = new SomeHandler();
handler.on('handle', function(e) {
    console.log(e.type, e.value, e.target === handler);
});

// Trigger events
handler.trigger({type : 'handle', value : 1});
// --> handle 1 true
handler.trigger('handle');
// --> handle undefined true
handler.trigger(new Occur.Event('handle', {value: 2}));
// --> handle 2 true
```
