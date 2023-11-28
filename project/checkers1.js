let c1, c2, n, color1, color2, time;
var lastclickID1 = null;
var lastclickID2 = null;
var lastclickID3 = null;
var lastclickID4 = null; // should work for all last clicked on both king and regular
var currentPlayer;

class PlayerStats {
  constructor() {
    this.c1 = {
      numMoves: 0,
      piecesLeft: 0,
    };
    this.c2 = {
      numMoves: 0,
      piecesLeft: 0,
    };

    // other characters and their properties can be added here
  }

  incrementNumMoves(character) {
    this[character].numMoves += 1;
  }
  setPieces(character, n) {
    this[character].piecesLeft =n*3/2;
  }

  resetMoves(character) {
    this[character].numMoves = 0;
  }
  decrementPieces(character) {
    this[character].piecesLeft -=1;
  }
  returnMoves(character) {
    return this[character].numMoves;
  }
  returnPieces(character) {
    return this[character].piecesLeft;
  }
  Initialize(){
    this.c1 = {
      numMoves: 0,
      piecesLeft: 0,
    };
    this.c2 = {
      numMoves: 0,
      piecesLeft: 0,
    };
  }
  // You can add more methods as needed to manipulate player stats
}


window.playerStats = new PlayerStats();

var currentPlayer = c1;
function updateValues1() {
  fetch('getstyle.php')
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();  // Assuming your PHP returns JSON
      })
      .then(data => {
          c2 = data.color2;
          c1 = data.color1;
          n = parseInt(data.size, 10);  // Ensure data.size is parsed as an integer
          color1 = data.bg1;
          color2 = data.bg2;
          time =data.setTime;
           lastclickID1 = null;
           lastclickID2 = null;
           lastclickID3 = null;
           lastclickID4 = null; // should work for all last clicked on both king and regular
       
         //  window.playerStats = new PlayerStats();
       //    window.playerStats.Initialize();
     
           window.playerStats.setPieces('c1', n);
           window.playerStats.setPieces('c2', n);
           window.playerStats.resetMoves('c1');
           window.playerStats.resetMoves('c2');
     
        currentPlayer = c1;
          createTable();
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
}

function createTable(){
  lastclickID1 = null;
  lastclickID2 = null;
  lastclickID3 = null;
  lastclickID4 = null; // should work for all last clicked on both king and regular


  window.playerStats.setPieces('c1', n);
  window.playerStats.setPieces('c2', n);
  window.playerStats.resetMoves('c1');
  window.playerStats.resetMoves('c2');

 timer();
 var existingPiece = document.getElementById("table");
  if (existingPiece != null) {
    var parentEl2 = existingPiece.parentElement;
    parentEl2.removeChild(existingPiece);
  }

  existingPiece = document.getElementById("table1");
  if (existingPiece != null) {
    var parentEl2 = existingPiece.parentElement;
    parentEl2.removeChild(existingPiece);
  }
  Score();
  
  let table = document.createElement('table');
  table.setAttribute("id","table");
    table.setAttribute("td","Board");
    table.style.borderCollapse = "collapse";

    let tablebody = document.createElement("tbody");
    table.appendChild(tablebody);

    for(let i =0; i<n;++i){ // table row
      
        let tr = document.createElement("tr");
        for(let j =0; j<n; ++j){ // table data
            let td = document.createElement("td");
     
            if(i%2==0){ // alertnating row color
                if(j%2 ==0){
         
            td.style.backgroundColor =color1;
            td.style.height = "40px";
            td.style.width = "40px";
            }
                if(j%2 == 1){
                  
                td.style.backgroundColor = color2;
              
                td.style.height = "40px";
                td.style.width = "40px";
            
            }}
            if(i%2==1){
                if(j%2 ==0){
          
                td.style.backgroundColor =color2;
  
                td.style.height = "40px";
                td.style.width = "40px";
           
                }
                if(j%2 == 1){
               
                    td.style.backgroundColor = color1;
                    td.style.height = "40px";
                    td.style.width = "40px";
                }
            }
            td.setAttribute("id",j + "," + i) // sets id for later use in movement
            if(i<=2 && td.style.backgroundColor==color2){
              td.grayMove = function() {
                  MovePiece(i, j,c2);
              }
              td.addEventListener('click', td.grayMove);
              pieceBlack(td,j,i);
              td.attributes.isking = 0;
          }
          
          if(i>=n-3 && td.style.backgroundColor==color2){
              td.whiteMove = function() {
                  MovePiece(i, j,c1);
              }
              td.addEventListener('click', td.whiteMove);
              pieceWhite(td,j,i);
              td.attributes.isking = 0;
            
          }
          tr.appendChild(td); 
      }
     
      tablebody.appendChild(tr);
  }
  
  document.getElementsByClassName("table")[0].appendChild(table);
  updateScore();
  updateMoves();
}

function Score(){
 
  table = document.createElement('table');
  table.setAttribute("id","table1");
    table.setAttribute("td","Board");
    table.style.borderCollapse = "collapse";

    let tablebody = document.createElement("tbody");
    table.appendChild(tablebody);

    
      
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        td.innerText ="Player1";
        tr.appendChild(td); 

            td = document.createElement("td");
            td.setAttribute("id","score1")
            tr.appendChild(td); 
            tablebody.appendChild(tr);
            let tr1 = document.createElement("tr");
            let td1 = document.createElement("td");
           tr1 = document.createElement("tr");
            td1.innerText= "Player2";
            tr1.appendChild(td1); 
  
                td1 = document.createElement("td");
                td1.setAttribute("id","score2");
                tr1.appendChild(td1); 
                tablebody.appendChild(tr1);
            
         tr = document.createElement("tr");
         td = document.createElement("td");
        td.innerText ="Moves P1";
        tr.appendChild(td); 

            td = document.createElement("td");
            td.setAttribute("id","moves1")
            tr.appendChild(td); 
            tablebody.appendChild(tr);
             tr1 = document.createElement("tr");
             td1 = document.createElement("td");
           tr1 = document.createElement("tr");
            td1.innerText= "Moves P2";
            tr1.appendChild(td1); 
  
                td1 = document.createElement("td");
                td1.setAttribute("id","moves2");
                tr1.appendChild(td1); 
                tablebody.appendChild(tr1);
            

         
     
    
  
  document.getElementsByClassName("table1")[0].appendChild(table);
}

function updateScore(){
  let td1 = document.getElementById("score1");
  let td2 = document.getElementById("score2");
  if(td1!=null){
    if(playerStats.returnPieces('c1')!=null){
  td1.innerText =window.playerStats.returnPieces('c1');
    }
    else {
      td1.innerText = 0;
    }
  }
  if(td2!=null){
    if(playerStats.returnPieces('c2')!=null){
    td2.innerText =window.playerStats.returnPieces('c2');
    }
    else {
      td2.innerText = 0;
    }
  }
}
function updateMoves(){
  let td1 = document.getElementById("moves1");
  let td2 = document.getElementById("moves2");
  if(td1!=null){
    if(playerStats.returnMoves('c1')!=null){
  td1.innerText =window.playerStats.returnMoves('c1');
    }
    else {
      td1.innerText = 0;
    }
  }
  if(td2!=null){
    if(playerStats.returnMoves('c2')!=null){
    td2.innerText =window.playerStats.returnMoves('c2');
    }
    else {
      td2.innerText = 0;
    }
  }
}
function MovePiece(y, x, color) { 

  let td = document.getElementById(x+','+y);
      if(lastclickID1!=null){
      lastclickID1.style.backgroundColor = color2;
      lastclickID1.removeEventListener('click', lastclickID1.jmove);
      }
      if(lastclickID2!=null){
      lastclickID2.style.backgroundColor = color2;
      lastclickID2.removeEventListener('click', lastclickID2.jmove);
      }

      if(lastclickID3!=null){
        lastclickID3.style.backgroundColor =color2;
        lastclickID3.removeEventListener('click', lastclickID3.jmove);
        }
        if(lastclickID4!=null){
          lastclickID4.style.backgroundColor = color2;
          lastclickID4.removeEventListener('click', lastclickID4.jmove);
        }
   

  let king = td.attributes.isking;
  if(king == 0){
  let y1 = y; // call piece clicked here, store data to last piece clicked, if different piece is clicked
  if(currentPlayer == c1){ // remove event listeners from last piece clicked
  if (color == c1) { // set last piece as global vars, set to null at the end of movement functions
    y = y - 1;
    highlight(x, y, y1, color); //still need to remove event listeners
  }
}
if(currentPlayer == c2){
  if (color == c2) {
    y = y + 1;
    highlight(x, y, y1, color);
  }
}
}
else if( king == 1){
    kingMovement(y,x,color);
   
  }
}
 

function highlight(x, y, y1, color) {
  updateScore();
  let x1 = x;
  var tj = null;
  var tj2 = null;
  let tdb = document.getElementById(x + "," + y1); // gets origional piece location
  x = x - 1;
  let z1 = x;
  let td = document.getElementById(x + "," + y); // gets left board location


  var existingPieceL = document.getElementById(z1 + 's' + y); // gets piece id on left

  x = x + 2;

  let td2 = document.getElementById(x + "," + y);// gets right board location
  lastclickID1 = td;
  lastclickID2 = td2;
  let z2 = x;
 
  var Rdata = document.getElementById(z2 + ',' + y); 
  var Ldata = document.getElementById(z1 + ',' + y);
  function movement1() { // moves left and calls finish movement
    if(tj2!=null){
      tj2.removeEventListener('click', tj2.jmove);
      tj2.style.backgroundColor = color2;
    } 
    if(z2>=0&&z2<n){
      td2.removeEventListener('click', td2.jmove);
      td2.style.backgroundColor = color2;
      }
      if(z1<n&&z1>=0){
      td.removeEventListener('click', td.jmove);
      td.style.backgroundColor = color2;
      }
    if(tj!=null){
      tj.removeEventListener('click', tj.jmove);
      tj.style.backgroundColor = color2;
    }
    finishMovement(td, tdb, color, x1, z1, y1);
  }

  function movement2() {// moves right and calls finish movement
    if(tj2!=null){
      tj2.removeEventListener('click', tj2.jmove);
      tj2.style.backgroundColor = color2;
    } 
    if(z2<n&&z2>=0){
    td2.removeEventListener('click', td2.jmove);
    td2.style.backgroundColor = color2;
    }
    if(z1>=0&&z1<n){
    td.removeEventListener('click', td.jmove);
    td.style.backgroundColor = color2;
    }
    if(tj!=null){
      tj.removeEventListener('click', tj.jmove);
      tj.style.backgroundColor = color2;
    }
   
    finishMovement(td2, tdb, color, x1, z2, y1);
  }
  function movement3() { // jump movement
    if(tj!=null){
      tj.removeEventListener('click', tj.jmove);
      tj.style.backgroundColor = color2;
    } 
    if(tj2!=null){
      tj2.removeEventListener('click', tj2.jmove);
      tj2.style.backgroundColor = color2;
    } 
    if(z2<n&&z2>=0){
      td2.removeEventListener('click', td2.jmove);
      td2.style.backgroundColor = color2;
      }
      if(z1>=0&&z1<n){
      td.removeEventListener('click', td.jmove);
      td.style.backgroundColor = color2;
      }
    if(color==c1){
      if(z1>=0&&z1<n){
      Ldata.removeEventListener('click', Ldata.grayMove); 
      }
    }
    else if(color==c2){
      if(z2<n&&z2>=0){
      Rdata.removeEventListener('click', Rdata.whiteMove); 
      }
    }
    tj.style.backgroundColor = color2;
  
    let temp = z1-1;
    if (color ==c1) {
      y -= 1;
    } else if (color == c2) {
      y += 1;
    }
    jumpMovement(tj,tdb,Ldata,temp,y,color); // should work
   
  }
  function movement4() { // jump movement
    if(tj!=null){
      tj.removeEventListener('click', tj.jmove);
      tj.style.backgroundColor = color2;
    } 
    if(tj2!=null){
      tj2.removeEventListener('click', tj2.jmove);
      tj2.style.backgroundColor = color2;
    } 

    if(z2>=0&&z2<n){
      td2.removeEventListener('click', td2.jmove);
      td2.style.backgroundColor = color2;
      }
      if(z1<n&&z1>=0){
      td.removeEventListener('click', td.jmove);
      td.style.backgroundColor = color2;
      }

    tj2.style.backgroundColor = color2;

    let temp = z2+1;
    if (color == c1) {
      y -= 1;
    } else if (color == c2) {
      y += 1;
    }
    jumpMovement(tj2,tdb,Rdata,temp,y,color);
    
  }
 



  

  var existingPieceR = document.getElementById(z2 + 's' + y); // checks for piece at td2

  if (existingPieceR != null && existingPieceL != null) { // needs removing of second jump square and event listener
    let childElement = td.firstChild; 
    let childElement2 = td2.firstChild; 
    if (childElement2) { // checks if piece on the left is the same color to see if jump is needed
      let circleElement = childElement2.firstChild;
      let circleColor = circleElement.getAttribute('fill');
      if(circleColor != color){
        let zT = z2+1;
        let yt = y;
        if(color == c2){// if it can jump increments y accordingly
          yt = yt + 1;
        }
        if(color == c1){
          yt = yt - 1;
        }
        lastclickID4 = tj2;
        tj2 = document.getElementById(zT+','+yt);
        let tj1 = document.getElementById(zT+'s'+yt);
        if(tj1 == null){ // if no piece is being the piece trying to jump
          if(tj2!=null){
            tj2.style.backgroundColor = "blue";
         
            tj2.jmove = function() {
  
             movement4()
          
            }
            tj2.addEventListener('click', tj2.jmove);
          }
        }

      }
      
    }
    if (childElement) { // checks if piece on the left is the same color to see if jump is needed
      let circleElement = childElement.firstChild;
      let circleColor = circleElement.getAttribute('fill');
      if(circleColor != color){
        let zT = z1-1;
        let yt = y;
        if(color == c2){ // if it can jump increments y accordingly
          yt = yt + 1;
        }
        if(color == c1){
          yt = yt - 1;
        }
        delta2 = tj;
        tj = document.getElementById(zT+','+yt);
        lastclickID3 = tj;  
        let tj1 = document.getElementById(zT+'s'+yt);
        if(tj1 == null){ // if no piece is being the piece trying to jump
          if(tj!=null){
            if (tj.jmove) {
              tj.removeEventListener('click', tj.jmove);
          }
            tj.style.backgroundColor = "blue";
            tj.jmove = function() {
     
              movement3(); // allow for jump movement
            }
            tj.addEventListener('click', tj.jmove);
          }
        }
      }
      
    }
  } else if (existingPieceL != null) {
    let childElement = td.firstChild; 

  if (childElement) { // checks if piece on the left is the same color to see if jump is needed
    let circleElement = childElement.firstChild;
    let circleColor = circleElement.getAttribute('fill');
    if(circleColor != color){
      let zT = z1-1;
      let yt = y;
      if(color == c2){ // if it can jump increments y accordingly
        yt = yt + 1;
      }
      if(color == c1){
        yt = yt - 1;
      }
      tj = document.getElementById(zT+','+yt);
      lastclickID3 = tj;
      let tj1 = document.getElementById(zT+'s'+yt);
      if(tj1 == null){ // if no piece is being the piece trying to jump
        if(tj!=null){
          if (tj.jmove) {
            tj.removeEventListener('click', tj.jmove);
        }
        tj.style.backgroundColor = "blue";
          tj.jmove = function() {
       
        movement3(); // allow for jump movement
          }
          tj.addEventListener('click', tj.jmove);
        }
      }
    }
    
  }
  if(z2<n&&z2>=0){
    td2.jmove = function() {
    movement2(); // adds regular movement to the other side
    }
    td2.style.backgroundColor = "blue"; 
    td2.addEventListener('click', td2.jmove);
  }
    
  } else if (existingPieceR != null) {
    let childElement = td2.firstChild; 
    if (childElement) { // checks if piece on the left is the same color to see if jump is needed
      let circleElement = childElement.firstChild;
      let circleColor = circleElement.getAttribute('fill');
      if(circleColor != color){
        let zT = z2+1;
        let yt = y;
        if(color == c2){// if it can jump increments y accordingly
          yt = yt + 1;
        }
        if(color == c1){
          yt = yt - 1;
        }
        tj2 = document.getElementById(zT+','+yt);
        lastclickID4 = tj2;
        let tj1 = document.getElementById(zT+'s'+yt);
        if(tj1 == null){ // if no piece is being the piece trying to jump
          if(tj2!=null){
        
            tj2.style.backgroundColor = "blue";
            tj2.jmove = function() {
        
             movement4();
            }
            tj2.addEventListener('click', tj2.jmove);
          }
        }

      }
      
    }
    if(td!=null){
      td.jmove = function(){
     movement1();// adds regular movement to the other side 
      }
      td.addEventListener('click', td.jmove);
    td.style.backgroundColor = "blue";
    
    }
    
  } else if (existingPieceR == null && existingPieceL == null) { // if no pieces regular movement 
    
    if(td2!=null){
    td2.style.backgroundColor = "blue";
    td2.jmove = function(){
    movement2();
    }
    td2.addEventListener('click', td2.jmove);
  
    }
    if(td!=null){
      td.jmove = function(){
     movement1();
      }
      td.addEventListener('click', td.jmove);
      td.style.backgroundColor = "blue";
    
    }
    
}

}

function jumpMovement(tdest, td, tj, x, y, color) {
  // Remove event listeners before removing child elements

  if (color === c1) {
    tj.removeEventListener('click', tj.grayMove);
    tj.removeEventListener('click', tj.jmove);
  } else if (color ==c2) {
    tj.removeEventListener('click', tj.whiteMove);
    tj.removeEventListener('click', tj.jmove);
  }

  // Remove the jumped piece from td
  let childElement = td.firstChild;
  if (childElement) {
    let circleElement = childElement.firstChild;
    if (circleElement) {
      td.removeChild(td.firstChild);
    }
  }

  // Remove the jumped piece from tj
  childElement = tj.firstChild;
  if (childElement) {
    let circleElement = childElement.firstChild;
    if (circleElement) {
      tj.removeChild(tj.firstChild);
    }
  }
 
  // Add the current piece to tdest
  let xDest = x;
  let yDest = y;

  if (color == c1) {
  
    if(yDest ==0|| yDest == n-1){
      kingWHite(tdest, xDest, yDest);
      playerStats.decrementPieces('c2');
      currentPlayer = c2; 
      tdest.removeEventListener('click', tdest.whiteMove); 
      tdest.removeEventListener('click', tdest.jmove); 
      tdest.whiteMove = function() {
        kingMovement(yDest, xDest,c1);
      }
      tdest.addEventListener('click', tdest.whiteMove);

  }
   else{
    pieceWhite(tdest, xDest, yDest);
    playerStats.decrementPieces('c2');
    tdest.removeEventListener('click', tdest.whiteMove);
    tdest.removeEventListener('click', tdest.jmove); 
    if(canDoubleJump(tdest,xDest,yDest,color)){
      dobuleJump(xDest,yDest,color);
    }
    else{
      
    tdest.whiteMove = function () {
      MovePiece(yDest, xDest, c1);
    };
    tdest.addEventListener('click', tdest.whiteMove);
    currentPlayer =c2; 
  }
  }
  } else if (color ==c2) {
   
   
    if(yDest == n-1|| yDest == 0){
      kingBlack(tdest,xDest,yDest);
      playerStats.decrementPieces('c1');
      currentPlayer =c1; 
      tdest.removeEventListener('click', tdest.grayMove); 
      tdest.removeEventListener('click', tdest.jmove); 
      tdest.grayMove = function() {
        kingMovement(yDest, xDest,c2);
      }
      tdest.addEventListener('click', tdest.grayMove);
    }
    else{
    pieceBlack(tdest, xDest, yDest);
    playerStats.decrementPieces('c1');
    tdest.removeEventListener('click', tdest.grayMove);
    tdest.removeEventListener('click', tdest.jmove); 
    if(canDoubleJump(tdest,xDest,yDest,color)){
     
      dobuleJump(xDest,yDest,color);
      
    }
    else{
      currentPlayer = c1; 
    tdest.grayMove = function () {
      MovePiece(yDest, xDest, c2);
    };
    tdest.addEventListener('click', tdest.grayMove);
  }
  }
  }

  // Clear the event listeners for td and tj
  td.removeEventListener('click', td.grayMove);
  td.removeEventListener('click', td.whiteMove);
  tj.removeEventListener('click', tj.grayMove);
  tj.removeEventListener('click', tj.whiteMove);
  tj.removeEventListener('click', tdest.jmove); 
  td.removeEventListener('click', tdest.jmove); 
  // Remove the jump destination's background color
  if(canDoubleJump(tdest,xDest,yDest,color)==false){
  tdest.style.backgroundColor = color2;
  }

  // Update the background color of td and tj
  td.style.backgroundColor = color2;
  tj.style.backgroundColor = color2;
  Wincondtion();
}

function canDoubleJump(tdest,x,y,color){
  let bool = false;
  let x1=0;
  let y1=0;
  if(color == c1){
    x1 = x+1
    y1 = y-1;
    let tr = document.getElementById(x1+","+y1);
    if(tr!=null){
    let childElement = tr.firstChild; 
    if(childElement){
      let circleElement = childElement.firstChild;
      let circleColor = circleElement.getAttribute('fill');
      if(circleColor != color){
        x1 = x1+1;
        y1 = y1-1;
        let tj = document.getElementById(x1+','+y1);
        let tj1 = document.getElementById(x1+'s'+y1);
        if(tj1 == null){ // if no piece is being the piece trying to jump
          if(tj!=null){
              bool = true;
              return bool;
          }
        }
      }
    }
  }
    x1 = x-1
    y1 = y-1;
    let tl = document.getElementById(x1+","+y1);
    if(tl!=null){
    childElement = tl.firstChild; 
    if(childElement){
      let circleElement = childElement.firstChild;
      let circleColor = circleElement.getAttribute('fill');
      if(circleColor != color){
        x1 = x1-1;
        y1 = y1-1;
        let tj = document.getElementById(x1+','+y1);
        let tj1 = document.getElementById(x1+'s'+y1);
        if(tj1 == null){ // if no piece is being the piece trying to jump
          if(tj!=null){
              bool = true;
              return bool;
          }
        }
      }
    }
  }
  }

  if(color == c2){
    x1 = x+1
    y1 = y+1;
    let tr = document.getElementById(x1+","+y1);
    if(tr!=null){
    let childElement = tr.firstChild; 
    if(childElement){
      let circleElement = childElement.firstChild;
      let circleColor = circleElement.getAttribute('fill');
      if(circleColor != color){
        x1 = x1+1;
        y1 = y1+1;
        let tj = document.getElementById(x1+','+y1);
        let tj1 = document.getElementById(x1+'s'+y1);
        if(tj1 == null){ // if no piece is being the piece trying to jump
          if(tj!=null){
              bool = true;
              return bool;
          }
        }
      }
    }
  }
    x1 = x-1
    y1 = y+1;
    let tl = document.getElementById(x1+","+y1);
    if(tl!=null){
    childElement = tl.firstChild; 
    if(childElement){
      let circleElement = childElement.firstChild;
      let circleColor = circleElement.getAttribute('fill');
      if(circleColor != color){
        x1 = x1-1;
        y1 = y1+1;
        let tj = document.getElementById(x1+','+y1);
        let tj1 = document.getElementById(x1+'s'+y1);
        if(tj1 == null){ // if no piece is being the piece trying to jump
          if(tj!=null){
              bool = true;
              return bool;
          }
        }
      }
    }
  }
}
  return bool;
}

function dobuleJump(x,y,color){

  var tj = null;
  var tr = null;
  var tl = null;
  var tj2 = null;
  
  var td = document.getElementById(x+","+y);
  td.style.backgroundColor="blue";

  var x1=0;
  var y1=0;
  var x2=0;
  var y2 =0;
  function moveN(){
  
    this.removeEventListener('click',moveN);
    this.style.backgroundColor =color2;

    if(tj!=null){
      tj.removeEventListener('click',moveJ1);
      tj.style.backgroundColor =color2;
  }
  if(tj2!=null){
    tj2.removeEventListener('click',moveJ2);
    tj2.style.backgroundColor = color2;
    }
    if(color == c2){
      currentPlayer =c1;
 
      td.blackMove = function() {
        MovePiece(y, x,c2);
      }
      td.addEventListener('click', td.blackMove);
    }
    if(color == c1){
      currentPlayer =c2;
   //   tdb.removeEventListener('click', tdb.whiteMove); 
      td.whiteMove = function() {
        MovePiece(y, x,c1);
      }
      td.addEventListener('click', td.whiteMove);
    }
  }
  function moveJ1(){
    this.removeEventListener('click',moveJ1);
    this.style.backgroundColor = color2;
    if(tj2!=null){
    tj2.removeEventListener('click',moveJ2);
    tj2.style.backgroundColor = color2;
    }
    td.removeEventListener('click',moveN);
    td.style.backgroundColor = color2;
    jumpMovement(this,td,tr,x1,y1,color);
  }
  function moveJ2(){

     
      this.removeEventListener('click',moveJ2);
      this.style.backgroundColor = color2;
      if(tj!=null){
      tj.removeEventListener('click',moveJ1);
      tj.style.backgroundColor = color2;
  }
      td.removeEventListener('click',moveN);
      td.style.backgroundColor = color2;
      jumpMovement(this,td,tl,x2,y2,color);
    }
  if(color == c1){
    x1 = x+1
    y1 = y-1;
    tr = document.getElementById(x1+","+y1);
    if(tr!=null){
    
    let childElement = tr.firstChild; 
    if(childElement){
      let circleElement = childElement.firstChild;
      let circleColor = circleElement.getAttribute('fill');
      if(circleColor != color){
        x1 = x1+1;
        y1 = y1-1;
        tj = document.getElementById(x1+','+y1);
        let tj1 = document.getElementById(x1+'s'+y1);
        if(tj1 == null){ // if no piece is being the piece trying to jump
          if(tj!=null){
            td.style.backgroundColor = "blue";
            td.addEventListener('click',moveN);
            tj.style.backgroundColor = "blue";
            tj.addEventListener('click',moveJ1);
          }
        }
      }
    }
  }
    x2 = x-1
    y2 = y-1;
    tl = document.getElementById(x2+","+y2);
    if(tl!=null){
    childElement = tl.firstChild; 
    if(childElement){
      let circleElement = childElement.firstChild;
      let circleColor = circleElement.getAttribute('fill');
      if(circleColor != color){
        x2 = x2-1;
        y2 = y2-1;
        tj2 = document.getElementById(x2+','+y2);
        let tj1 = document.getElementById(x2+'s'+y2);
        if(tj1 == null){ // if no piece is being the piece trying to jump
          if(tj2!=null){
            td.style.backgroundColor = "blue";
            td.addEventListener('click',moveN);
            tj2.style.backgroundColor = "blue";
            tj2.addEventListener('click',moveJ2);
          }
        }
      }
    }
  }
}

  if(color == c2){
    x1 = x+1
    y1 = y+1;
    
    tr = document.getElementById(x1+","+y1);
   
    if(tr!=null){
    let childElement = tr.firstChild; 
    if(childElement){
      let circleElement = childElement.firstChild;
      let circleColor = circleElement.getAttribute('fill');
      if(circleColor != color){
        x1 = x1+1;
        y1 = y1+1;
         tj = document.getElementById(x1+','+y1);
        let tj1 = document.getElementById(x1+'s'+y1);
        if(tj1 == null){ // if no piece is being the piece trying to jump
          if(tj!=null){
            td.style.backgroundColor = "blue";
            td.addEventListener('click',moveN);
            tj.style.backgroundColor = "blue";
            tj.addEventListener('click',moveJ1);
          }
        }
      }
    }
  }
    x2 = x-1
    y2 = y+1;
     tl = document.getElementById(x2+","+y2);

     if(tl!=null){
    childElement = tl.firstChild; 
    if(childElement){
      let circleElement = childElement.firstChild;
      let circleColor = circleElement.getAttribute('fill');
      if(circleColor != color){
        x2 = x2-1;
        y2 = y2+1;
        tj2 = document.getElementById(x2+','+y2);
        let tj1 = document.getElementById(x2+'s'+y2);
        if(tj1 == null){ // if no piece is being the piece trying to jump
          if(tj2!=null){
            td.style.backgroundColor = "blue";
            td.addEventListener('click',moveN);
            tj2.style.backgroundColor = "blue";
            tj2.addEventListener('click',moveJ2);
          }
        }
      }
    }
  }
  }
}


function finishMovement(td, tdb, color, x1, x, y) {

  var removetab = document.getElementById(x1 + 's' + y); // removes piece at origional location
 
  if (removetab != null) {
    var parentEl1 = removetab.parentElement;
    parentEl1.removeChild(removetab);
  }

  // Remove existing piece on td
  var existingPiece = document.getElementById(x + 's' + y); // extra check so no two pieces can be in one spot 
  if (existingPiece != null) {
    var parentEl2 = existingPiece.parentElement;
    parentEl2.removeChild(existingPiece);
  }
  
 
  
  if (color == c1) {
    y = y - 1; //places pieces at new lcoation and removes and adds event listeners accordingly
    playerStats.incrementNumMoves('c1');
    updateMoves();
    updateScore();
      if(y ==0){
        kingWHite(td, x, y);
        currentPlayer = c2; 
        tdb.removeEventListener('click', tdb.whiteMove); 
        td.removeEventListener("click",td.jmove);
        td.whiteMove = function() {
          kingMovement(y, x,c1);
        }
        td.addEventListener('click', td.whiteMove);
      }
    else{
    pieceWhite(td, x, y);
    currentPlayer = c2; 
    tdb.removeEventListener('click', tdb.whiteMove); 
    td.removeEventListener("click",td.jmove);
    td.whiteMove = function() {
      MovePiece(y, x,c1);
    }
    td.addEventListener('click', td.whiteMove);
  }
  }

  if (color ==c2) {
    y = y + 1;
    currentPlayer =c1; 
    playerStats.incrementNumMoves('c2');
    updateMoves();
    updateScore();
    if(y == n-1){
      kingBlack(td,x,y);
      currentPlayer = c1; 
      tdb.removeEventListener('click', tdb.grayMove); //might be worth swapping for kingmove
      td.removeEventListener("click",td.jmove);
      td.grayMove = function() {
        kingMovement(y, x,c2);
      }
      td.addEventListener('click', td.grayMove);
    }
    else{
      pieceBlack(td,x,y);
    tdb.removeEventListener('click', tdb.grayMove); 
    td.removeEventListener("click",td.jmove);
    td.grayMove = function() {
      MovePiece(y, x,c2);
    }
    td.addEventListener('click', td.grayMove);
  }
  
}
updateScore();
}

function pieceWhite(td,x,y){ 
  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "40");
  svg.setAttribute("height", "40");

  var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", "20");
  circle.setAttribute("cy", "20");
  circle.setAttribute("r", "15");
  circle.setAttribute("stroke", "black");
  circle.setAttribute("stroke-width", "3");
  circle.setAttribute("fill", c1);
  svg.appendChild(circle);
  svg.setAttribute("id",x+'s'+y);
  td.attributes.isking = 0;
  td.appendChild(svg);
  updateScore();
}
function pieceBlack(td,x,y){
  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "40");
  svg.setAttribute("height", "40");

  var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", "20");
  circle.setAttribute("cy", "20");
  circle.setAttribute("r", "15");
  circle.setAttribute("stroke", "black");
  circle.setAttribute("stroke-width", "3");
  circle.setAttribute("fill", c2);
  svg.appendChild(circle);
  svg.setAttribute("id",x+'s'+y);
  td.attributes.isking = 0;
  td.appendChild(svg);
  updateScore();
}

