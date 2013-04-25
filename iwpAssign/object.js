var context;
//var x, y;

function ev_mousemove(ev) 
{
	var context = document.getElementById('myCanvas').getContext('2d');
	var x, y;

/*	if (ev.layerX || ev.layerX === 0) 
	{ // Firefox
		x = ev.layerX;
		y = ev.layerY;
	}
	else if (ev.offsetX || ev.offsetX === 0) 
	{ // Opera
		x = ev.offsetX;
		y = ev.offsetY;
	}*/
	var pos = mouseLoc(ev);
	x = pos [0];
	y = pos [1];
	
	console.log(x);
	
	context.clearRect(0,0,800,400);

	document.getElementById("mousePos").innerHTML = ("x=" + x + ", y="  + y);

	y = y - 75;
	
	player(x, y);	
}

/**
 *Returns mouse current x and y location
 */
var mouseLoc = function(ev)
{
	var x, y;

	if (ev.layerX || ev.layerX === 0)
	{ // Firefox
		
		x = ev.layerX;
		y = ev.layerY;
	}
	else if (ev.offsetX || ev.offsetX === 0)
	{ // Opera
		x = ev.offsetX;
		y = ev.offsetY;
	}

	return [x, y];
};

function player(x, y)
{
	console.log(x);
	console.log(y);
	context.beginPath();
	context.beginPath();	context.fillStyle="#0000ff";
	context.arc(x, y, 6, 0, Math.PI*2, true);
	context.closePath();
	context.fill();
	context.shadowColor = "#000";
	context.shadowBlur = 20;
	context.shadowOffsetX = 10;
	context.shadowOffsetY = 10;
}


//player fire
function fire(ev)
{
	var x, y;
	var pos = mouseLoc(ev)
	x = pos[0];
	y = pos[1];

	/*
	var bullets = new Array();
	
	bullets.push(draw_bullet(x, y));
	//check if player has gun	
	//update when clicked so falls
	//window.setInterval(travel(x, y, bullets), 3000);
	*/
	var left = 0
	
	function frame() 
	{
	
		context.clearRect(0, 0, 800, 400);

		player(x, y);

		x = x + 1 // show frame 

		draw_player(x, y);

		if (left == 100)  // check finish condition
		clearInterval(id)
	}
	
	var id = setInterval(frame, 10) // draw every 10ms
	
}

function retrun_bullets()
{
	var bullets = new Array();

	return bullets
}

function update()
{
	travel
}

/*
function travel(x, y, bullets)
{
	var x, y;
	
	context.clearRect(0, 0, 800, 400);

	for bullet in bullets
	{
		bullet.x += 10;
		draw_bullets(x, y);
	}
}


/**
 *Draws bullet at location of mouse
 */
function draw_bullet(x, y)
{
	context.beginPath();
	context.beginPath();
	context.fillStyle="#0000ff";
	context.arc(x, y, 6, 0, Math.PI*2, true);
	context.closePath();
	context.fill();
	context.shadowColor = "#000";
	context.shadowBlur = 20;
	context.shadowOffsetX = 10;
	context.shadowOffsetY = 10;

	
}
