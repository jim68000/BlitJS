;(function(exports) {
	
	var velocity = 1;
	
	var ship = $('#ship');
	
	var background_pos = 0;
	
	ship.top = 200;
	ship.left = 200;
	
	var fire_fx = function(num) {
		var idx = 0;
		var fires = [];
		for (var i=0; i < num; i++) {
			fires[i] = new Audio();
			fires[i].src = "res/Firing_Sound_Effect.mp3";
		}
		
		return function() {
			fires[idx++ % fires.length].play();
		};
	}
	
	var fx = _.throttle(fire_fx(4), 150);
	
	var kittens = [];	
	[1,2,3,4,5].forEach(function(it) {
		var kit = {};
		kit.img = new Image();
		kit.img.src = "res/bear-kitten.png";
		kit.x = it * 100;
		kit.y = 20;
		kit.height = 100;
		kit.width = 60;
		console.log(kit.x)
		$(kit.img).css({
			position: "absolute",
			left: kit.x + "px",
			top: kit.y
		})
		$('#screen').append(kit.img);
		kittens.push(kit);
	});
	
	// intro
	var intro_mus = new Audio();
	intro_mus.src = "res/Galaga_Theme_Song.mp3";
	setTimeout(function() {
		//intro_mus.play();
	}, 200);
	
	
	bullets = [];
	
	
	var Bullet = function(el, x, y) {
		this.x = x;
		this.y = y;
		this.running = false;
		this.el = el;
	}
	
	for (var i=0; i < 20; i++) {
		var d = document.createElement("div");
		d.className = "bullet";
		d.id = "bullet_" + i;
		$('#screen').append(d);
		
		var b = new Bullet(d, 0, 0);
		bullets.push(b);
	}
	
	var curr_bull = 0;
	
	var fire = _.debounce(function() {
		fx();
		
		var bullet = bullets[curr_bull++%bullets.length];
		bullet.el.style.display = "block";
		bullet.x = ship.left + 15;
		bullet.y = ship.top;
		bullet.el.style.left = bullet.x + "px";
		bullet.el.style.top = bullet.y + "px";
		bullet.running = true;
	}, 150, true);
	
	var check_collisions = function() {
		
		for (var i = 0; i < bullets.length; i++) {
			for (var j = 0; j < kittens.length; j++) {
				if (bullets[i].running && 
					bullets[i].x > kittens[j].x && 
					bullets[i].x < kittens[j].x + kittens[j].height
					&& bullets[i].y > kittens[j].y && 
					bullets[i].y < kittens[j].y + kittens[j].width
					) {
						
					
					$(kittens[j].img).css({display:"none"});
				} 
			}
		}
		
	};
	
	var gameloop = function() {
		
		if (key.isPressed(37)) {
			ship.css({left: ship.left-=velocity});
		}

		if (key.isPressed('a')) {
			ship.css({left: ship.left-=velocity});
		}

		if (key.isPressed('w')) {
			ship.css({top: ship.top-=velocity});
		}

		if (key.isPressed(38)) {
			ship.css({top: ship.top-=velocity});
		}

		if (key.isPressed(39)) {
			ship.css({left: ship.left+=velocity});
		}
		
		if (key.isPressed('d')) {
			ship.css({left: ship.left+=velocity});
		}

		if (key.isPressed(40)) {
			ship.css({top: ship.top+=velocity});
		}

		if (key.isPressed('s')) {
			ship.css({top: ship.top+=velocity});
		}
		
		if (key.isPressed(" ")) {
			fire();
		}
		
		// check collisions
		
		check_collisions();
		
		// animate things

		for (var i = 0; i < bullets.length; i++) {
			if (bullets[i].running) {
				bullets[i].y -= velocity*3;
				bullets[i].el.style.top = bullets[i].y + "px";	
			}
		}
		
		// $('body').css({
		// 	backgroundPosition: "0 " + background_pos + "px"
		// });
		// background_pos += 1;
		
	};
	
	setInterval(gameloop, 1000/100);

}).call();