function kingWHite(td,x,y){ 
  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "40");
  svg.setAttribute("height", "40");

  var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", "20");
  circle.setAttribute("cy", "20");
  circle.setAttribute("r", "15");
  circle.setAttribute("stroke", "black");
  circle.setAttribute("stroke-width", "3");
  circle.setAttribute("fill", c1);
  svg.appendChild(circle);
  svg.appendChild(createKingCrown());
  svg.setAttribute("id",x+'s'+y);
  td.appendChild(svg);
  td.attributes.isking = 1;
  updateScore();
}
function kingBlack(td,x,y){
  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "40");
  svg.setAttribute("height", "40");

  var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", "20");
  circle.setAttribute("cy", "20");
  circle.setAttribute("r", "15");
  circle.setAttribute("stroke", "black");
  circle.setAttribute("stroke-width", "3");
  circle.setAttribute("fill", c2);
  svg.appendChild(circle);
  svg.appendChild(createKingCrown());
  svg.setAttribute("id",x+'s'+y);
  td.appendChild(svg);
  td.attributes.isking = 1;
  updateScore();
}






function createKingCrown() {
  const crown = document.createElementNS("http://www.w3.org/2000/svg", "path");
  crown.setAttribute("d", "M20 10 L20 5 L25 5 L20 15 L15 5 L20 5 Z");
  crown.setAttribute("fill", "gold");
  return crown;
}

