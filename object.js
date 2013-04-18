//var context;
//var x, y;

function follow(ev)
{
//        var x = document.images.player.offsetLeft + 10;
//	var y = document.images.player.y;

//	player(400, 200, 5, ev); 
}



function ev_mousemove(ev) 
{

	var context = document.getElementById('myCanvas').getContext('2d');
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

function rotate()
{
	var player = new Image();
	player.src = "ball.png";

	var xcent = 400 + player.width/2;
	var ycent = 200 + player.height/2;

	
	context.clearRect(0, 0, 800, 400);

	context.save();

	context.translate(xcent, ycent);

	context.rotate(7 * Math.PI / 180);

	context.translate(-xcent, -ycent);
	//context.clearRect(0, 0, document.width, document.height);
	context.drawImage(player, xcent - player.width / 2, ycent - player.height / 2);

}

function player(x, y, angle, ev)
{
	context.clearRect(0, 0, document.width-200, document.height-200);
	
//	var pos = mouseLoc(ev);
//	x = pos[0]-30;
//	y = pos[1]-100;	

	var player = new Image();
	player.src = "ball.png";

//	 context.save();
//	 context.translate(x,y);     
//	 context.rotate(angle * Math.PI / 180);
         context.drawImage(player, x, y); 
//         context.restore();  


//	context.drawImage(player, 0, 0);

	 // And restore the context ready for the next loop
    //context.restore();
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
	base_image.src = 'ball.png';

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

