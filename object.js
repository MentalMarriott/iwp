//var context;
//var x, y;


function ev_mousemove(ev) 
{

//	var context = document.getElementById('myCanvas').getContext('2d');
	var x, y;

	var pos = mouseLoc(ev);
	x = pos [0];
	y = pos [1];
	
	console.log(x);
	
	context.clearRect(0,0,document.width, document.height);

	//prints x and y co ordinates of mouse
	document.getElementById("mousePos").innerHTML = ("x=" + x + ", y="  + y);

	y = y - 75;
	
	player(x, y);	
}

function mousePosDisplay(ev)
{
	var x, y;
	var pos = mouseLoc(ev);
	x = pos[0];
	y = pos[1];

	document.getElementById("mousePos").innerHTML = ("x=" + x +", y=" + y);

}

function angleBetweenPlayerMouse(ev, player)
{
	var x, y;
	var pos = mouseLoc(ev);
	x = pos[0];
	y = pos[1];
	
	var xcent = canvas.width/2 + player.width/2;
	var ycent = canvas.height/2 + player.height/2 +80;
	
	var angle = Math.atan2(x - xcent, -(y - ycent));
	
	//angle = Math.PI*2 - angle;
	
	console.log(angle);

	return angle;
}


/**
 * The function below calculates the angle between the player and mouse and then rotates to face the mouse position
 */
function rotate(ev)
{
	mousePosDisplay(ev);

	if (typeof previousAngle === 'undefined')
	{
		previousAngle = 0;
	}
	
	var player = new Image();
	player.src = "ball.png";

	var xcent = canvas.width/2 + player.width/2;
	var ycent = canvas.height/2 + player.height/2;
	
	var angle = angleBetweenPlayerMouse(ev, player);

	//calculate angle between mouse and center of player
	//var angle = Math.atan2(xcent - x, ycent+80 - y);
	//angle = Math.PI*2 - angle;
	
	//makes all angles positive
	//if (angle < 0)
   	//	angle += 2 * Math.PI;  	

	//returns correct angle
	//console.log(previousAngle);	

	//resets image to riginal location so rotates to new correct version
	context.clearRect(canvas.width/2, canvas.height/2, (canvas.width/2)+player.width, (canvas.height/2)+player.height);

	context.save();
	context.translate(xcent, ycent);
	context.rotate((Math.PI*2) - previousAngle);
	context.translate(-xcent, -ycent);
	context.drawImage(player, xcent - player.width/2, ycent - player.height / 2);

	 context.clearRect(canvas.width/2, canvas.height/2, (canvas.width/2)+player.width, (canvas.height/2)+player.height);
	context.save();
	context.translate(xcent, ycent);
	//convert angle from degrees to radians
	context.rotate(angle);// * (Math.PI/180));//7 * Math.PI/180);
	context.translate(-xcent, -ycent);
	//context.clearRect(0, 0, document.width, document.height);
	context.drawImage(player, xcent - player.width / 2, ycent - player.height / 2);
	
	//stores angle so can rotate back to original pos
	previousAngle = angle;
}

function player()
{
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	var player = new Image();
	player.src = "ball.png";

        context.drawImage(player, canvas.width/2, canvas.height/2); 
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
}

function bullet(x, y)
{
	var players = new Array();

	base_image = new Image();
	base_image.src = 'bullet.png';

	players.push(base_image);

	
}


//player fire
function fire(ev)
{
	//gets and stores mouses x and y co ordinates
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
	
		context.clearRect(0, 0, document.width, document.height);

		//left = left + 1;

		bullet(x, y);

		x = x + 1  // moves img 1 along x axis 


		if (x > 800)  // check finish condition
		clearInterval(id)
	}
	
	var id = setInterval(frame, 10) // draw every 10ms
	
}

