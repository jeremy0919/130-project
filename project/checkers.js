function createTable(){
  /*
  need double jump logic
  need king logic
  need certain edge case handling
  need alternating turn logic
  need removal of highlight if different piece is clicked
  need removal of highlight if jump is not clicked

  */
 //test and test2 are gpt attempts at checkers for ideas
    table = document.createElement('table');

    table.setAttribute("td","Board");
    table.style.borderCollapse = "collapse";
    table.style.width = "400px";
    let n = 10;
    let tablebody = document.createElement("tbody");
    table.appendChild(tablebody);

    for(let i =0; i<n;++i){ // table row
      
        let tr = document.createElement("trow");
  
        for(let j =0; j<n; ++j){ // table data
            let td = document.createElement("td");
      
            let input = document.createElement("canvas");
    
            let input2 = document.createElement("canvas");
 
            input2.setAttribute("height", "40");
            input2.setAttribute("width", "40");
            input.setAttribute("height", "40");
       
            input.setAttribute("width", "40");

            if(i%2==0){ // alertnating row color
                if(j%2 ==0){
         
            td.style.backgroundColor ="red";
          //  td.appendChild(input);
            td.style.height = "40px";
            td.style.width = "40px";
            }
                if(j%2 == 1){
                  
          //    td.appendChild(input);
                td.style.backgroundColor = "black";
              
                td.style.height = "40px";
                td.style.width = "40px";
                td.addEventListener('click', function() { 
                  newClick(n,table);
                });
            }}
            if(i%2==1){
                if(j%2 ==0){
          
                td.style.backgroundColor ="black";
  
                td.style.height = "40px";
                td.style.width = "40px";
                td.addEventListener('click', function() { 
                  newClick(n,table);
                });
                }
                if(j%2 == 1){
               
                    td.style.backgroundColor = "red";
                    td.style.height = "40px";
                    td.style.width = "40px";
                }
            }
            td.setAttribute("id",j + "," + i) // sets id for later use in movement
            if(i<=2 && td.style.backgroundColor=="black"){
              td.grayMove = function() {
                  MovePiece(i, j,"gray");
              }
              td.addEventListener('click', td.grayMove);
              pieceBlack(td,j,i);
          }
          
          if(i>=7 && td.style.backgroundColor=="black"){
              td.whiteMove = function() {
                  MovePiece(i, j,"white");
              }
              td.addEventListener('click', td.whiteMove);
              pieceWhite(td,j,i);
          }
          tr.appendChild(td); 
      }
  
      tablebody.appendChild(tr);
  }
  
  document.getElementsByClassName("table")[0].appendChild(table);
}
function MovePiece(y, x, color) { // not overly needed but incriments or decrimetns 1 based off of direction of piece
  let y1 = y;
  
  if (color == "white") {
    y = y - 1;
    highlight(x, y, y1, color);
  }
  if (color == "gray") {
    y = y + 1;
    highlight(x, y, y1, color);
  }
}