function kingMovement(y, x, color){ //needs jump functionality

  if(color!=currentPlayer){
    return;
  }
  
 

    if(lastclickID1!=null){
    lastclickID1.style.backgroundColor = color2;
    lastclickID1.removeEventListener('click', lastclickID1.jmove);
    }
    if(lastclickID2!=null){
    lastclickID2.style.backgroundColor =color2;
    lastclickID2.removeEventListener('click', lastclickID2.jmove);
    }

    if(lastclickID3!=null){
      lastclickID3.style.backgroundColor = color2;
      lastclickID3.removeEventListener('click', lastclickID3.jmove);
      }
      if(lastclickID4!=null){
        lastclickID4.style.backgroundColor =color2;
        lastclickID4.removeEventListener('click', lastclickID4.jmove);
      }
    

  let temp = y-1;
  let y1 = temp;
  let temp1 = x-1;
  let xl = temp1;
  let td = document.getElementById(x+','+y); // origional location

  td.attributes.isking = 0;
  let ttl = document.getElementById(temp1+','+temp) // top left 

  var existingPieceTL = document.getElementById(temp1 + 's' + temp); // gets piece id on left
  var tj = null;
  var tj4 = null;
  var tj7 = null;
  var tj8 = null;
  temp1 = x+1;
  let xr = temp1;
  let ttr = document.getElementById(temp1+','+temp); //top right
 
  var existingPieceTR = document.getElementById(temp1 + 's' + temp); // gets piece id on left

  temp = y+1;
  let y2 = temp;
  let tdr = document.getElementById(temp1+','+temp); // bottom right
  var existingPieceBR = document.getElementById(temp1 + 's' + temp); // gets piece id on left
 
  temp1 = x-1;
  let tdl = document.getElementById(temp1+','+temp); // bottom left
 
  var existingPieceBL = document.getElementById(temp1 + 's' + temp); // gets piece id on left
  var Yval =0;
  var Xval =0;
lastclickID1 = ttl;
lastclickID2 = ttr;
lastclickID3 = tdr;
lastclickID4 = tdl;


  function movement1() { // moves left and calls finish movement
    // add in remove event listener calls and change color
    kingFinishMovement(ttl, td, color,x,y, xl,y1);
    if(ttl!=null){
      ttl.style.backgroundColor = color2;//runs error check logic likely all run error
      ttl.removeEventListener('click',ttl.jmove);
      }
      if(ttr!=null){
      ttr.style.backgroundColor = color2;
      ttr.removeEventListener('click',ttr.jmove);
      }
      if(tdl!=null){
        tdl.style.backgroundColor =color2;
        tdl.removeEventListener('click',tdl.jmove);
        }
        if(tdr!=null){
        tdr.style.backgroundColor = color2;
        tdr.removeEventListener('click',tdr.jmove);
        }
      
        if(tj!=null){
          tj.removeEventListener("click",tj.jmove);
          tj.style.backgroundColor = color2;
        }
        if(tj4!=null){
          tj4.removeEventListener("click",tj4.jmove);
          tj4.style.backgroundColor = color2;
        }
        if(tj7!=null){
          tj7.removeEventListener("click",tj7.jmove);
          tj7.style.backgroundColor = color2;
        }
        if(tj8!=null){
          tj8.removeEventListener("click",tj8.jmove);
          tj8.style.backgroundColor =color2;
        }
  }
  function movement2() { // moves left and calls finish movement
 
    kingFinishMovement(ttr, td, color,x,y, xr,y1);
    if(ttl!=null){
      ttl.style.backgroundColor = color2;//runs error check logic likely all run error
      ttl.removeEventListener('click',ttl.jmove);
      }
      if(ttr!=null){
      ttr.style.backgroundColor = color2;
      ttr.removeEventListener('click',ttr.jmove);
      }
      if(tdl!=null){
        tdl.style.backgroundColor = color2;
        tdl.removeEventListener('click',tdl.jmove);
        }
        if(tdr!=null){
        tdr.style.backgroundColor = color2;
        tdr.removeEventListener('click',tdr.jmove);
        }
      
        if(tj!=null){
          tj.removeEventListener("click",tj.jmove);
          tj.style.backgroundColor = color2;
        }
        if(tj4!=null){
          tj4.removeEventListener("click",tj4.jmove);
          tj4.style.backgroundColor = color2;
        }
        if(tj7!=null){
          tj7.removeEventListener("click",tj7.jmove);
          tj7.style.backgroundColor = color2;
        }
        if(tj8!=null){
          tj8.removeEventListener("click",tj8.jmove);
          tj8.style.backgroundColor = color2;
        }
  }
  function movement3() { // moves left and calls finish movement
 
    kingFinishMovement(tdl, td, color,x,y, xl,y2);
    if(ttl!=null){
      ttl.style.backgroundColor = color2;//runs error check logic likely all run error
      ttl.removeEventListener('click',ttl.jmove);
      }
      if(ttr!=null){
      ttr.style.backgroundColor = color2;
      ttr.removeEventListener('click',ttr.jmove);
      }
      if(tdl!=null){
        tdl.style.backgroundColor = color2;
        tdl.removeEventListener('click',tdl.jmove);
        }
        if(tdr!=null){
        tdr.style.backgroundColor = color2;
        tdr.removeEventListener('click',tdr.jmove);
        }
      
        if(tj!=null){
          tj.removeEventListener("click",tj.jmove);
          tj.style.backgroundColor = color2;
        }
        if(tj4!=null){
          tj4.removeEventListener("click",tj4.jmove);
          tj4.style.backgroundColor =color2;
        }
        if(tj7!=null){
          tj7.removeEventListener("click",tj7.jmove);
          tj7.style.backgroundColor = color2;
        }
        if(tj8!=null){
          tj8.removeEventListener("click",tj8.jmove);
          tj8.style.backgroundColor = color2;
        }
  }
  function movement4() { // moves left and calls finish movement
 
    kingFinishMovement(tdr, td, color,x,y, xr,y2);
    if(ttl!=null){
      ttl.style.backgroundColor = color2;//runs error check logic likely all run error
      ttl.removeEventListener('click',ttl.jmove);
      }
      if(ttr!=null){
      ttr.style.backgroundColor = color2;
      ttr.removeEventListener('click',ttr.jmove);
      }
      if(tdl!=null){
        tdl.style.backgroundColor = color2;
        tdl.removeEventListener('click',tdl.jmove);
        }
        if(tdr!=null){
        tdr.style.backgroundColor = color2;
        tdr.removeEventListener('click',tdr.jmove);
        }
      
        if(tj!=null){
          tj.removeEventListener("click",tj.jmove);
          tj.style.backgroundColor =color2;
        }
        if(tj4!=null){
          tj4.removeEventListener("click",tj4.jmove);
          tj4.style.backgroundColor = color2;
        }
        if(tj7!=null){
          tj7.removeEventListener("click",tj7.jmove);
          tj7.style.backgroundColor = color2;
        }
        if(tj8!=null){
          tj8.removeEventListener("click",tj8.jmove);
          tj8.style.backgroundColor = color2;
        }
  }
  function movement5(){ // mad broken 

  if(ttl!=null){
    ttl.style.backgroundColor =color2;//runs error check logic likely all run error
    ttl.removeEventListener('click',ttl.jmove);
    }
    if(ttr!=null){
    ttr.style.backgroundColor =color2;
    ttr.removeEventListener('click',ttr.jmove);
    }
    if(tdl!=null){
      tdl.style.backgroundColor =color2;
      tdl.removeEventListener('click',tdl.jmove);
      }
      if(tdr!=null){
      tdr.style.backgroundColor = color2;
      tdr.removeEventListener('click',tdr.jmove);
      }
    
      if(tj!=null){
        tj.removeEventListener("click",tj.jmove);
        tj.style.backgroundColor = color2;
      }
      if(tj4!=null){
        tj4.removeEventListener("click",tj4.jmove);
        tj4.style.backgroundColor = color2;
      }
      if(tj7!=null){
        tj7.removeEventListener("click",tj7.jmove);
        tj7.style.backgroundColor =color2;
      }
      if(tj8!=null){
        tj8.removeEventListener("click",tj8.jmove);
        tj8.style.backgroundColor =color2;
      }
    jumpMovementKing(tj,td,ttr,Xval,Yval,color); // check inputs on king
    
  }
  function movement6(){ // works
 if(ttl!=null){
  ttl.style.backgroundColor = color2;//runs error check logic likely all run error
  ttl.removeEventListener('click',ttl.jmove);
  }
  if(ttr!=null){
  ttr.style.backgroundColor =color2;
  ttr.removeEventListener('click',ttr.jmove);
  }
  if(tdl!=null){
    tdl.style.backgroundColor =color2;
    tdl.removeEventListener('click',tdl.jmove);
    }
    if(tdr!=null){
    tdr.style.backgroundColor =color2;
    tdr.removeEventListener('click',tdr.jmove);
    }
  
    if(tj!=null){
      tj.removeEventListener("click",tj.jmove);
      tj.style.backgroundColor = color2;
    }
    if(tj4!=null){
      tj4.removeEventListener("click",tj4.jmove);
      tj4.style.backgroundColor = color2;
    }
    if(tj7!=null){
      tj7.removeEventListener("click",tj7.jmove);
      tj7.style.backgroundColor =color2;
    }
    if(tj8!=null){
      tj8.removeEventListener("click",tj8.jmove);
      tj8.style.backgroundColor = color2;
    }
        jumpMovementKing(tj4,td,ttl,Xval,Yval,color);
    
  }
  function movement7(){
if(ttl!=null){
  ttl.style.backgroundColor = color2;//runs error check logic likely all run error
  ttl.removeEventListener('click',ttl.jmove);
  }
  if(ttr!=null){
  ttr.style.backgroundColor = color2;
  ttr.removeEventListener('click',ttr.jmove);
  }
  if(tdl!=null){
    tdl.style.backgroundColor = color2;
    tdl.removeEventListener('click',tdl.jmove);
    }
    if(tdr!=null){
    tdr.style.backgroundColor =color2;
    tdr.removeEventListener('click',tdr.jmove);
    }
  
    if(tj!=null){
      tj.removeEventListener("click",tj.jmove);
      tj.style.backgroundColor = color2;
    }
    if(tj4!=null){
      tj4.removeEventListener("click",tj4.jmove);
      tj4.style.backgroundColor =color2;
    }
    if(tj7!=null){
      tj7.removeEventListener("click",tj7.jmove);
      tj7.style.backgroundColor = color2;
    }
    if(tj8!=null){
      tj8.removeEventListener("click",tj8.jmove);
      tj8.style.backgroundColor = color2;
    }
    
        jumpMovementKing(tj7,td,tdl,Xval,Yval,color);
    
  }
  function movement8(){
 if(ttl!=null){
  ttl.style.backgroundColor = color2;//runs error check logic likely all run error
  ttl.removeEventListener('click',ttl.jmove);
  }
  if(ttr!=null){
  ttr.style.backgroundColor = color2;
  ttr.removeEventListener('click',ttr.jmove);
  }
  if(tdl!=null){
    tdl.style.backgroundColor =color2;
    tdl.removeEventListener('click',tdl.jmove);
    }
    if(tdr!=null){
    tdr.style.backgroundColor =color2;
    tdr.removeEventListener('click',tdr.jmove);
    }
  
    if(tj!=null){
      tj.removeEventListener("click",tj.jmove);
      tj.style.backgroundColor = color2;
    }
    if(tj4!=null){
      tj4.removeEventListener("click",tj4.jmove);
      tj4.style.backgroundColor = color2;
    }
    if(tj7!=null){
      tj7.removeEventListener("click",tj7.jmove);
      tj7.style.backgroundColor =color2 ;
    }
    if(tj8!=null){
      tj8.removeEventListener("click",tj8.jmove);
      tj8.style.backgroundColor = color2;
    }
        jumpMovementKing(tj8,td,tdr,Xval,Yval,color);
    
  }


  if((xl<n&&xl>=0)&&y1<n-1&&y1>=0){
    var childElement2 = ttl.firstChild; 
  }
  if(xr<n && xr>=0&&y1<n&&y1>=0){

  var childElement1 = ttr.firstChild; 
  }
  if(xl>=0 && xl<n&&y2>=0&&y2<n){
    var childElement4 = tdl.firstChild; 
  
  }
  if(xr<n&&xr>=0&&y2>=0&&y2<n){
    var childElement3 = tdr.firstChild; 
  }





if (existingPieceTR != null && existingPieceTL != null) { // needs removing of second jump square and event listener
  if (childElement1) { // checks if piece on the left is the same color to see if jump is needed

    let circleElement = childElement1.firstChild;
    let circleColor = circleElement.getAttribute('fill');
    if(circleColor != color){
      let zT = xr+1;
      let yt = y1-1;
      tj = document.getElementById(zT+','+yt);

      let tj1 = document.getElementById(zT+'s'+yt);
      if(tj1 == null){ // if no piece is being the piece trying to jump
        if(tj!=null){
          Xval = zT;
          Yval = yt;
          lastclickID1 = tj;
          tj.jmove = function() {
       
            movement5(); // allow for jump movement
              }
              tj.addEventListener('click', tj.jmove);
            
        tj.style.backgroundColor = "blue";
        }
      }
    }
    }
  if (childElement2) { // checks if piece on the left is the same color to see if jump is needed
  
    let circleElement = childElement2.firstChild;
    let circleColor = circleElement.getAttribute('fill');
    if(circleColor != color){
      let zT = xl-1;
      let yt = y1-1;
      tj4 = document.getElementById(zT+','+yt);
   
      let tj1 = document.getElementById(zT+'s'+yt);
      if(tj1 == null){ // if no piece is being the piece trying to jump
        if(tj4!=null){
          Xval = zT;
          Yval = yt;
          lastclickID2 = tj4;
          tj4.jmove = function() {
       
            movement6(); // allow for jump movement
              }
              tj4.addEventListener('click', tj4.jmove);
            
        tj4.style.backgroundColor = "blue";
        }
      }
    }
    }
  }
  else if (existingPieceTR != null) { // needs removing of second jump square and event listener
    if (childElement1) { // checks if piece on the left is the same color to see if jump is needed
  
      let circleElement = childElement1.firstChild;
      let circleColor = circleElement.getAttribute('fill');
      if(circleColor != color){
        let zT = xr+1;
        let yt = y1-1;
        tj = document.getElementById(zT+','+yt);
    
        let tj1 = document.getElementById(zT+'s'+yt);
        if(tj1 == null){ // if no piece is being the piece trying to jump
          if(tj!=null){
            Xval = zT;
            Yval = yt;
            lastclickID1 = tj;
            tj.jmove = function() {
       
              movement5(); // allow for jump movement
                }
                tj.addEventListener('click', tj.jmove);
              
                tj.style.backgroundColor = "blue";
       
          }
        }
      }
      }
      if((xl<n&&xl>=0)&&y1<n-1){
        ttl.jmove = function() {
       
          movement1(); // allow for jump movement
            }
            ttl.addEventListener('click', ttl.jmove);
          
        ttl.style.backgroundColor = "blue";
  
      }
    }
    else if( existingPieceTL!=null){
   
        if (childElement2) { // checks if piece on the left is the same color to see if jump is needed
          let circleElement = childElement2.firstChild;
          let circleColor = circleElement.getAttribute('fill');
          if(circleColor != color){
            let zT = xl-1;
            let yt = y1-1;
            tj4 = document.getElementById(zT+','+yt);
           
            let tj1 = document.getElementById(zT+'s'+yt);
            if(tj1 == null){ // if no piece is being the piece trying to jump
              if(tj4!=null){
                Xval = zT;
                Yval = yt;
                lastclickID2=tj4;
                tj4.jmove = function() {
       
                  movement6(); // allow for jump movement
                    }
                    tj4.addEventListener('click', tj4.jmove);
                  
                    tj4.style.backgroundColor = "blue";
           
              }
            }
          }
          }
          if(xr<n && xr>=0&&y1<n&&y1>=0){
            ttr.jmove = function() {
       
              movement2(); // allow for jump movement
                }
                ttr.addEventListener('click', ttr.jmove);
              
            ttr.style.backgroundColor = "blue";
           
            }
        }
if(existingPieceBL!=null&&existingPieceBR!=null){
    if (childElement3) { // checks if piece on the left is the same color to see if jump is needed
      let circleElement = childElement3.firstChild;
      let circleColor = circleElement.getAttribute('fill');
      if(circleColor != color){
        let zT = xr+1;
        let yt = y2+1;
        tj7 = document.getElementById(zT+','+yt);
       
        let tj1 = document.getElementById(zT+'s'+yt);
        if(tj1 == null){ // if no piece is being the piece trying to jump
          if(tj7!=null){
            Xval = zT;
            Yval = yt;
            lastclickID3 = tj7;
            tj7.jmove = function() {
       
              movement7(); // allow for jump movement
                }
                tj7.addEventListener('click', tj7.jmove);
              
          tj7.style.backgroundColor = "blue";
        
          }
        }
      }
      }
      if (childElement4) { // checks if piece on the left is the same color to see if jump is needed
        let circleElement = childElement4.firstChild;
        let circleColor = circleElement.getAttribute('fill');
        if(circleColor != color){
          let zT = xl-1;
          let yt = y2+1;
          tj8 = document.getElementById(zT+','+yt);
        
          let tj1 = document.getElementById(zT+'s'+yt);
          if(tj1 == null){ // if no piece is being the piece trying to jump
            if(tj8!=null){
              Xval = zT;
              lastclickID4 = tj8;
              Yval = yt;
              tj8.jmove = function() {
       
                movement8(); // allow for jump movement
                  }
                  tj8.addEventListener('click', tj8.jmove);
                
            tj8.style.backgroundColor = "blue";
           
            }
          }
        }
        }
  }
    else if(existingPieceBL!=null){
    if (childElement4) { // checks if piece on the left is the same color to see if jump is needed
      let circleElement = childElement4.firstChild;
      let circleColor = circleElement.getAttribute('fill');
      if(circleColor != color){
        let zT = xl-1;
        let yt = y2+1;
        tj7 = document.getElementById(zT+','+yt);
     
        let tj1 = document.getElementById(zT+'s'+yt);
        if(tj1 == null){ // if no piece is being the piece trying to jump
          if(tj7!=null){
            Xval = zT;
            lastclickID3 = tj7;
            Yval = yt;
            tj7.jmove = function() {
       
              movement7(); // allow for jump movement
                }
                tj7.addEventListener('click', tj7.jmove);
              
                tj7.style.backgroundColor = "blue";
         
          }
        }
      }
      }
      if(tdr!=null){
        tdr.jmove = function() {
       
          movement4(); // allow for jump movement
            }
            tdr.addEventListener('click', tdr.jmove);
          
        tdr.style.backgroundColor = "blue";
    
        }

}
      else if(existingPieceBR!=null){
    if (childElement3) { // checks if piece on the left is the same color to see if jump is needed
      let circleElement = childElement3.firstChild;
      let circleColor = circleElement.getAttribute('fill');
      if(circleColor != color){
        let zT = xr+1;
        let yt = y2+1;
        tj8 = document.getElementById(zT+','+yt);
        
        let tj1 = document.getElementById(zT+'s'+yt);
        if(tj1 == null){ // if no piece is being the piece trying to jump
          if(tj8!=null){
            Xval = zT;
            lastclickID4=tj8;
            Yval = yt;
            tj8.jmove = function() {
       
              movement8(); // allow for jump movement
                }
                tj8.addEventListener('click', tj8.jmove);
              
                tj8.style.backgroundColor = "blue";

          }
        }
      }
      }
        if(tdl!=null){
          tdl.jmove = function() {
       
            movement3(); // allow for jump movement
              }
              tdl.addEventListener('click', tdl.jmove);
            
          tdl.style.backgroundColor = "blue";
        
          }
    }
if(existingPieceBL==null&&existingPieceBR==null){

  if(tdl!=null){
    tdl.jmove = function() {
       
      movement3(); // allow for jump movement
        }
        tdl.addEventListener('click', tdl.jmove);
      
    tdl.style.backgroundColor = "blue";
    var childElement3 = tdl.firstChild; 
    }
    if(tdr!=null){
    tdr.style.backgroundColor = "blue";
    tdr.jmove = function() {
       
      movement4(); // allow for jump movement
        }
        tdr.addEventListener('click', tdr.jmove);
      

    var childElement4 = tdr.firstChild; 
    }
}
if (existingPieceTR== null && existingPieceTL== null) {

  if(ttl!=null){
    ttl.style.backgroundColor = "blue";
    ttl.jmove = function() {
       
      movement1(); // allow for jump movement
        }
        ttl.addEventListener('click', ttl.jmove);
      
    var childElement1 = ttl.firstChild; 
    }
    if(ttr!=null){
    ttr.style.backgroundColor = "blue";
    ttr.jmove = function() {
       
      movement2(); // allow for jump movement
        }
        ttr.addEventListener('click', ttr.jmove);
      
    var childElement2 = ttr.firstChild; 
    }
}
else if(existingPieceBL==null&&existingPieceBR==null&&existingPieceTL==null&&existingPieceTR==null){
  
      if(ttl!=null){
        ttl.style.backgroundColor = "blue";
        ttl.jmove = function() {
       
          movement1(); // allow for jump movement
            }
            ttl.addEventListener('click', ttl.jmove);
        var childElement1 = ttl.firstChild; 
        }
        if(ttr!=null){
        ttr.style.backgroundColor = "blue";
        ttr.jmove = function() {
       
          movement2(); // allow for jump movement
            }
            ttr.addEventListener('click', ttr.jmove);
    
        var childElement2 = ttr.firstChild; 
        }
        if(tdl!=null){
          tdl.jmove = function() {
       
            movement3(); // allow for jump movement
              }
              tdl.addEventListener('click', tdl.jmove);
            
        tdl.style.backgroundColor = "blue";
        
        var childElement3 = tdl.firstChild; 
        }
        if(tdr!=null){
          tdr.jmove = function() {
       
            movement4(); // allow for jump movement
              }
              tdr.addEventListener('click', tdr.jmove);
            
        tdr.style.backgroundColor = "blue";
        var childElement4 = tdr.firstChild; 
        }
    }
  }


