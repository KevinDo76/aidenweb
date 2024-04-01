function headerClick() {
	var iframe = document.createElement("iframe");
	if (document.getElementById("rickplayer") === null) {
		iframe.id = "rickplayer";
		iframe.width = 400;
		iframe.height = 400;
		iframe.src = "https://www.youtube.com/embed/uHgt8giw1LY?autoplay=1&mute=1&controls=0"; 
		var body = document.getElementById("rickBody");
		body.appendChild(iframe);
	}
}

var currentCur = {x:20,y:20};
var prevCur = {x:20,y:20};
var GravPos = {x:100,y:100};

document.body.addEventListener("mousemove",moveGravCenter, false);
document.body.addEventListener("mouseleave",moveGravCenter, false);
document.body.addEventListener("mouseenter",moveGravCenter, false);

setInterval(computeCursorBallPhysic,0.001)

function computeCursorBallPhysic() {
	let timeStep = 0.05;
	let gravConst = 1000000;
	let tempPrevPos = {x: currentCur.x, y: currentCur.y};
	let distanceToCen = Math.sqrt(Math.pow(currentCur.x - GravPos.x,2) + Math.pow(GravPos.y - currentCur.y,2));
	let VectToCen = {x: (GravPos.x - currentCur.x)/distanceToCen, y: (currentCur.y - GravPos.y)/distanceToCen};
	let velocity = {x: (currentCur.x - prevCur.x), y: (currentCur.y - prevCur.y)};
	let Acc = {x: gravConst/(distanceToCen*distanceToCen+0.1)*VectToCen.x, y:gravConst/(distanceToCen*distanceToCen+0.1)*-VectToCen.y};
	//let Acc = {x: VectToCen.x*0.9 - velocity.x*0.3, y:VectToCen.y*-0.9 - velocity.y*0.3};
	Acc = {x: Acc.x - velocity.x*0.3, y: Acc.y - velocity.y*0.3};
	Acc.x = Math.min(Math.max(Acc.x,-15),15);
	Acc.y = Math.min(Math.max(Acc.y,-15),15);


	currentCur.x = 2 * currentCur.x - prevCur.x + Acc.x * (timeStep*timeStep);
	currentCur.y = 2 * currentCur.y - prevCur.y + Acc.y * (timeStep*timeStep);
	prevCur = {x: tempPrevPos.x, y: tempPrevPos.y};

	currentCur = {x: Math.min(Math.max(currentCur.x,20),window.innerWidth-20),y: Math.min(Math.max(currentCur.y,0),window.innerHeight-20)};

	let ball = document.getElementById("ball");
	ball.style.left = (currentCur.x-5)+"px";
	ball.style.top = (currentCur.y-5)+"px";
}

function moveGravCenter(event) { 
	GravPos.x = event.pageX; 
	GravPos.y = event.pageY;  
	let gravCen = document.getElementById("gravCen");
	gravCen.style.left = (GravPos.x-5)+"px";
	gravCen.style.top = (GravPos.y-5)+"px";
} 