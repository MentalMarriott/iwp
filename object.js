//var context;
//var x, y;
var angle, enemiesMax, arrayTotal, time, killed, fired;
var previousAngle;
var bullets = [];
var enemies = [];
var pScore = 0;
var pHealth = 50;
var pLevel = 0;
var id, id2;
var enemiesSpeed = 0.3;
var killFifty, curious, pacifist, over9000, firstPlay, gunNut;

var backMusic = new Audio("backMusic.wav");
var fireSound = new Audio("rifle.wav");

var title = new Image();
title.src = 'title3.png';

var start = new Image();
start.src = 'start1.png';

var originStart = new Image();
originStart.src = 'start.png';

var help = new Image();
help.src = 'help.png';

var helpSelect = new Image();
helpSelect.src = 'helpSelect.png';

var aboutStart = new Image();
aboutStart.src = 'about.png';

var about = new Image();
about.src = 'aboutSelect1.png';

var achieveStart = new Image();
achieveStart.src = 'achieve.png';

var achieve = new Image();
achieve.src = 'selectAchieve.png';

/**
*The function is called on load and set up everything,
*like player, monsters and game update function
*/
function init()
{
	context.clearRect(0, 0, canvas.width, canvas.height);
	console.log(enemies.length);
	localStorage.highScore = 0;
	document.getElementById('myCanvasDiv').style.height = canvas.height+"px";
	mainMenu();

}


function mainMenu()
{
	context.drawImage(title, canvas.width/2-title.width/2, 10, 600, 200);
	context.drawImage(originStart, canvas.width/2-originStart.width/2, 260);
	context.drawImage(help, canvas.width/2-about.width/2, 300+originStart.height);
	context.drawImage(achieveStart, canvas.width/2-achieveStart.width/2, 400+achieveStart.height);
	context.drawImage(aboutStart, canvas.width/2-aboutStart.width/2, 475+aboutStart.height);
	pCanvas.style.border = "none";

	context.lineWidth=1;
        context.fillStyle="#fff";
        context.lineStyle="#ff0";
        context.font="18px sans-serif";
        context.fillText("Current High Score: " + localStorage.highScore, 775, 50);

	canvas.addEventListener('mousemove', choiceHover, false);
        canvas.addEventListener('mousedown', choiceClick, false);
}

function choiceHover(ev)
{
//	mousePosDisplay(ev);
	var x, y;
	var pos = mouseLoc(ev);
	x = pos[0];
	y = pos[1];

	var startGameBounding = (x > canvas.width/2-start.width/2) && (x < canvas.width/2+start.width/2) && (y > 260) && (y < 260+start.height); 
	var helpBounding = (x > canvas.width/2-about.width/2) && (x < canvas.width/2+about.width/2) && (y > 300+start.height) && (y < ((300+start.height)+about.height));
	var achieveBounding = (x > canvas.width/2-achieveStart.width/2) && (x < canvas.width/2+achieveStart.width/2) && (y > 400+help.height) && (y < ((400+help.height)+achieveStart.height));
	var aboutBounding = (x > canvas.width/2-aboutStart.width/2) && (x < canvas.width/2+aboutStart.width/2) && (y > 475+achieveStart.height) && (y < ((475+achieveStart.height)+aboutStart.height));

	if(startGameBounding)
	{
		context.clearRect(canvas.width/2-start.width/2, 260, start.width, start.height);
		context.drawImage(start, canvas.width/2-start.width/2, 260);
	}else{
		context.clearRect(canvas.width/2-start.width/2, 260, originStart.width, originStart.height);
                context.drawImage(originStart, canvas.width/2-originStart.width/2, 260);
	}

	var drawAboutX = canvas.width/2-about.width/2;
	var drawAboutY = 300 + start.height; 
	
	if(helpBounding)
	{
		context.clearRect(canvas.width/2-about.width/2, 300+start.height, about.width, about.height);
		context.drawImage(helpSelect, drawAboutX, drawAboutY);
	}else{
               	context.clearRect(((canvas.width/2)-(aboutStart.width/2)), (300+start.height), aboutStart.width, aboutStart.height);
	        context.drawImage(help, drawAboutX, drawAboutY);
	}

	if(achieveBounding)
	{
		context.clearRect(((canvas.width/2)-(achieveStart.width/2)), (400+about.height), achieveStart.width, achieveStart.height);
		context.drawImage(achieve, canvas.width/2-achieveStart.width/2, 400+about.height);
	}else{
		context.clearRect(((canvas.width/2)-(achieveStart.width/2)), (400+about.height), achieveStart.width, achieveStart.height);
                context.drawImage(achieveStart, canvas.width/2-achieveStart.width/2, 400+about.height);
	}

	console.log(aboutBounding);

	if(aboutBounding)
	{
		context.clearRect(((canvas.width/2)-(aboutStart.width/2)), (475+aboutStart.height), aboutStart.width, aboutStart.height);
		context.drawImage(about, canvas.width/2-about.width/2, 475+about.height);
	}else{
		context.clearRect(((canvas.width/2)-(aboutStart.width/2)), (475+aboutStart.height), aboutStart.width, aboutStart.height);
		context.drawImage(aboutStart, canvas.width/2-about.width/2, 475+about.height);
	}	

}

