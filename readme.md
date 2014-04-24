#Find the center-most element in a collection

Given a jQuery collection, searches all elements contained in the viewport and returns a single jQuery element that is nearest to the center of the viewport.

Can be chained with other methods.

Also supports a callback function that provides the center-most element as its argument.

##EXAMPLES

###Chained
```
jQuery('.collection').getCenter().css('width','500px')
```

###Callback
```
jQuery('.collection').getCenter(function($centerMostElement) {
	
	...do some stuff with $centerMostElement...
})
```


Returns a blank jQuery object if none of the specified elements are currently in the viewport.

Dependencies: jQuery