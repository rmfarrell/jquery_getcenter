;(function ( $, window, document, undefined ) {
	
    var pluginName = "getCenter";

		function buildCoords(el, arr) {
			
			var $elInCenter = null;
			
			var d = getDimensionInfo(el)
			
			if (d) {
				
				arr.push(buildArrayOfElsInViewport(el, d));
				
			} else return;
		}
		
		function buildArrayOfElsInViewport(el, d) {
		
			//d = [top, left, width, height]
			var _o = el, _x = 0, _y = 0;
			
			//Get x coordinate of center of element
			var _x = d[1] + (d[2] / 2);
			
			//Get y coordinate of center of element
			var _y = d[0] + (d[3] / 2);
			
			return {
				o: _o, 
				x: _x, 
				y: _y 
			}
		}
		
		function getCenterofViewPort() {
			
			var _x = window.pageXOffset + (window.innerWidth / 2);
			
			var _y = window.pageYOffset + (window.innerHeight / 2);
			
			return {
				x: _x,
				y: _y
			};
		}
		
		function getCenterEl (els) {
			
			var centerestCoord = Infinity,
				centerEl = null,
				vc = getCenterofViewPort(),
				cx,cy;
				
			for (var i = 0; i < els.length; i ++) {
				
				cx = Math.abs(els[i].x - vc.x);
				
				cy = Math.abs(els[i].y - vc.y);
				
				if (cy + cx > centerestCoord) continue;
				
				centerestCoord = (cy + cx);
				
				centerEl = els[i].o
			}
			
			return centerEl;
		}
		
		function getDimensionInfo(el) {
			
		  var top = el.offsetTop;
		  var left = el.offsetLeft;
		  var width = el.offsetWidth;
		  var height = el.offsetHeight;
		
		  while(el.offsetParent) {
		    el = el.offsetParent;
		    top += el.offsetTop;
		    left += el.offsetLeft;
		  }

		  if (
			
		    top < (window.pageYOffset + window.innerHeight) &&
		    left < (window.pageXOffset + window.innerWidth) && 
		    (top + height) > (window.pageYOffset) &&
		    (left + width) > (window.pageXOffset)
		
		  ) return [top, left, width, height];
				
				else return false;
		};
		
		function runCallback(f, $centerEl) {
			
			return f.call(this, $centerEl);
		}

    $.fn[pluginName] = function (cb) {
		
			var $centerEl = $([]), //center-most element; returns blank jquery obj if no elements are in viewport
				elsInViewport = []; //container for elements and associated x/y coords
			
			this.each(function () {
				
				//build an arry of objects of all elements contained in the viewport
				//objects contains Element, X coordinate of same (from center), and Y coord
				buildCoords(this, elsInViewport);
			});
			
			//Find the center-most element
			$centerEl = $(getCenterEl(elsInViewport));
			
			//If callback is specified run it with the centered element as params
			if (typeof cb === 'function') runCallback(cb, $centerEl);
			
			//Return the centered element
			return $centerEl;
    };

})( jQuery, window, document );