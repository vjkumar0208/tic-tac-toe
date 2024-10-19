const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions=[
    [0,1,2],
    [3,4,5], 
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let's create a function to initialise the game
function initGame() {
    currentPlayer="X";          //initially current player x hoga
    gameGrid=["","","","","","","","",""];      //grid empty hogi
    newGameBtn.classList.remove("active");      //hide kar dia new game button
    gameInfo.innerText=`Current Player-${currentPlayer}`;        //initial currentPlayer daal dia
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";     //cursor pointer hata dia
        box.classList=`box box${index+1}`;      //default css properties after winning (green color hat jayega)
    });
}
initGame();

function checkGameOver(){
    
    let ans="";
    winningPositions.forEach((position)=>{
        //all 3 boxes should be non empty and equal to each other for win
        if((gameGrid[position[0]] !=="" && gameGrid[position[1]] !=="" && gameGrid[position[2]] !=="")
            && (gameGrid[position[0]] === gameGrid[position[1]]) && ( gameGrid[position[1]] === gameGrid[position[2]])){
            
            if(gameGrid[position[0]]==="X") ans="X";
            else ans="O";

            //disable pointer events
            boxes.forEach((box)=>{      //jeetne ke baad koi chal nhi sakta
                box.style.pointerEvents="none";
            })
            //now we know X/O is winner
            //so 3 boxes pe background green ho jayega
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });
    if(ans!==""){  //means we have a winner
        gameInfo.innerText=`Winner Player-${ans}`;      //jeetne par winner player ayega 
        newGameBtn.classList.add("active");     
        return ;
    }
    //when there is no winner or tie
    let count=0;
    gameGrid.forEach((box)=>{
        if(box !=="") {
            count++;
        }
    });
    if(count===9){
        gameInfo.innerText=`Game Tied`;
        newGameBtn.classList.add("active");

    }
}
function swapTurn(){
    if(currentPlayer==="X") currentPlayer="O";
    else currentPlayer="X";
    gameInfo.innerText=`Current Player-${currentPlayer}`;
}
function handleClick(index){
    if(gameGrid[index]===""){
        gameGrid[index]=currentPlayer;      //ye gamegrid me update karega
        boxes[index].innerText=currentPlayer;      //ye UI me update karega
        boxes[index].style.pointerEvents="none";
        swapTurn();         //turn change
        checkGameOver();     //check karo jeete to nhi
    }   
}
boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
})

newGameBtn.addEventListener("click",initGame);