//var context;
//var x, y;
var angle;
var previousAngle;

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
	var ycent = canvas.height/2 + player.height/2 ;
	
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

	var xcent = pCanvas.width/5 + player.width/2;
	var ycent = pCanvas.height/5 + player.height/2;
	
	angleBetweenPlayerMouse(ev, player);

	//resets image to riginal location so rotates to new correct version
	context.clearRect(0, 0, pCanvas.width, pCanvas.height);

	pContext.save();
	pContext.translate(xcent, ycent);
	pContext.rotate((Math.PI*2) - previousAngle);
	pContext.translate(-xcent, -ycent);
	pContext.drawImage(player, xcent - player.width/2, ycent - player.height / 2);

	pContext.clearRect(0, 0, pCanvas.width, pCanvas.height);
	pContext.save();
	pContext.translate(xcent, ycent);
	//convert angle from degrees to radians
	pContext.rotate(angle);// * (Math.PI/180));//7 * Math.PI/180);
	pContext.translate(-xcent, -ycent);
	//context.clearRect(0, 0, document.width, document.height);
	pContext.drawImage(player, xcent - player.width / 2, ycent - player.height / 2);
	
	//stores angle so can rotate back to original pos
	previousAngle = angle;
}


function player()
{
	pContext.clearRect(0, 0, pCanvas.width, pCanvas.height);

	var player = new Image();
	player.src = "ball.png";	

	//player canvas positioning and size
	pCanvas.style.top = (canvas.height/2) + "px";
	pCanvas.style.left = (canvas.width/2) + "px";
	//pCanvas.style.width = "50";//(player.width + player.height/3 + "px");
	//pCanvas.style.height = "50";//(player.height + player.height/3 + "px");
	
        pContext.drawImage(player, pCanvas.width/5, pCanvas.height/5); 
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
function bullet(x, y)
{
	var bullets = new Array();
	
	var bullet = new Image();
	bullet.src = 'bullet.png';

	//y axis always seems to be off?
	y = y +75;
	x = x -5;

	context.drawImage(bullet, x, y);

/*
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
*/
}

//player fire
function fire(ev)
{
	//gets and stores mouses x and y co ordinates
	var x, y;
	var pos = mouseLoc(ev)
	x = pos[0];
	y = pos[1]-80;

	bullet(x, y);
//	context.drawImage(bullet, x, y);
//	bullet(ev);
//	var left = 0
	
/*	function frame() 
	{
	
		context.clearRect(0, 0, document.width, document.height);

		//left = left + 1;

		bullet(x, y);

		x = x + 1  // moves img 1 along x axis 


		if (x > 800)  // check finish condition
		clearInterval(id)
	}
	
	var id = setInterval(frame, 10) // draw every 10ms
*/	
}

