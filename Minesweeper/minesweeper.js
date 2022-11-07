const GAME = document.getElementById('game');

const ROWS = 16;
const COLS = 18;
const MINES = 15;

// #TODO make button 'try again' and form with rows, cols, mines customising and refresh

function checkBtn(btn){
    if(!btn.opened){
        btn.opened = true
        btn.style.color = '#0f172a';
        btn.textContent = btn.context;
        if (btn.context === '💣'){
            btn.textContent = '💥';
            console.log('lose');
            // #TODO add showing all buttons text and disable them

            // #TODO add lose text

            // #TODO add changing textcontent of if under flag wasnt mine then cross
        }
        else if (btn.context === 0){
            let collection = document.getElementsByClassName('btn');
            let closedbuttons = [...collection];
            for (let i = 0; i < closedbuttons.length; i++){
                let checkBtnCoords = closedbuttons[i].coordinates;
                let btnCoords = btn.coordinates
                if (btnCoords[0] === (checkBtnCoords[0] - 1)){
                    if (checkBtnCoords[1] === btnCoords[1] || checkBtnCoords[1] === (btnCoords[1] + 1) || checkBtnCoords[1] === (btnCoords[1] - 1)){
                        checkBtn(closedbuttons[i])
                    }
                }
                if (btnCoords[0] === (checkBtnCoords[0] + 1)){
                    if (checkBtnCoords[1] === btnCoords[1] || checkBtnCoords[1] === (btnCoords[1] + 1) || checkBtnCoords[1] === (btnCoords[1] - 1)){
                        checkBtn(closedbuttons[i])
                    }
                }
                if (btnCoords[0] === checkBtnCoords[0]){
                    if (checkBtnCoords[1] === (btnCoords[1] + 1) || checkBtnCoords[1] === (btnCoords[1] - 1)){
                        checkBtn(closedbuttons[i])
                        
                    }
                }
            }
            
        }
        else{
            btn.disabled = true;
        }
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
            btn.opened = false;
            btn.isMine = false;
            btn.classList.add('btn');
            
            let size = (1080 / cols);
            // #todo rework width and size (make it adaptive)
            btn.style.width = size + 'px';
            btn.style.height = size + 'px';
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
            btn.context = '💣';
            btn.isMine = true
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
                }
            }
            if (btnCoords[0] === (mineCoords[0] + 1)){
                if (mineCoords[1] === btnCoords[1] || mineCoords[1] === (btnCoords[1] + 1) || mineCoords[1] === (btnCoords[1] - 1)){
                    minesNearby = minesNearby + 1;
                }
            }
            if (btnCoords[0] === mineCoords[0]){
                if (mineCoords[1] === (btnCoords[1] + 1) || mineCoords[1] === (btnCoords[1] - 1)){
                    minesNearby = minesNearby + 1;
                    
                }
            }
            btn.context = minesNearby;
            btn.textContent = minesNearby;
        }
    }

    // Making buttons without text and add actions on clicks

    for(let i = 0; i < allList.length; i++){
        allList[i].textContent = '.';
        allList[i].style.color = '#ffffff';
        allList[i].addEventListener('click', function(){
            checkBtn(allList[i]);
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



makeBoard(ROWS,COLS,MINES,GAME);