function canKingDoubleJump(tdest,x,y,color){
  let bool = false;
  let x1=0;
  let y1=0;
 
    x1 = x+1
    y1 = y-1;
    let tr = document.getElementById(x1+","+y1);
    
    if(tr!=null){
    let childElement = tr.firstChild; 
    if(childElement){
      let circleElement = childElement.firstChild;
      let circleColor = circleElement.getAttribute('fill');
      if(circleColor != color){
        x1 = x1+1;
        y1 = y1-1;
        let tj = document.getElementById(x1+','+y1);
        let tj1 = document.getElementById(x1+'s'+y1);
        if(tj1 == null){ // if no piece is being the piece trying to jump
          if(tj!=null){
              bool = true;
              return bool;
          }
        }
      }
    }
  }
    x1 = x-1
    y1 = y-1;
    let tl = document.getElementById(x1+","+y1);
    if(tl!=null){
    childElement = tl.firstChild; 
    if(childElement){
      let circleElement = childElement.firstChild;
      let circleColor = circleElement.getAttribute('fill');
      if(circleColor != color){
        x1 = x1-1;
        y1 = y1-1;
        let tj = document.getElementById(x1+','+y1);
        let tj1 = document.getElementById(x1+'s'+y1);
        if(tj1 == null){ // if no piece is being the piece trying to jump
          if(tj!=null){
              bool = true;
              return bool;
          }
        }
      }
  }
  }

    x1 = x+1
    y1 = y+1;
    let br = document.getElementById(x1+","+y1);
    if(br!=null){
    let childElement = br.firstChild; 
    if(childElement){
      let circleElement = childElement.firstChild;
      let circleColor = circleElement.getAttribute('fill');
      if(circleColor != color){
        x1 = x1+1;
        y1 = y1+1;
        let tj = document.getElementById(x1+','+y1);
        let tj1 = document.getElementById(x1+'s'+y1);
        if(tj1 == null){ // if no piece is being the piece trying to jump
          if(tj!=null){
              bool = true;
              return bool;
          }
        }
      }
    }
  }
    x1 = x-1
    y1 = y+1;
    let bl = document.getElementById(x1+","+y1);
    if(bl!=null){
    childElement = bl.firstChild; 
    if(childElement){
      let circleElement = childElement.firstChild;
      let circleColor = circleElement.getAttribute('fill');
      if(circleColor != color){
        x1 = x1-1;
        y1 = y1+1;
        let tj = document.getElementById(x1+','+y1);
        let tj1 = document.getElementById(x1+'s'+y1);
        if(tj1 == null){ // if no piece is being the piece trying to jump
          if(tj!=null){
              bool = true;
              return bool;
          }
        }
      }
  }
}
  return bool;
}

