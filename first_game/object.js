var context;
var catx;
var caty;
//var x, y;

function begin()
{
	var intervalID=setInterval(move, 2000);
}


function move() 
{
	var context = document.getElementById('myCanvas').getContext('2d');
	var catx = Math.floor((Math.random()*800)+1);
	var caty = Math.floor((Math.random()*400)+1);
	
	context.clearRect(0, 0, 800, 400);

	var img = new Image();
	img.src = 'katycat.png';
	
	context.drawImage(img, catx, caty);
	//console.log(x);
	
//	cat_hit()
};

function clear()
{
	context.clearRect(0, 0, 800, 400);
}

function ev_cat_hit(ev)
{
        var context = document.getElementById('myCanvas').getContext('2d');
	var mx;
	var my;

	if(ev.layerX || ev.layerY == 0)
	{
		x = ev.layerX;
		y = ev.layerY;
	}else if(e.offsetX || e.offsetX ==0)
	{
		x = ev.offsetX;
		y = ev.offsetY;
	}

	
	if (x > catx+100 )
	{
		clear();
	}


	console.log(x);
	console.log(catx);
}
