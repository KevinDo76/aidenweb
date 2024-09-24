setInterval(updateClock,0.25)

const timeZoneOffset = 7
const targetTime = 1727280000
function updateClock()
{
    let targetDate = new Date(targetTime*1000);

    let targetP = document.getElementById("targetStamp");
    let clockP = document.getElementById("clock");
    let timeDiffSeconds = targetTime-Math.floor(new Date().getTime()/1000);

    let secondsLeft = timeDiffSeconds;

    let dayLeft = Math.floor(secondsLeft/(60*60*24));
    secondsLeft -= dayLeft * 60 * 60 * 24;

    let hoursLeft = Math.floor(secondsLeft/(60*60));
    secondsLeft -= hoursLeft * 60 * 60;

    let minutesLeft = Math.floor(secondsLeft/(60));
    secondsLeft -= minutesLeft * 60;
    
    /*idk how to get date format working so here we are*/
    
    if (timeDiffSeconds>=0)
    {
        clockP.textContent = String(dayLeft).padStart(2, '0')+"d "+String(hoursLeft).padStart(2, '0')+"h "+String(minutesLeft).padStart(2, '0')+"m "+String(secondsLeft).padStart(2, '0')+"s";
    }
    else 
    {

        clockP.textContent = "TIME PASSED";
    }

    targetP.textContent = "Until "+String(targetDate.getMonth()+1).padStart(2, '0')+
    "/"+String(targetDate.getDate()).padStart(2, '0')+
    "/"+String(targetDate.getFullYear()).padStart(2, '0')+
    " "+String(targetDate.getHours())+
    ":"+String(targetDate.getMinutes()).padStart(2, '0')+
    " "+(targetDate.getHours() >= 12 ? 'PM' : 'AM')+
    " UTC"+(targetDate.getTimezoneOffset()/60 > 0 ? "-" : "+")+
    String(Math.abs(targetDate.getTimezoneOffset()/60)).padStart(2, '0')+
    ":00";

    clockP.style = "color: "+((secondsLeft)%2==0 ? "#d1001f" : " #ff0000")+"; font-style: normal;"
}