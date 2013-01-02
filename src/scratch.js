key('up', function() {
	ship.css({top: ship.top-=velocity});
});

key('down', function() {
	ship.css({top: ship.top+=velocity});
});

key('left', function() {
	ship.css({left: ship.left-=velocity});
});

key('right', function() {
	ship.css({left: ship.left+=velocity});
});