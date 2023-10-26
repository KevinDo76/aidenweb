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