function kingdobuleJump(x,y,color){

  var tj = null;
  var tr = null;
  var tl = null;
  var tj2 = null;
  var tj3 = null;
  var tj4 = null;
  var bl = null;
  var br = null;
  var td = document.getElementById(x+","+y);
  td.style.backgroundColor="blue";

  var x1=0;
  var y1=0;
  var x2=0;
  var y2 =0;
  var x3=0;
  var y3=0;
  var x4=0;
  var y4 =0;
  function moveN(){
   
    this.removeEventListener('click',moveN);
    this.style.backgroundColor =color2;
  
    if(tj!=null){
      tj.removeEventListener('click',moveJ1);
      tj.style.backgroundColor = color2;
  }
  if(tj2!=null){
    tj2.removeEventListener('click',moveJ2);
    tj2.style.backgroundColor = color2;
    }
    if(tj4!=null){
      tj4.removeEventListener('click',moveJ4);
      tj4.style.backgroundColor =color2;
      }
      if(tj3!=null){
        tj3.removeEventListener('click',moveJ3);
        tj3.style.backgroundColor =color2;
        }
    if(color ==c2){
      currentPlayer = c1;
      td.blackMove = function() {
        kingMovement(y, x,c2);
      }
      td.addEventListener('click', td.blackMove);
    }
    if(color == c1){
      currentPlayer = c2;
      td.whiteMove = function() {
        kingMovement(y, x,c1);
      }
      td.addEventListener('click', td.whiteMove);
    }
  }
  function moveJ1(){

    
    this.removeEventListener('click',moveJ1);
    this.style.backgroundColor =color2;
    if(tj2!=null){
    tj2.removeEventListener('click',moveJ2);
    tj2.style.backgroundColor = color2;
    }
    if(tj4!=null){
      tj4.removeEventListener('click',moveJ4);
      tj4.style.backgroundColor = color2;
      }
      if(tj!=null){
        tj.removeEventListener('click',moveJ1);
        tj.style.backgroundColor =color2;
        }
        if(tj3!=null){
          tj3.removeEventListener('click',moveJ3);
          tj3.style.backgroundColor = color2;
          }
    td.removeEventListener('click',moveN);
    td.style.backgroundColor = color2;
    jumpMovementKing(this,td,tr,x1,y1,color);
  }
  function moveJ2(){

     
      this.removeEventListener('click',moveJ2);
      this.style.backgroundColor = color2;
      if(tj!=null){
      tj.removeEventListener('click',moveJ1);
      tj.style.backgroundColor =color2;
  }
    if(tj!=null){
      tj4.removeEventListener('click',moveJ4);
      tj4.style.backgroundColor = color2;
      }
      if(tj3!=null){
        tj3.removeEventListener('click',moveJ3);
        tj3.style.backgroundColor =color2;
        }
      td.removeEventListener('click',moveN);
      td.style.backgroundColor = color2;
      jumpMovementKing(this,td,tl,x2,y2,color);
    }
    function moveJ3(){
      
        this.removeEventListener('click',moveJ3);
        this.style.backgroundColor =color2;
        if(tj2!=null){
          tj2.removeEventListener('click',moveJ2);
          tj2.style.backgroundColor =color2;
          }
          if(tj!=null){
            tj.removeEventListener('click',moveJ1);
            tj.style.backgroundColor =color2;
            }
            if(tj4!=null){
              tj4.removeEventListener('click',moveJ4);
              tj4.style.backgroundColor = color2;
              }
        td.removeEventListener('click',moveN);
        td.style.backgroundColor = color2;
        jumpMovementKing(this,td,br,x3,y3,color);
      }
      function moveJ4(){
       
          this.removeEventListener('click',moveJ4) ;
          this.style.backgroundColor = color2;
          if(tj2!=null){
          tj2.removeEventListener('click',moveJ2);
          tj2.style.backgroundColor = color2;
          }
          if(tj!=null){
            tj.removeEventListener('click',moveJ1);
            tj.style.backgroundColor = color2;
            }
            if(tj3!=null){
              tj3.removeEventListener('click',moveJ3);
              tj3.style.backgroundColor = color2;
              }
          td.removeEventListener('click',moveN);
          td.style.backgroundColor = color2;
          jumpMovementKing(this,td,bl,x4,y4,color);
        }
    x1 = x+1
    y1 = y-1;
    tr = document.getElementById(x1+","+y1);
    if(tr!=null){
    
    let childElement = tr.firstChild; 
    if(childElement){
      let circleElement = childElement.firstChild;
      let circleColor = circleElement.getAttribute('fill');
      if(circleColor != color){
        x1 = x1+1;
        y1 = y1-1;
        tj = document.getElementById(x1+','+y1);
        let tj1 = document.getElementById(x1+'s'+y1);
        if(tj1 == null){ // if no piece is being the piece trying to jump
          if(tj!=null){
            td.style.backgroundColor = "blue";
            td.addEventListener('click',moveN);
            tj.style.backgroundColor = "blue";
            tj.addEventListener('click',moveJ1);
          }
        }
      }
    }
  }
    x2 = x-1
    y2 = y-1;
    tl = document.getElementById(x2+","+y2);
    if(tl!=null){
    childElement = tl.firstChild; 
    if(childElement){
      let circleElement = childElement.firstChild;
      let circleColor = circleElement.getAttribute('fill');
      if(circleColor != color){
        x2 = x2-1;
        y2 = y2-1;
        tj2 = document.getElementById(x2+','+y2);
        let tj1 = document.getElementById(x2+'s'+y2);
        if(tj1 == null){ // if no piece is being the piece trying to jump
          if(tj2!=null){
            td.style.backgroundColor = "blue";
            td.addEventListener('click',moveN);
            tj2.style.backgroundColor = "blue";
            tj2.addEventListener('click',moveJ2);
          }
        }
      }
  }
}

    x3 = x+1
    y3 = y+1;
    
    br = document.getElementById(x3+","+y3);
  
    if(br!=null){
    let childElement = br.firstChild; 
    if(childElement){
      let circleElement = childElement.firstChild;
      let circleColor = circleElement.getAttribute('fill');
      if(circleColor != color){
        x3 = x3+1;
        y3 = y3+1;
         tj3 = document.getElementById(x3+','+y3);
        let tj1 = document.getElementById(x3+'s'+y3);
        if(tj1 == null){ // if no piece is being the piece trying to jump
          if(tj3!=null){
            td.style.backgroundColor = "blue";
            td.addEventListener('click',moveN);
            tj3.style.backgroundColor = "blue";
            tj3.addEventListener('click',moveJ3);
          }
        }
      }
    }
  }
    x4 = x-1
    y4 = y+1;
     bl = document.getElementById(x4+","+y4);
  
     if(bl!=null){
    childElement = bl.firstChild; 
    if(childElement){
      let circleElement = childElement.firstChild;
      let circleColor = circleElement.getAttribute('fill');
      if(circleColor != color){
        x4 = x4-1;
        y4 = y4+1;
        tj4 = document.getElementById(x4+','+y4);
        let tj1 = document.getElementById(x4+'s'+y4);
        if(tj1 == null){ // if no piece is being the piece trying to jump
          if(tj4!=null){
            td.style.backgroundColor = "blue";
            td.addEventListener('click',moveN);
            tj4.style.backgroundColor = "blue";
            tj4.addEventListener('click',moveJ4);
          }
        }
      }
  }
  }
}

