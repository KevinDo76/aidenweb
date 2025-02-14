let lockedCellList = [];

function removeItem(array, itemToRemove) {
    const index = array.indexOf(itemToRemove);

    if (index !== -1) {
        array.splice(index, 1);
    }
}

function init() 
{
    for (let i=0;i<81;i++)
    {
        let cell = document.getElementById("sudoBox"+i);
        cell.style.color = "#000000"
        cell.onclick = function() 
        {
            if (cell.value=="")
            {
                cell.style.color = "#000000"
            } 
        }
        cell.oninput = function() {
            var reg = new RegExp('^[1-9]$');
            cell.style.color = "#ff0000"
            if (!reg.test(cell.value) || !validateCellVerticle(this.id.substring(7), cell.value) || !validateCellHorizontal(this.id.substring(7), cell.value) || !validateCellBlock(this.id.substring(7), cell.value))
            {
                cell.value=null;

            }

            if (cell.value=="")
            {
                removeItem(lockedCellList, Number(this.id.substring(7)));
            }
            else
            {
                lockedCellList.push(Number(this.id.substring(7)));
            }
        }
    }

    clearCells();
}

function clearCells()
{
    for (let i=0;i<81;i++)
    {
        let cell = document.getElementById("sudoBox"+i);
        cell.value = null;
    }

}

function validateCellBlock(id, element)
{
    blockX = Math.floor((id%9)/3);
    blockY = Math.floor((id-(id%9))/27)
    for (let y=0;y<3;y++)
    {
        for (let x=0;x<3;x++)
        {
            let current = blockX*3+ blockY*27+ (y*9+x);
            let cell = document.getElementById("sudoBox"+current);
            if (cell.value==element && current!=id)
            {
                return false;
            }
        }
    }
    return true;
}

function validateCellHorizontal(id, element)
{
    rowStart = id-(id%9);
    for (let i=0;i<9;i++)
    {
        let current = rowStart+i;
        let cell = document.getElementById("sudoBox"+current);
        if (cell.value==element && current!=id)
        {
            return false;
        }
    }
    return true;
}

function validateCellVerticle(id, element)
{
    rowStart = id%9;

    for (let i=0;i<9;i++)
    {
        let current = rowStart+(i*9);
        let cell = document.getElementById("sudoBox"+current);
        if (cell.value==element && current!=id)
        {
            return false;
        }
    }
    return true;
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}
  
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}  

function validateAll(id, element)
{
    return (validateCellHorizontal(id, element) && validateCellVerticle(id, element) && validateCellBlock(id, element));
}

function incrementCell(id)
{
    let cell = document.getElementById("sudoBox"+id);
    currentValue = cell.value;
    for (let i = currentValue;i<9;i++)
    {
        currentValue++;
        let isValid=validateAll(id, currentValue);
        if (isValid)
        {
            cell.value=currentValue;
            return true;
        }
    }
    cell.value="";
    return false;
}

function clearAll()
{
    lockedCellList=[];
    for (let i=0;i<81;i++)
    {
        let cell = document.getElementById("sudoBox"+i);
        cell.value="";
    }
}

function clearCells()
{
    for (let i=0;i<81;i++)
    {
        let cell = document.getElementById("sudoBox"+i);
        if (!lockedCellList.includes(i))
        {
            cell.value = null;
        }
    }
}

async function sudokuSolve()
{
    
    let iterationCount = 0;
    
    let currentCell = 0;
    while (lockedCellList.includes(currentCell))
    {
        currentCell++;
    }

    console.log("Start!");
    while (true)
    {
        if (iterationCount%1000==0)
        {
            await sleep(1);
            console.log(iterationCount);
        }
        iterationCount++;
        let cell = document.getElementById("sudoBox"+currentCell);
        if (!lockedCellList.includes(currentCell))
        {
            cell.style.color = "#00ff00"
            let success = incrementCell(currentCell);
            if (success)
            {
                do {
                    currentCell++;
                } while (lockedCellList.includes(currentCell));
                if (currentCell>=81)
                {
                    break;
                }
            } else {
                do {
                    currentCell--;
                } while (lockedCellList.includes(currentCell));
            }
        }
    }
    console.log("Done!")
    
}


window.onload = init;