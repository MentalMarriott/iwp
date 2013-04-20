//var context;
//var x, y;
var angle;
var previousAngle;
var bullets = [];


/**
*The function is called on load and set up everything,
*like player, monsters and game update function
*/
function init()
{
	pContext.clearRect(0, 0, pCanvas.width, pCanvas.height);

	//var player = new playerObj();

	//player canvas positioning in center of game canvas
	var canvasXCent = ((canvas.width/2)-(pCanvas.width/2));
	var canvasYCent = ((canvas.height/2)-(pCanvas.height/2));
	console.log(canvasYCent);
	pCanvas.style.top = canvasYCent + "px";
	pCanvas.style.left = canvasXCent + "px";

	//player.draw();
	var player = new playerObj();

	player.draw();

	updateCanvas();
	var id = setInterval(updateCanvas, 1000/60); 
}


/**
* clears and updates elements on the canvas
*/
function updateCanvas()
{
	clear();	
	
	bulletUpdate();
}



/**
 * The function below gets the angle between the player and mouse and then 
 * rotates the player to face the mouse position
 */
function rotate(ev)
{
	//mousePosDisplay(ev);

	if (typeof previousAngle === 'undefined')
	{
		previousAngle = 0;
	}
	
	var player = new playerObj();

	var pCanvasCentX = pCanvas.width/2;
	var pCanvasCentY = pCanvas.height/2;
	
	angleBetweenPlayerMouse(ev, player);

	//resets image to riginal location so rotates to new correct version
	pContext.clearRect(0, 0, pCanvas.width, pCanvas.height);

	pContext.save();
	pContext.translate(pCanvasCentX, pCanvasCentY);
	pContext.rotate((Math.PI*2) - previousAngle);
	pContext.translate(-(pCanvasCentX), -(pCanvasCentY));
	player.draw();

	pContext.clearRect(0, 0, pCanvas.width, pCanvas.height);
	pContext.save();
	pContext.translate(pCanvasCentX, pCanvasCentY);
	pContext.rotate(angle);
	pContext.translate(-(pCanvasCentX), -(pCanvasCentY));
	player.draw();	

	//stores angle so can rotate back to original pos
	previousAngle = angle;
}


/**
*Player object contains players health, upgrades, points and anything else that add later
*/
function playerObj()
{
	var player = new Image();
	player.src = 'ball.png';
	this.width = player.width;
	this.height = player.height;
	this.x = ((pCanvas.width/2)-(player.width/2));
	this.y = ((pCanvas.height/2)-(player.height/2));
	this.draw = function()
	{
		pContext.drawImage(player, this.x, this.y);
	};
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

/**on mouse click this will be called and set x and y null first time so 
*can set position to start off from center then adds a bullet to array
* of bullets
*/
function fire(ev)
{	
	x = "NULL"; 
	y = "NULL";

	var bullet = new bulletObj(x, y);
	bullets.push(bullet);
}


/**
*bullet object contains draw function and current co ordinates
* co ordinates x and y are currently top left of image where drawn FIX!
*/
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

	this.draw = function()
	{
		context.drawImage(bullet, this.x, this.y);
	};

	this.onload = function()
	{
		context.drawImage(bullet, context.width/2, context.height/2);
	};
	//console.log(this.x);
}

/**
*Updates the bullets tradgectory with the angle at firing
*/
function bulletUpdate()
{
	    console.log(bullets.length);

	    var speed = 5.0;    
            for(var i = 0; i < bullets.length; i++)
            {      
		if(bullets[i].x == "NULL")
		{
			bullets[i].x = canvas.width/2;
			bullets[i].y = canvas.height/2;	
		}else{
			bullets[i].y += -(speed * Math.cos(bullets[i].angle));
			bullets[i].x += speed * Math.sin(bullets[i].angle);
 		}

                bullets[i].draw();
				
		 //check if bullets are still in bounds. 
		 //If no remove from array
                if(bullets[i].x > 1000 || bullets[i].x < 0 || bullets[i].y > 500 || bullets[i].y < 0)
                {       
                        bullets.splice(i, 1);
                }
            }

}


//----------------------------------handy functions-----------------------------------------

/**
*gets angle between mouse and player and sets the global angle so can 
* be used by bullets for tradgectory 
*/
function angleBetweenPlayerMouse(ev, player)
{
	var x, y;
	var pos = mouseLoc(ev);
	x = pos[0];
	y = pos[1];

	var playerCentX = canvas.width/2;
	var playerCentY = canvas.height/2;
	
	angle = Math.atan2(-(playerCentX - x), playerCentY - y);
}

/**
*Displays mouse co ordinates. Useful for debugging
*/
function mousePosDisplay(ev)
{
	var x, y;
	var pos = mouseLoc(ev);
	x = pos[0];
	y = pos[1];

//	document.getElementById("mousePos").innerHTML = ("x=" + x +", y=" + y);

}



function clear()
{
	context.clearRect(0, 0, 1000, 1000);
}