function kingFinishMovement(td,tdb,color,x1,y1,x,y){
  var removetab = document.getElementById(x1 + 's' + y1); // removes piece at origional location

  if (removetab != null) {
    var parentEl1 = removetab.parentElement;
    parentEl1.removeChild(removetab);
  }

  // Remove existing piece on td
  var existingPiece = document.getElementById(x + 's' + y); // extra check so no two pieces can be in one spot 
  if (existingPiece != null) {
    var parentEl2 = existingPiece.parentElement;
    parentEl2.removeChild(existingPiece);
  }

 
  if (color == c1) {
    kingWHite(td, x, y);
    playerStats.incrementNumMoves('c1');
    updateMoves();
    updateScore();
    currentPlayer = c2; 
    tdb.removeEventListener('click', tdb.whiteMove); 
    td.whiteMove = function() {
      kingMovement(y, x,c1);
    }
    td.addEventListener('click', td.whiteMove);
  }

  if (color == c2) {
  //  y = y + 1;
    kingBlack(td,x,y);
    playerStats.incrementNumMoves('c2');
    updateMoves();
    updateScore();
    currentPlayer = c1; 
    tdb.removeEventListener('click', tdb.grayMove); //might be worth swapping for kingmove
    td.grayMove = function() {
      kingMovement(y, x,c2);
    }
    td.addEventListener('click', td.grayMove);
  }
}
function jumpMovementKing(tdest, td, tj, x, y, color) {
  // Remove event listeners before removing child elements
  if (color ==c1) {
    tj.removeEventListener('click', tj.grayMove); // removes event listener of piece being jumped
  } else if (color == c2) {
    tj.removeEventListener('click', tj.whiteMove);
  }

  // Remove the jumped piece from td
  let childElement = td.firstChild;
  if (childElement) {
    let circleElement = childElement.firstChild;
    if (circleElement) {
      td.removeChild(td.firstChild);
    }
  }

  // Remove the jumped piece from tj
  childElement = tj.firstChild;
  if (childElement) {
    let circleElement = childElement.firstChild;
    if (circleElement) {
      tj.removeChild(tj.firstChild);
    }
  }

  // Add the current piece to tdest
  let xDest = x;
  let yDest = y;


  if (color ==c1) {
    playerStats.decrementPieces('c1');
    kingWHite(tdest, xDest, yDest);
    tdest.removeEventListener('click', tdest.whiteMove); 
    if(canKingDoubleJump(tdest,xDest,yDest,color)){
   
      kingdobuleJump(xDest,yDest,color);
    }
    else{
    currentPlayer = c2; 
      
      tdest.whiteMove = function() {
        kingMovement(yDest, xDest,"white");
      }
      tdest.addEventListener('click', tdest.whiteMove);
    }
  
  } else if (color ==c2) {
    playerStats.decrementPieces('c2');
    kingBlack(tdest, xDest, yDest);
    tdest.removeEventListener('click', tdest.grayMove);
    if(canKingDoubleJump(tdest,xDest,yDest,color)){
     
      kingdobuleJump(xDest,yDest,color);
    }
    else{
    currentPlayer = c1; 
  
    
    tdest.grayMove = function () {
      kingMovement(yDest, xDest, c2);
    };
    tdest.addEventListener('click', tdest.grayMove);
  }
}

  // Clear the event listeners for td and tj
  td.removeEventListener('click', td.grayMove);
  td.removeEventListener('click', td.whiteMove);
  tj.removeEventListener('click', tj.grayMove);
  tj.removeEventListener('click', tj.whiteMove);

  // Remove the jump destination's background color
  if(canKingDoubleJump(tdest,xDest,yDest,color)==false){
    tdest.style.backgroundColor = color2;
    }

  // Update the background color of td and tj
  td.style.backgroundColor = color2;
  tj.style.backgroundColor = color2;
  updateScore();
}


