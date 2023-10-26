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

var thing = document.createElement("p");
var text = document.createTextNode("balls");
thing.appendChild(text);
thing.style = "position: absolute;";
thing.style.zIndex = 10;
thing.className = "paraMain1";
document.body.appendChild(thing);

document.body.addEventListener("mousemove",moveball, false);
document.body.addEventListener("mouseleave",moveball, false);
document.body.addEventListener("mouseenter",moveball, false);

function moveball(event) { 
	var x=event.clientX; 
	var y=event.clientY;  
	thing.style.left = x+"px";
	thing.style.top = y+"px";
} 