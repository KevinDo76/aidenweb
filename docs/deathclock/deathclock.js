setInterval(updateClock,0.25)

let i = 0;
let targetTime = 1727280000
function updateClock()
{
    let clockP = document.getElementById("clock");
    let secondsLeft = targetTime-Math.floor(new Date().getTime()/1000);
    let dayLeft = Math.floor(secondsLeft/(60*60*24));
    secondsLeft -= dayLeft * 60 * 60 * 24;

    let hoursLeft = Math.floor(secondsLeft/(60*60));
    secondsLeft -= hoursLeft * 60 * 60;

    let minutesLeft = Math.floor(secondsLeft/(60));
    secondsLeft -= minutesLeft * 60;

    clockP.textContent = String(dayLeft).padStart(2, '0')+"d:"+String(hoursLeft).padStart(2, '0')+"h:"+String(minutesLeft).padStart(2, '0')+"m:"+String(secondsLeft).padStart(2, '0')+"s";
}