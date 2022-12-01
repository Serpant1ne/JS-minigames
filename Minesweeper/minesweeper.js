const GAME = document.getElementById('game');

function makeGameStatus(parent){
    let winText = document.createElement('h3');
    let loseText = document.createElement('h3');
    winText.style.color = 'green';
    loseText.style.color = 'red';
    winText.textContent = 'You win! 😁';
    loseText.textContent = 'You lose. 😭';
    winText.classList.add('display-none');
    winText.style.textAlign = 'center';
    winText.id = 'win';
    loseText.classList.add('display-none');
    loseText.style.textAlign = 'center';
    loseText.id = 'lose';
    parent.append(winText);
    parent.append(loseText);
}

function gameWin(){
    let el = document.getElementById('win');
    el.classList.remove('display-none');
    el.classList.add('inline-block');
}

function gameLose(){
    let el = document.getElementById('lose');
    el.classList.remove('display-none');
    el.classList.add('inline-block');
}

function makeForm(parent){
    let form = document.createElement('div');
    let rowsDesc = document.createElement('span');
    let colsDesc = document.createElement('span');
    let minesDesc = document.createElement('span');
    let rowsInput = document.createElement('input');
    let colsInput = document.createElement('input');
    let minesInput = document.createElement('input');
    let submitBtn = document.createElement('button');
    rowsDesc.textContent = 'rows';
    colsDesc.textContent = 'cols';
    minesDesc.textContent = 'mines';
    form.style.padding = '100px';
    form.style.background = '#ffffff';
    form.style.borderRadius = '12px';
    form.style.marginBottom = '50px';
    form.style.display = 'flex';
    form.style.flexDirection = 'column';
    submitBtn.style.width = '150px';
    submitBtn.style.margin = '0 auto';
    rowsInput.style.marginBottom = '18px';
    colsInput.style.marginBottom = '18px';
    minesInput.style.marginBottom = '18px';
    submitBtn.width = '100px';
    submitBtn.height = '100px';
    submitBtn.textContent = 'Refresh';
    rowsInput.value = '6';
    colsInput.value = '6';
    minesInput.value = '10';
    form.append(rowsDesc);
    form.append(rowsInput);
    form.append(colsDesc);
    form.append(colsInput);
    form.append(minesDesc);
    form.append(minesInput);
    form.append(submitBtn);
    parent.append(form);
    



    submitBtn.addEventListener('click', function(){
        let old = document.getElementById('board');
        old.remove();
        makeBoard(rowsInput.value,colsInput.value,minesInput.value,GAME);
        return [
            MINES = minesInput.value,
            ROWS = rowsInput.value,
            COLS = colsInput.value]
    })

    return [
        MINES = minesInput.value,
        ROWS = rowsInput.value,
        COLS = colsInput.value]



}

function checkBtn(btn){
    if(!btn.opened){
        btn.opened = true
        btn.style.color = '#0f172a';
        btn.textContent = btn.context;
        if (btn.context === '💣'){
            gameLose();

            let collection = document.getElementsByClassName('btn');
            for (let i = 0; i < collection.length; i++) {
                const el = collection[i];
                el.style.color = '#0f172a';
                if(el.textContent === '🚩' && el.context != '💣'){
                    el.textContent = '❌';
                }
                else if (el.textContent === '🚩' && el.context === '💣'){
                    el.textContent = '🚩';
                }
                else if(el.context === '💣' && el.textContent != '🚩'){
                    el.textContent = '💣';
                }
                else if (el.context != '💣' && el.textContent != '🚩'){
                    el.textContent = el.context;
                }
                el.disabled = true;
                
            }
            btn.textContent = '💥';
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
        let opened = 0
        let collection = document.getElementsByClassName('btn');
            for (let i = 0; i < collection.length; i++) {
                const el = collection[i];
                if(el.opened){
                    opened++;
                }

                
            }
            if(opened === (COLS*ROWS - MINES)){
                gameWin()
            }
        btn.disabled = true;
    }
    

}

function getRandom(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function makeBoard (rows, cols, mines, parent){
    let board = document.createElement('div');
    board.id = 'board';
    let btnsList = [];
    let allList = [];
    let minesList = [];
    // creating buttons and rows
    for(let a = 0; a < rows; a++){
        let row = document.createElement('div')
        row.classList.add('row');
        row.style.width = 'fit-content';
        row.style.margin = '0 auto';
        for (let i = 0; i < cols; i++){
            let btn = document.createElement('button');
            btn.opened = false;
            btn.isMine = false;
            btn.classList.add('btn');
            let size = (540 / cols);
            btn.style.width = size + 'px';
            btn.style.height = size + 'px';
            btn.style.fontSize = '16px';
            btn.coordinates = [a+1, i+1]
            btn.style.border = '1px solid #0f172a';
            btn.style.background = '#ffffff';
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

    
    return board;
}


makeForm(GAME);
makeGameStatus(GAME);
makeBoard(ROWS,COLS,MINES,GAME);


