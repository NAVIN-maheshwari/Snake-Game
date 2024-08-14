let board = document.querySelector(".board");
let snack = [{x : 6,y:12}];
let food = createRandomFood();
let currInterval;
let dir = "ArrowRight";

function displaySnake()
{
    board.innerHTML=``;
    drawSnack();
    displayFood();
}
displaySnake();

function drawSnack()
{
    snack.forEach((ele)=>{
        let snackSegment = getSegment();
        setPosition(snackSegment,ele);
        board.appendChild(snackSegment);
    })
}

function getSegment()
{
    let element = document.createElement("div");
    element.className = "snack";
    return element;
}

function setPosition(div,ele)
{
    div.style.gridColumn = ele.x;
    div.style.gridRow = ele.y;
}

function displayFood()
{
    let foodElement = document.createElement("div");
    foodElement.className = "food";
    foodElement.style.gridColumn = food.x;
    foodElement.style.gridRow = food.y;

    board.appendChild(foodElement);
}

function createRandomFood()
{
    let randomFood = {};
    randomFood.x = Math.ceil(Math.random()*21);
    
    randomFood.y = Math.ceil(Math.random()*21);

    return randomFood;
}

let move = function()
{
  if(snack[0].x > 21 || snack[0].y > 21 || snack[0].x <1 || snack[0].y < 1)
    {
      clearInterval(currInterval);
      alert("game over");
      let button = document.createElement("button");
      button.innerHTML = "Start";
      button.setAttribute(onclick,"startingPointOfGame()");
      document.querySelector("body").appendChild(button);
      return;
    }

  let head = {...snack[0]}; //padna hai iske bare mai
  
  if(dir == "ArrowRight")
  {
    head.x++;
  }
  else if(dir=="ArrowUp")
  {
    head.y--;
  }
  else if(dir == "ArrowLeft")
  {
    head.x--;
  }
  else{
    head.y++;
  }

  if(food.x === head.x && food.y === head.y)
  {
    snack.unshift(head);
    food = createRandomFood();
  }
  else{
    snack.unshift(head);
    snack.pop();
  }
  displaySnake()
}

function startGame()
{
        document.addEventListener("keydown",(e)=>{
         dir=e.key;
        })
       currInterval = setInterval(move,400);
}


function startingPointOfGame()
{    displaySnake();
     document.querySelector("body").removeChild(document.querySelector("button"));
     document.addEventListener("keydown",(e)=>{
      dir = e.key;
      startGame();
    },{once:true});   
}


