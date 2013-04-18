//var context;
//var x, y;
var angle;

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


/**
*gets angle between mouse and player and returns the result as radians
*/
function angleBetweenPlayerMouse(ev, player)
{
	var x, y;
	var pos = mouseLoc(ev);
	x = pos[0];
	y = pos[1];
	
	var xcent = canvas.width/2 + player.width/2;
	var ycent = canvas.height/2 + player.height/2 +80;
	
	angle = Math.atan2(x - xcent, -(y - ycent));
	
	console.log(angle);
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
	
	angleBetweenPlayerMouse(ev, player);

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

//--------------------------------------Bullets and collision
function bullet(ev)
{
	var bullets = new Array();

	bullet = new Image();
	bullet.src = 'bullet.png';

	speed = 10;
	
	var xvel = speed * Math.cos(angle);
	var yvel = speed * Math.sin(angle);	

	bullets.push(bullet);

	function updateBullets()
	{
		for (var bullet in bullets)
		{
				
		}

	}
	var id = setInterval(updateBullets, 10);
	bullet.angle = angle; 
}

//player fire
function fire(ev)
{
	//gets and stores mouses x and y co ordinates
	var x, y;
	var pos = mouseLoc(ev)
	x = pos[0];
	y = pos[1];

	bullet(ev);
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