function choiceClick(ev)
{
        var x, y;
        var pos = mouseLoc(ev);
        x = pos[0];
        y = pos[1];

        var start = new Image();
        start.src = 'start.png';
	
	//var star

        var startGameBounding = (x > canvas.width/2-start.width/2) && (x < canvas.width/2+start.width) && (y > 260) && (y < 260+start.height);
//      console.log(startGameBounding);
	var helpBounding = (x > canvas.width/2-about.width/2) && ( x < canvas.width/2+about.width) && (y > 300+originStart.height) && (y < (300+originStart.height)+about.height);
	var achieveBounding = (x > canvas.width/2-achieveStart.width/2) && (x < canvas.width/2+achieveStart.width/2) && (y > 400+about.height) && (y < ((400+about.height)+achieveStart.height));
	var aboutBounding = (x > canvas.width/2-aboutStart.width/2) && (x < canvas.width/2+aboutStart.width/2) && (y > 475+achieveStart.height) && (y < ((475+achieveStart.height)+aboutStart.height));

        if(startGameBounding)
        {
		gameInit();
        }

	if(helpBounding)
	{
		curious = true;
		localStorage.curious = true;
		aboutPage();
	}

	if(achieveBounding)
	{
		achieveList();
	}

	if(aboutBounding)
	{
		aboutInfo();
	}
}

function aboutInfo()
{
        canvas.removeEventListener('mousemove', choiceHover, false);
        canvas.removeEventListener('mousedown', choiceClick, false);

        context.clearRect(0, 0, canvas.width, canvas.height);

        context.lineWidth=1;
        context.fillStyle="#fff";
        context.lineStyle="#ff0";
        context.font="18px sans-serif";
        context.fillText("ABOUT!", 300, 100);
        context.fillText("This is my game I made for my university assignment ", 300, 225);
	context.fillText("The player graphic is an edited sprite from http://opengameart.org", 300, 275);
	context.fillText("There are also sound files from http://www.freesfx.co.uk/", 300, 325);

        context.fillText("Press enter to return to main menu", 300, 400);
        document.onkeypress = enterPressed;

}

function achieveList()
{
        canvas.removeEventListener('mousemove', choiceHover, false);
        canvas.removeEventListener('mousedown', choiceClick, false);

        context.clearRect(0, 0, canvas.width, canvas.height);

	console.log(localStorage.pacifist);	

        context.lineWidth=1;
        context.fillStyle="#fff";
        context.lineStyle="#ff0";
        context.font="18px sans-serif";
        context.fillText("ACHIEVES!", 300, 100);
        context.fillText("Curious: ", 300, 225);
	if(localStorage.curious)
	{
		context.fillText("GOT!", 600, 225);
	}
        context.fillText("Pest Control(Kill 50 Zombies): ", 300, 275);
	if(localStorage.pestControl)
	{
		context.fillText("GOT!", 600, 275);
	}
        context.fillText("Pacifist(Do not fire a bullet): ", 300, 325);
	if(localStorage.pacifist)
	{
		context.fillText("GOT!", 600, 325);
	}
	context.fillText("Gun Nut! (fire over 100 shots):", 300, 375);
	if(localStorage.gunNut)
	{
		context.fillText("GOT!", 600, 375);
	}
        context.fillText("Bad Shot(Die before level 4): ", 300, 425);
	if(localStorage.badShot)
	{
		context.fillText("GOT!", 600, 425);
	}
        context.fillText("Play for the first time: ", 300, 475);
	if(localStorage.firstPlay)
	{
		context.fillText("GOT!", 600, 475);
	}
	context.fillText("Press enter to return to main menu", 300, 550);

        document.onkeypress = enterPressed;

}


function aboutPage()
{
	canvas.removeEventListener('mousemove', choiceHover, false);
        canvas.removeEventListener('mousedown', choiceClick, false);

	context.clearRect(0, 0, canvas.width, canvas.height);

	context.lineWidth=1;
        context.fillStyle="#fff";
        context.lineStyle="#ff0";
        context.font="18px sans-serif";
        context.fillText("ATTACK OF THE ZOMBLES!", 300, 100);
	context.fillText("Rules:", 300, 200);
	context.fillText("Point mouse at the zombies as they come for your home.", 300, 275);
	context.fillText("When they are in sight click your mouse and destroy them.", 300, 300);
	context.fillText("If they get to close they will break down your fences and get you!", 300, 325);
	context.fillText("Press enter to return to menu", 300, 375);

	document.onkeypress = enterPressed;
}

