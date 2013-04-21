//var context;
//var x, y;
var angle;
var previousAngle;
var bullets = [];
var enemies = [];

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

	updateEnemyAdd();
	//rand interval between 1 30
	var spawnTime = levelSpawnTime(player.level);
	var time = Math.floor((Math.random()*(3000-spawnTime+1))+spawnTime);
	var id2 = setInterval(updateEnemyAdd, time/1);
}

function levelSpawnTime(level)
{
	var time; 

	switch(level)
	{
		case 1:
			time = 500;
			break;				

		case 2: 
			time = 400;
			break;
	}

	return time;
}

/**
*adds enemys to array with a random start position
*/
function updateEnemyAdd()
{
	//start enemy offscreen
	//var enemy = new enemyObj(-20, -20);
	var XorY = Math.random();
	var side = Math.random();
	var x, y;

	if(XorY >0.5)
	{
		if(side > 0.5)
		{
			x = 0 ;
			y = Math.floor((Math.random()*(canvas.height))+1);
		}else{
			x = canvas.width;
			y = Math.floor((Math.random()*(canvas.height))+1);
		}
	}else{
		if(side > 0.5)
		{
			y = 0;
			x = Math.floor((Math.random()*(canvas.width))+1);
		}else{
			y = canvas.height;
			x = Math.floor((Math.random()*(canvas.width))+1);;
		}
	}

	console.log(y);	
	var enemy = new enemyObj(x, y);	

	enemies.push(enemy);
}

/**
* clears and updates elements on the canvas
*/
function updateCanvas()
{
	clear();	
	bulletHitZombie();	

	bulletUpdate();
	
	//bulletHitZombie();

	enemyUpdate();
}



/**
 * The function below gets the angle between the player and mouse and then 
 * rotates the player to face the mouse position
 */
function rotate(ev)
{
	var x, y;
        var pos = mouseLoc(ev);
        x = pos[0];
        y = pos[1];

	if (typeof previousAngle === 'undefined')
	{
		previousAngle = 0;
	}
	
	var player = new playerObj();

	var pCanvasCentX = pCanvas.width/2;
	var pCanvasCentY = pCanvas.height/2;
	
	angle = angleBetweenObjCenter(x, y);

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

	this.health = 100;
	this.score = 0;
	this.level = 1;

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

//--------------------------------------Bullets

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
		this.x = context.width/2;
		this.y = context.height/2;
		context.drawImage(bullet, this.x, this.y);
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

//----------------------------------Enemies----------------------
function enemyObj(x , y)
{
	var enemy = new Image();
	enemy.src = 'enemy3.png';

	this.speed = 0.3;
	this.health = 3;

	this.width = enemy.width;
	this.height = enemy.height;
	this.x = x;
	this.y = y;
	this.borderX = "NULL";
	this.borderY = "NULL"; 
	this.angle = angleBetweenObjCenter(this.x, this.y);
	this.Obj = this;

	this.draw = function()
        {
                context.drawImage(enemy, this.x, this.y);
        };
 
	//random start co ord
        this.onload = function()
        {
		context.drawImage(enemy, this.x, this.y); 
        };
}

function enemyUpdate()
{
//	console.log(enemies.length);
	 //var speed = 0.5;
         for(var i = 0; i < enemies.length; i++)
         {
             if(enemies[i].x == "NULL")
             {
	//	calcStartPos();	     
                enemies[i].x = 0;
                enemies[i].y = 0;
             }else{
                enemies[i].y += enemies[i].speed * Math.cos(enemies[i].angle);
                enemies[i].x += -(enemies[i].speed * Math.sin(enemies[i].angle));
             }

             enemies[i].draw();
 
	//colision below with bullet or player
             //if(enemies[i].x > 500)
             //{
               //     enemies.splice(i, 1);
             //}
         }

}

//----------------------------------collision-----------------------
/**
*Checks each bullet against each zombie to see if occupies same space
* if it does then remove both and increase players score
*/
function bulletHitZombie()
{
	var i, j;	
	for(j = 0; j < enemies.length; j++)
	{
		for(i = 0; i < bullets.length; i++)
		{
			console.log("nme hp= " + enemies[j].health);			
			var compXAxisRight = (bullets[i].x >= enemies[j].x) && (bullets[i].x <= (enemies[j].x + enemies[j].width));
			var compYAxisDown = (bullets[i].y <= enemies[j].y) && (bullets[i].y >= (enemies[j].y - enemies[j].height));
			var compXAxisLeft = (bullets[i].x <= (enemies[j].x + enemies[j].width) && bullets[i].x >= enemies[j].x);
			var compYAxisUp = (bullets[i].y >= (enemies[j].y - enemies[j].height) && bullets[i].y <= enemies[j].y); 
//			console.log("x " + enemies[j].x);
			if(compXAxisRight && compYAxisDown || compXAxisLeft && compYAxisDown)
			{
				enemies[j].health = enemies[j].health - 1;
				console.log(enemies[j].health);
				if(enemies[j].health == 0)
				{
					bullets.splice(i, 1);
					enemies.splice(j, 1);
					//skips checking the removed bullet against rest of enemies
					i++;
					j++;
				}
			} 
		}
	}
}

function zombieHitPHouse()
{

}


//----------------------------------handy functions-----------------------------------------

/**
*gets angle between mouse and player and sets the global angle so can 
* be used by bullets for tradgectory and enemies
*/
function angleBetweenObjCenter(x, y)
{
	var centX = canvas.width/2;
	var centY = canvas.height/2;
	
	
	var newAngle = Math.atan2(-(centX - x), centY - y);

	return newAngle;
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