function Wincondtion(){
  if( playerStats.returnPieces('c2') <= 0){
    alert(c1+" wins")
    sendData(c1);
  }
  if( playerStats.returnPieces('c1') <= 0){
    alert(c2+" wins")
    sendData(c2);
  }

}

function sendData(winner){
  data = new FormData // idk if form data is best way 
  data.append('moves', playerStats.returnMoves('c1'));
  data.append('pieces', playerStats.returnPieces('c1'));
  temp = time-seconds;
  data.append('time', temp); // figure out how to get time

  if(winner == c1){ // since everything is from p1 ones perspective and stats
    
    data.append('win', 1)
  }
  if(winner == c2){
    data.append('win', 0)
  }

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
          console.log(xhr.responseText);
      }
  };
  
  xhr.open('POST', 'insert.php', true);
  xhr.send(data);
}
//document.addEventListener('DOMContentLoaded', function () {
/*
function timer(){
  let seconds = time;
  const timerElement = document.getElementsByClassName("timer")[0];
function updateTimer() {
  seconds--;
  timerElement.textContent = `${seconds} second${seconds !== 1 ? 's' : ''}`;
}

// Set up the timer to update every second (1000 milliseconds)
const timerInterval = setInterval(updateTimer, 1000);
function resetTimer() {
  clearInterval(timerInterval); // Clear the existing interval
  seconds = time; // Reset the timer to the initial time
  timerElement.textContent = `${seconds} second${seconds !== 1 ? 's' : ''}`;
  startTimer(); // Start the timer again
}

};*/
let timerElement; // Declare timerElement as a global variable
let seconds = time; // might need to be put back in timer function 
function timer() {
  alert("idk how to reset timer")
  timerElement = document.getElementsByClassName("timer")[0];
 
  let timerInterval; 

  function updateTimer() {
    seconds--;
    timerElement.textContent = `${seconds} second${seconds !== 1 ? 's' : ''}`;
    if (seconds === 0) {
      clearInterval(timerInterval); // Clear the interval when the timer reaches 0
    }
  }

  function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
  }


  if(seconds <= 0 ){
    alert("time up");
    if(playerStats.returnPieces('c1') >  playerStats.returnPieces('c2')){
      alert(c1+"wins");
      sendData(c1);
    }
    else   if(playerStats.returnPieces('c1') < playerStats.returnPieces('c2')){
      alert(c2+" wins");
      sendData(c2);
    }
    else{
      alert("tie");
    }
  }
  // Start the timer initially
  startTimer();

  // You can now call resetTimer() whenever you want to reset the timer
}



function resetTimer() {
  timerElement = document.getElementsByClassName("timer")[0];
  clearInterval(timerInterval); // Clear the existing interval
  seconds = time; // Reset the timer to the initial time
  timerElement.textContent = `${seconds} second${seconds !== 1 ? 's' : ''}`;
  startTimer(); // Start the timer again
}