//-------------------------------------Game methods---------------------------------------------------------//
function gameInit()
{
	context.clearRect(0, 0, canvas.width, canvas.height);
	    //player canvas positioning in center of game canvas
	//remove unused event listeners
	canvas.removeEventListener('mousemove', choiceHover, false);
        canvas.removeEventListener('mousedown', choiceClick, false);

	canvas.addEventListener('mousemove', rotate, false);
	canvas.addEventListener('mousedown', fire, false);

        var canvasXCent = ((canvas.width/2)-(pCanvas.width/2));
        var canvasYCent = ((canvas.height/2)-(pCanvas.height/2));
        pCanvas.style.top = canvasYCent + "px";
        pCanvas.style.left = canvasXCent + "px";
	pCanvas.style.border = "dashed";

	//sets up start level
	pLevel = 1;
	killed = 0;
	fired = 0;

	backMusic.play();

	localStorage.firstPlay = true;	

        //player.draw();
        var player = new playerObj();
        player.draw();

	newLevel(pLevel);
	arrayTotal = enemiesMax;        

	updateCanvas();
        id = setInterval(updateCanvas, 1000/60);

        updateEnemyAdd();
        //rand interval between 1 30
	
        var spawnTime = levelSpawnTime(pLevel);
        time = Math.floor((Math.random()*(2500-spawnTime+1))+spawnTime);
        id2 = setInterval(updateEnemyAdd, time/1);

}

/**
* Sets up spawn rates for enemies
*/
function newLevel(level)
{
	enemiesMax = level * 5;
	enemiesSpeed = level * 1;
}

/**
* sets min time takes to add enemies
*/
function levelSpawnTime(level)
{
	var time; 
	time = 1500 / level; 
	return time;
}

/**
*adds enemys to array with a random start position until enemie maximum is reached for that level
*/
function updateEnemyAdd()
{
	//start enemy offscreen
	var XorY = Math.random();
	var side = Math.random();
	var x, y;

	if(arrayTotal > 0)
	{	
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
		var enemy = new enemyObj(x, y);	
		enemies.push(enemy);
		arrayTotal--;
	}
}

/**
* clears and updates elements on the canvas
*/
function updateCanvas()
{
	clear();

	document.onkeypress = pPressed;	
	
	bulletHitZombie();	

	drawGui();	

	bulletUpdate();
	
	enemyUpdate();

	zombieHitPHouse();
}

function drawGui()
{
	context.lineWidth=1;
	context.fillStyle="#fff";
	context.lineStyle="#ff0";
	context.font="18px sans-serif";
	context.fillText("Score: " + pScore + "  HP: " + pHealth + " Level: " + pLevel + "  Enemies remaining: " + enemiesMax, 50, 30);
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
	player.src = 'player1.png';

	//this.health = 100;
	//this.score = 0;
	//this.level = 1;

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
	console.log("cake");
	x = "NULL"; 
	y = "NULL";

	fired++;
	if(fired >= 100)
	{
		localStorage.gunNut = true;
	}
	fireSound.play();
		
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
	bullet.src = 'bullet1.png';
	//console.log(bullet.width);
	this.bulletX = bullet.width; 
	this.bulletY = bullet.height;
	this.radius = this.bulletY/2;
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
	    var speed = 10.0;    
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
                if(bullets[i].x > canvas.width || bullets[i].x < 0 || bullets[i].y > canvas.height || bullets[i].y < 0)
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

	this.speed = enemiesSpeed;
	//this.health = 3;
	this.damage = 2;

	this.width = enemy.width;
	this.height = enemy.height;
	this.radius = this.height;
	this.x = x;
	this.y = y;
	this.borderX = "NULL";
	this.borderY = "NULL"; 
	this.angle = angleBetweenObjCenter(this.x, this.y);

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

			var dx = enemies[j].x - bullets[i].x;
                        var dy = enemies[j].y - bullets[i].y;
                        var dist = enemies[j].radius + bullets[i].radius;
                        var collision = dx * dx + dy * dy <= dist * dist;
                        if(collision)
                        {
                                enemies[j].health = enemies[j].health - 1;
                                bullets.splice(i, 1);
                                enemies.splice(j, 1);
				pScore = pScore + 10;
				enemiesMax--;
				killed++;
				if(killed >= 50)
				{
					localStorage.pestControl = true;
				}
				if(enemiesMax == 0)
				{
					pLevel++;
					levelSpawnTime(pLevel);
					newLevel(pLevel);
					arrayTotal = enemiesMax;
				}				 
				j++;
				i++;
                        }

		}
	}
}

