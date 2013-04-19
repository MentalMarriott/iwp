//var context;
//var x, y;
var angle;
var previousAngle;
var bullets = [];

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
	
	//console.log(angle);
}


/**
 * The function below calculates the angle between the player and mouse and then rotates to face the mouse position
 */
function rotate(ev)
{
	//context.clearRect(0, 0, 1000, 1000);
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
	pContext.clearRect(0, 0, pCanvas.width, pCanvas.height);

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

	updateCanvas();
	var id = setInterval(updateCanvas, 50); 
}

//updates elements on the canvas
function updateCanvas()
{
	clear();	
	
	bulletUpdate();
}

function bulletUpdate()
{
	    console.log(bullets.length);

	    var speed = 5.0;    
                 for(var i = 0; i < bullets.length; i++)
                 {      
			bullets[i].y += -(speed * Math.cos(bullets[i].angle));
			bullets[i].x += speed * Math.sin(bullets[i].angle);
 
                         bullets[i].draw();
                         if(bullets[i].x > 1000 || bullets[i].y > 250)
                         {       
                                 bullets.splice(i, 1);
                         }
                 }

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
function bulletObj(x, y)
{
	var bullet = new Image();
	bullet.src = 'bullet.png';
	//console.log(bullet.width);
	this.bulletX = bullet.width; 
	this.bulletY = bullet.height;
	this.x = x;
	this.y = y;
	this.angle = angle;
	this.draw = function(){
		context.drawImage(bullet, this.x, this.y);
	};
	//console.log(this.x);
}

//player fire
function fire(ev)
{
	//gets and stores mouses x and y co ordinates
	var x, y;
	var pos = mouseLoc(ev)
	x = pos[0];
	y = pos[1];

	var bullet = new bulletObj(x, y);
	bullets.push(bullet);
	var numBullets = bullets.length;
}

function clear()
{
	context.clearRect(0, 0, 1000, 1000);
}

