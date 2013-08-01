Occur
=====

Occur event is a browser-like implementation of javascript events.

Example
---

Example usage of usage with inheritance. 

```javascript
var Occur = require('occur');
var utils = require('utils');

function Handler() {
    Occur.call(this);
}

utils.inherits(Handler, Occur);

var handler = new Handler();
handler.on('handle', function(e) {
    console.log(e.type, e.value, e.target === handler);
});
handler.trigger({type : 'handle', value : 1});
// --> handle 1 true
handler.trigger('handle');
// --> handle undefined true
handler.trigger(new Occur.Event('handle', {value: 2}));
// --> handle 2 true
```