function zombieHitPHouse()
{
	var i;
	for(i = 0; i < enemies.length; i++)
	{
		if(enemies[i].x <= (canvas.width/2+pCanvas.width/2) && ((enemies[i].x+enemies[i].width) >= (canvas.width/2-pCanvas.width/2)) && (enemies[i].y <= (canvas.height/2+pCanvas.height/2)) && (enemies[i].y >= ((canvas.height/2-pCanvas.height/2)-enemies[i].height)))
		{
			pHealth = pHealth - enemies[i].damage;
			enemies.splice(i, 1);
			enemiesMax--;
			pScore = pScore - 5;	
			if(enemiesMax == 0)
			{
			    pLevel++;
			    levelSpawnTime(pLevel);
			    newLevel(pLevel);
			    arrayTotal = enemiesMax;
			}

			//check players health
			if(pHealth <= 0)
			{
				if(fired == 0)
				{
					localStorage.pacifist = true;
				}
				if(pLevel == 3)
				{
					localStorage.badShot = true;
				}
				if(checkHighScore())
				{
					localStorage.highScore = pScore;
				}
				
				clearInterval(id);
				clearInterval(id2);
				canvas.removeEventListener('mousemove', rotate, false);
				canvas.removeEventListener('mousedown', fire, false);				
				context.clearRect(0, 0, canvas.width, canvas.height);
				pContext.clearRect(0, 0, pCanvas.width, pCanvas.height);
				pCanvas.style.border = "none"; 
//				canvas.width = canvas.width;
	
				context.lineWidth=1;
				context.fillStyle="#cof";
				context.lineStyle="#ff0";
				context.font="30px sans-serif";
				context.fillText("GAME OVER!", 400, 250);
				context.fillText("Press Enter to go to main menu", 400, 300);
				context.fillText("You scored: " + pScore, 400, 350);
				reset();
				
				document.onkeypress = enterPressed;

				//window.addEventListener('onkeypress', continueGame, false);
				//init();
			}
		} 
	}
}

/**
* Returns to main menu on enter pressed
*/
function enterPressed(e) 
{

	if (window.event && window.event.keyCode == 13) 
	{
		init();	
	}else if (e && e.keyCode == 13) 
	      {
    		init();
  	      }
}

function pPressed(e)
{
	if (window.event && window.event.keyCode == 112)
        {
		console.log("D");
                pause();
        }else if (e && e.keyCode == 112)
              {
                pause();
              }

   	document.onkeypress = resume

}

/**
* Pauses the game and waits to be unpaused
*/
function pause()
{
	      clearInterval(id);
              clearInterval(id2);
              canvas.removeEventListener('mousemove', rotate, false);
              canvas.removeEventListener('mousedown', fire, false);

	      context.clearRect(0, 0, canvas.width, canvas.height);
	      pContext.clearRect(0, 0, pCanvas.width, pCanvas.height);
	      pCanvas.style.border = "none";

	      context.save();
              context.lineWidth=1;
              context.fillStyle="#cof";
              context.lineStyle="#ff0";
              context.font="30px sans-serif";
              context.fillText("GAME PAUSED!", 300, 250);
              context.fillText("Press P to return to game", 300, 300);
	      context.fillText("Press Q to return to main menu", 300, 350);

	      document.onkeypress = resume;
}

/**
* Resumes the game where it left off
*/
function resume(e)
{
	if (window.event && window.event.keyCode == 112)
        {
                context.restore();
		id = setInterval(updateCanvas, 1000/60);
                id2 = setInterval(updateEnemyAdd, time/1);
                canvas.addEventListener('mousemove', rotate, false);
                canvas.addEventListener('mousedown', fire, false);
		pCanvas.style.border = "dashed";
        }else if (window.event && window.event.keyCode == 113)
              {
		reset();
		init();	
              }


}


//----------------------------------handy functions-----------------------------------------
/**
* converts high score from string to int and checks if new score is higher
*/
function checkHighScore()
{
//	var currentScore = parseInt(localStorage.highScore);
	var newHighScore = false;
	
	if(pScore > Number(localStorage.highScore))
	{
		newHighScore = true;
	}
	return newHighScore;
} 



/**
* resets all data
*/
function reset()
{
	pHealth = 50;
	pScore = 0;
	pLevel = 1;
	enemies = [];
	bullets = [];
	backMusic.pause();
}


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

	document.getElementById("mousePos").innerHTML = ("x=" + x +", y=" + y);

}



function clear()
{
	context.clearRect(0, 0, 1000, 1000);
}


//------------------------------Achievements--------------------------------\\

