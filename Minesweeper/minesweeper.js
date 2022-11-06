const GAME = document.getElementById('game');

const ROWS = 8;
const COLS = 8;
const MINES = 20;

function checkBtn(btn, oldText){
    if (oldText != '💣') {
        btn.textContent = oldText;
        btn.style.color = '#0f172a';
        btn.disabled = true;
        // if (btn.textContent === '0'){
        //     checkBtn()
        // }
    }
    else{
        console.log('you losed');
        btn.textContent = oldText;
        btn.style.color = '#0f172a';
        // add showing all buttons text and disable them
    }
}

function getRandom(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function makeBoard (rows, cols, mines, parent){
    let board = document.createElement('div');
    let btnsList = [];
    let allList = [];
    let minesList = [];
    // creating buttons and rows
    for(let a = 0; a < rows; a++){
        let row = document.createElement('div')
        row.classList.add('row')
        for (let i = 0; i < cols; i++){
            let btn = document.createElement('button');
            btn.classList.add('btn');
            btn.style.width = '60px';
            btn.style.height = '60px';
            btn.style.fontSize = '16px';
            btn.coordinates = [a+1, i+1]
            btn.style.border = '1px solid #0f172a';
            btnsList.push(btn);
            allList.push(btn);
            row.append(btn);
        }
        board.append(row);
        parent.append(board);
    }
    // filling random buttons with mines
    let minesCount = 0
    for (let i = 0; i < mines; i++) {
        let arrayIndex = getRandom(0, rows*cols-1 - minesCount);
        let btn = btnsList[arrayIndex];
        if (btn.textContent != '💣'){
            btn.textContent = "💣";
            minesList.push(btn);
            btnsList.splice(arrayIndex, 1);
            minesCount = minesCount + 1;
        }
    }
    // making other buttons with numbers
    for (let i = 0; i < btnsList.length; i++){
        let btn = btnsList[i];
        let btnCoords = btn.coordinates;
        let minesNearby = 0;
        btn.textContent = '0';
        
        // All buttons without mines checking how many mines around

        for (let a = 0; a < minesList.length; a++){
            let mine = minesList[a];
            let mineCoords = mine.coordinates;
            if (btnCoords[0] === (mineCoords[0] - 1)){
                if (mineCoords[1] === btnCoords[1] || mineCoords[1] === (btnCoords[1] + 1) || mineCoords[1] === (btnCoords[1] - 1)){
                    minesNearby = minesNearby + 1;
                    btn.textContent = minesNearby;
                }
            }
            if (btnCoords[0] === (mineCoords[0] + 1)){
                if (mineCoords[1] === btnCoords[1] || mineCoords[1] === (btnCoords[1] + 1) || mineCoords[1] === (btnCoords[1] - 1)){
                    minesNearby = minesNearby + 1;
                    btn.textContent = minesNearby;
                }
            }
            if (btnCoords[0] === mineCoords[0]){
                if (mineCoords[1] === (btnCoords[1] + 1) || mineCoords[1] === (btnCoords[1] - 1)){
                    minesNearby = minesNearby + 1;
                    btn.textContent = minesNearby;
                }
            }
        }
    }

    // Making buttons without text and add opening it

    for(let i = 0; i < allList.length; i++){
        let oldText = allList[i].textContent;
        allList[i].textContent = '.';
        allList[i].style.color = '#ffffff';
        allList[i].addEventListener('click', function(){
            checkBtn(allList[i], oldText);
        });
        allList[i].addEventListener('contextmenu', function(ev){
            ev.preventDefault();
            if (allList[i].textContent != '🚩'){
                allList[i].textContent = '🚩';
            }
            else if (allList[i].textContent === '🚩'){
                allList[i].textContent = '.';
            }
            return false;
        });
    }

    
    
}



makeBoard(ROWS,COLS,MINES,GAME)
