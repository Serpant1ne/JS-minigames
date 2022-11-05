const GAME = document.getElementById('game');

const ROWS = 8;
const COLS = 8;
const MINES = 20;

function getRandom(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function makeBoard (rows, cols, mines, parent){
    let board = document.createElement('div');
    let btnsList = [];
    let minesList = [];
    // creating buttons and rows
    for(let a = 0; a < rows; a++){
        let row = document.createElement('div')
        row.classList.add('row')
        for (let i = 0; i < cols; i++){
            let btn = document.createElement('button');
            btn.classList.add('btn', 'row'+(a+1), 'col'+( i+1));
            btn.style.width = '60px';
            btn.style.height = '60px';
            btn.style.fontSize = '16px'
            btn.textContent = (a+1) + ' ' + (i+1);
            btnsList.push(btn)
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
        let minesNearby = 0;
        let btnCoordinates = btn.textContent.split(' ');
        btn.textContent = '0';
        for (let i = 0; i < 2; i++){
            btnCoordinates[i] = parseInt(btnCoordinates[i]);
        }
        // checking if button is near board side (using classname and textcontent)
        // first checking angles, then rows, then columns

        // Angles check
        if (btn.classList.contains('col1') && btn.classList.contains('row1')){
            for (let a = 0; a < minesList.length; a++){
                let mine = minesList[a];
                if (mine.classList.contains('row1') && mine.classList.contains('col2') || mine.classList.contains('row2') && mine.classList.contains('col1') || mine.classList.contains('row2') && mine.classList.contains('col2')){
                    minesNearby = minesNearby + 1;
                    btn.textContent = minesNearby;
                }
            }
        }
        else if (btn.classList.contains('col' + cols) && btn.classList.contains('row' + rows)){
            for (let a = 0; a < minesList.length; a++){
                let mine = minesList[a];
                if (mine.classList.contains('row' + rows) && mine.classList.contains('col' + (cols-1)) || mine.classList.contains('row' + (rows-1)) && mine.classList.contains('col'  + cols) || mine.classList.contains('row' + (rows-1)) && mine.classList.contains('col' + (cols-1))){
                    minesNearby = minesNearby + 1;
                    btn.textContent = minesNearby;
                }
            }
        }
        else if (btn.classList.contains('col1') && btn.classList.contains('row' + rows)){
            for (let a = 0; a < minesList.length; a++){
                let mine = minesList[a];
                if (mine.classList.contains('row' + rows) && mine.classList.contains('col2') || mine.classList.contains('row' + (rows-1)) && mine.classList.contains('col1') || mine.classList.contains('row' + (rows-1)) && mine.classList.contains('col2')){
                    minesNearby = minesNearby + 1;
                    btn.textContent = minesNearby;
                }
            }
        }
        else if (btn.classList.contains('col' + cols) && btn.classList.contains('row1')){
            for (let a = 0; a < minesList.length; a++){
                let mine = minesList[a];
                if (mine.classList.contains('row1') && mine.classList.contains('col' + (cols-1)) || mine.classList.contains('row2') && mine.classList.contains('col' + (cols-1)) || mine.classList.contains('row2') && mine.classList.contains('col'  + cols)){
                    minesNearby = minesNearby + 1;
                    btn.textContent = minesNearby;
                }
            }
        }

        // Rows check
        else if (btnCoordinates[0] === 1){
            for (let a = 0; a < minesList.length; a++){
                let mine = minesList[a];
                if (mine.classList.contains('row1')){
                    if(mine.classList.contains('col' + (btnCoordinates[1] - 1)) || mine.classList.contains('col' + (btnCoordinates[1] + 1))){
                        minesNearby = minesNearby + 1;
                        btn.textContent = minesNearby;
                    }
                }
                else if (mine.classList.contains('row2')){
                    if(mine.classList.contains('col' + (btnCoordinates[1] - 1)) || mine.classList.contains('col' + (btnCoordinates[1] + 1)) || mine.classList.contains('col' + (btnCoordinates[1]))){
                        minesNearby = minesNearby + 1;
                        btn.textContent = minesNearby;
                    }
                }
            }
        }

        else if (btnCoordinates[0] === rows){
            for (let a = 0; a < minesList.length; a++){
                let mine = minesList[a];
                if (mine.classList.contains('row' + rows)){
                    if(mine.classList.contains('col' + (btnCoordinates[1] - 1)) || mine.classList.contains('col' + (btnCoordinates[1] + 1))){
                        minesNearby = minesNearby + 1;
                        btn.textContent = minesNearby;
                    }
                }
                else if (mine.classList.contains('row' + (rows-1))){
                    if(mine.classList.contains('col' + (btnCoordinates[1] - 1)) || mine.classList.contains('col' + (btnCoordinates[1] + 1)) || mine.classList.contains('col' + (btnCoordinates[1]))){
                        minesNearby = minesNearby + 1;
                        btn.textContent = minesNearby;
                    }
                }
            }
        }

        // Columns check

        else if (btnCoordinates[1] === 1){
            for (let a = 0; a < minesList.length; a++){
                let mine = minesList[a];
                if (mine.classList.contains('col1')){
                    if(mine.classList.contains('row' + (btnCoordinates[0] - 1)) || mine.classList.contains('row' + (btnCoordinates[0] + 1))){
                        minesNearby = minesNearby + 1;
                        btn.textContent = minesNearby;
                    }
                }
                else if (mine.classList.contains('col2')){
                    if(mine.classList.contains('row' + (btnCoordinates[0] - 1)) || mine.classList.contains('row' + (btnCoordinates[0] + 1)) || mine.classList.contains('row' + (btnCoordinates[0]))){
                        minesNearby = minesNearby + 1;
                        btn.textContent = minesNearby;
                    }
                }
            }
        }

        else if (btnCoordinates[1] === cols){
            for (let a = 0; a < minesList.length; a++){
                let mine = minesList[a];
                if (mine.classList.contains('col' + cols)){
                    if(mine.classList.contains('row' + (btnCoordinates[0] - 1)) || mine.classList.contains('row' + (btnCoordinates[0] + 1))){
                        minesNearby = minesNearby + 1;
                        btn.textContent = minesNearby;
                    }
                }
                else if (mine.classList.contains('col' + (cols-1))){
                    if(mine.classList.contains('row' + (btnCoordinates[0] - 1)) || mine.classList.contains('row' + (btnCoordinates[0] + 1)) || mine.classList.contains('row' + (btnCoordinates[0]))){
                        minesNearby = minesNearby + 1;
                        btn.textContent = minesNearby;
                    }
                }
            }
        }

        // Inner buttons check

        else{
            for (let a = 0; a < minesList.length; a++){
                let mine = minesList[a];
                if (mine.classList.contains('row' + (btnCoordinates[0]-1))){
                    if (mine.classList.contains('col' + btnCoordinates[1]) || mine.classList.contains('col' + (btnCoordinates[1] - 1)) || mine.classList.contains('col' + (btnCoordinates[1] + 1))){
                        minesNearby = minesNearby + 1;
                        btn.textContent = minesNearby;
                    }
                }
                if (mine.classList.contains('row' + (btnCoordinates[0]+1))){
                    if (mine.classList.contains('col' + btnCoordinates[1]) || mine.classList.contains('col' + (btnCoordinates[1] - 1)) || mine.classList.contains('col' + (btnCoordinates[1] + 1))){
                        minesNearby = minesNearby + 1;
                        btn.textContent = minesNearby;
                    }
                }
                if (mine.classList.contains('row' + (btnCoordinates[0]))){
                    if (mine.classList.contains('col' + (btnCoordinates[1] - 1)) || mine.classList.contains('col' + (btnCoordinates[1] + 1))){
                        minesNearby = minesNearby + 1;
                        btn.textContent = minesNearby;
                    }
                }
            }
        }
    }

    // Making buttons without text and add opening it
    
}

makeBoard(ROWS,COLS,MINES,GAME)