function highlight(x, y, y1, color) {
  let x1 = x;
  let tdb = document.getElementById(x + "," + y1); // gets origional piece location
  x = x - 1;
  let z1 = x;
  let td = document.getElementById(x + "," + y); // gets left board location

  var existingPieceL = document.getElementById(z1 + 's' + y); // gets piece id on left

  x = x + 2;
  let td2 = document.getElementById(x + "," + y);// gets right board location
  
  let z2 = x;

  var Rdata = document.getElementById(z2 + ',' + y); // same as td and td2 used for jump function
  var Ldata = document.getElementById(z1 + ',' + y);

  function movement1() { // moves left and calls finish movement
 
    finishMovement(this, tdb, color, x1, z1, y1);
    td.removeEventListener('click', movement1); // removes event listener 
    td2.removeEventListener('click', movement2);
    td.style.backgroundColor = "black"; //changes background style
    td2.style.backgroundColor = "black";
  }

  function movement2() {// moves right and calls finish movement

    finishMovement(this, tdb, color, x1, z2, y1);
    td2.removeEventListener('click', movement2);
    td.removeEventListener('click', movement1);
    td.style.backgroundColor = "black";
    td2.style.backgroundColor = "black";
  }
  function movement3() { // jump movement
    this.removeEventListener('click',movement3)
    td2.removeEventListener('click', movement2);
    td.removeEventListener('click', movement1);
    if(color=="white"){
      Ldata.removeEventListener('click', Ldata.grayMove); 
    }
    else if(color=="gray"){
      Rdata.removeEventListener('click', Rdata.whiteMove); 
    }
    this.style.backgroundColor = 'black';
    td2.style.backgroundColor = "black";
    let temp = z1-1;
    jumpMovement(this,tdb,Ldata,temp,y,color); // should work
   
  }
  function movement4() { // jump movement
    this.removeEventListener('click',movement4);
    td2.removeEventListener('click', movement2);
    td.removeEventListener('click', movement1);
    if(color=="gray"){
      Rdata.removeEventListener('click', Rdata.whiteMove); 
    }
    else if(color=="white"){
      Ldata.removeEventListener('click', Ldata.grayMove); 
    }
    this.style.backgroundColor = 'black';
    td.style.backgroundColor = "black";
    let temp = z2+1;
    jumpMovement(this,tdb,Rdata,temp,y,color);
    
  }

  var existingPieceR = document.getElementById(z2 + 's' + y); // checks for piece at td2

  if (existingPieceR != null && existingPieceL != null) {
    return; //needs jump functionality
  } else if (existingPieceL != null) {
    let childElement = td.firstChild; 

  if (childElement) { // checks if piece on the left is the same color to see if jump is needed
    let circleElement = childElement.firstChild;
    let circleColor = circleElement.getAttribute('fill');
    if(circleColor != color){
      let zT = z1-1;
      let yt = y;
      if(color == 'gray'){ // if it can jump increments y accordingly
        yt = yt + 1;
      }
      if(color == 'white'){
        yt = yt - 1;
      }
      let tj = document.getElementById(zT+','+yt);
      let tj1 = document.getElementById(zT+'s'+yt);
      if(tj1 == null){ // if no piece is being the piece trying to jump
        tj.style.backgroundColor = "blue";
        tj.addEventListener('click',movement3); // allow for jump movement
      }
    }
    
  }
    td2.addEventListener('click', movement2); // adds regular movement to the other side
    td2.style.backgroundColor = "blue"; 
    
  } else if (existingPieceR != null) {
    let childElement = td2.firstChild; 
    if (childElement) { // checks if piece on the left is the same color to see if jump is needed
      let circleElement = childElement.firstChild;
      let circleColor = circleElement.getAttribute('fill');
      if(circleColor != color){
        let zT = z2+1;
        let yt = y;
        if(color == 'gray'){// if it can jump increments y accordingly
          yt = yt + 1;
        }
        if(color == 'white'){
          yt = yt - 1;
        }
        let tj = document.getElementById(zT+','+yt);
        let tj1 = document.getElementById(zT+'s'+yt);
        if(tj1 == null){ // if no piece is being the piece trying to jump
          tj.style.backgroundColor = "blue";
          tj.addEventListener('click',movement4);
        }

      }
      
    }
    td.addEventListener('click', movement1);// adds regular movement to the other side 
    td.style.backgroundColor = "blue";
  } else if (existingPieceR == null && existingPieceL == null) { // if no pieces regular movement 
    td.style.backgroundColor = "blue";
    td2.style.backgroundColor = "blue";
  td.addEventListener('click', movement1);
  td2.addEventListener('click', movement2);
}
}
function jumpMovement(tdest, td, tj, x, y, color) {
  // Remove event listeners before removing child elements
  if (color === "white") {
    tj.removeEventListener('click', tj.grayMove);
  } else if (color === "gray") {
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
  if (color === "white") {
    yDest -= 1;
  } else if (color === "gray") {
    yDest += 1;
  }

  if (color === "white") {
    
    alert("x:"+xDest+" y:"+yDest)
    pieceWhite(tdest, xDest, yDest);
    tdest.removeEventListener('click', tdest.whiteMove);
    tdest.whiteMove = function () {
      MovePiece(yDest, xDest, "white");
    };
    tdest.addEventListener('click', tdest.whiteMove);
  } else if (color === "gray") {
   
    alert("x:"+xDest+" y:"+yDest)
    pieceBlack(tdest, xDest, yDest);
    tdest.removeEventListener('click', tdest.grayMove);
    tdest.grayMove = function () {
      MovePiece(yDest, xDest, "gray");
    };
    tdest.addEventListener('click', tdest.grayMove);
  }

  // Clear the event listeners for td and tj
  td.removeEventListener('click', td.grayMove);
  td.removeEventListener('click', td.whiteMove);
  tj.removeEventListener('click', tj.grayMove);
  tj.removeEventListener('click', tj.whiteMove);

  // Remove the jump destination's background color
  tdest.style.backgroundColor = 'black';

  // Update the background color of td and tj
  td.style.backgroundColor = 'black';
  tj.style.backgroundColor = 'black';
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

  if (color == "white") {
    y = y - 1; //places pieces at new lcoation and removes and adds event listeners accordingly
    pieceWhite(td, x, y);
    tdb.removeEventListener('click', tdb.whiteMove); 
    td.whiteMove = function() {
      MovePiece(y, x,"white");
    }
    td.addEventListener('click', td.whiteMove);
  }

  if (color == "gray") {
    y = y + 1;
    pieceBlack(td,x,y);
    tdb.removeEventListener('click', tdb.grayMove); 
    td.grayMove = function() {
      MovePiece(y, x,"gray");
    }
    td.addEventListener('click', td.grayMove);
  }
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
  circle.setAttribute("fill", "white");
  svg.appendChild(circle);
  svg.setAttribute("id",x+'s'+y);
  td.appendChild(svg);

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
  circle.setAttribute("fill", "gray");
  svg.appendChild(circle);
  svg.setAttribute("id",x+'s'+y);
  td.appendChild(svg);

}
function newClick(n, table) {
  /*
  for (let i = 0; i < n; ++i) {
    var tr = table.getElementsByTagName("tr")[i];

    for (let j = 0; j < n; j++) {
      let td = tr.getElementsByTagName("td")[j];
      if (td.style.backgroundColor === "blue") {
        td.style.backgroundColor = "black";
        td.removeEventListener('click', movePiece); // Remove event listener
      }
    }
  }
  */
}