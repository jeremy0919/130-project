let currentPlayer = "white";
var lastClickedx = null;
var lastclickedy = null;
var lastclickedC = null;
var n = 10;
function createTable(){
  /*
  need edge case for king if at edge of board
  need double jump logic
  need remove event lsiteners and edge cases of king logic
  check turn into king logic
  need certain edge case handling
  need removal of event listeners if different piece is clicked
  need removal of second event listener in the case of two jump options

  */
 //test and test2 are gpt attempts at checkers for ideas
    table = document.createElement('table');

    table.setAttribute("td","Board");
    table.style.borderCollapse = "collapse";
    table.style.width = "400px";
   // let n = 10;
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
            
            }}
            if(i%2==1){
                if(j%2 ==0){
          
                td.style.backgroundColor ="black";
  
                td.style.height = "40px";
                td.style.width = "40px";
           
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
              td.attributes.isking = 0;
          }
          
          if(i>=7 && td.style.backgroundColor=="black"){
              td.whiteMove = function() {
                  MovePiece(i, j,"white");
              }
              td.addEventListener('click', td.whiteMove);
              pieceWhite(td,j,i);
              td.attributes.isking = 0;
             // alert(td.attributes.isking)
          }
          tr.appendChild(td); 
      }
  
      tablebody.appendChild(tr);
  }
  
  document.getElementsByClassName("table")[0].appendChild(table);
}

function MovePiece(y, x, color) { 
  let td = document.getElementById(x+','+y)
  let king = td.attributes.isking;
 // alert(king);
  if(king == 0){
  if(lastClickedx==null){
  let y1 = y; // call piece clicked here, store data to last piece clicked, if different piece is clicked
  if(currentPlayer == "white"){ // remove event listeners from last piece clicked
  if (color == "white") { // set last piece as global vars, set to null at the end of movement functions
    y = y - 1;
    highlight(x, y, y1, color); //still need to remove event listeners
    lastClickedx = x;
    lastclickedy = y1;
    lastclickedC = color; // needs to be moved assumes player cant click elsewhere
  }
}
if(currentPlayer == "black"){
  if (color == "gray") {
    y = y + 1;
    highlight(x, y, y1, color);
    lastClickedx = x;
    lastclickedy = y1;
    lastclickedC = color;
    currentPlayer = "white";
  }
}
  }
  else{
   // let reset = document.getElementById(lastClickedx+','+lastclickedy);
    let color1 = lastclickedC;
    let temp1 = lastclickedy;
    let temp2 = lastClickedx+1;
    let temp3 = lastClickedx-1;
    if(color1 == 'white'){
      temp1 =temp1-1;
    }
    if(color1 == 'gray'){
      temp1 =temp1+1;
    }
    /*
    let reset1 = document.getElementById(temp2+','+temp1); // chatgpt the best approach to removing these
    reset1.style.backgroundColor = "black";
   // reset1.removeEventListener('click',movement1());
   // reset1.removeEventListener('click',movement2());
    let reset2 = document.getElementById(temp3+','+temp1);
  //  reset2.removeEventListener('click',movement1());
  //  reset2.removeEventListener('click',movement2());
    reset2.style.backgroundColor = "black";
    */
    lastClickedx = null;
    lastclickedC = null;
    lastclickedy = null;
    MovePiece(y,x,color)
  }}
  else if( king == 1){
    kingMovement(x,y,color);
    //worth adding in lastclicked check here or making it its own function
  }
}

function highlight(x, y, y1, color) {
  let x1 = x;
  var tj = null;
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
    if(z2>=0&&z2<n){
      td2.removeEventListener('click', movement2);
      td2.style.backgroundColor = "black";
      }
      if(z1<n&&z1>=0){
      td.removeEventListener('click', movement1);
      td.style.backgroundColor = "black";
      }
    if(tj!=null){
      tj.removeEventListener('click',movement3);
      tj.removeEventListener('click',movement4);
      tj.style.backgroundColor = "black";
    }
  }

  function movement2() {// moves right and calls finish movement
    // needs something where if jump is an option and not taken removes event listener
    finishMovement(this, tdb, color, x1, z2, y1);
    if(z2<n&&z2>=0){
    td2.removeEventListener('click', movement2);
    td2.style.backgroundColor = "black";
    }
    if(z1>=0&&z1<n){
    td.removeEventListener('click', movement1);
    td.style.backgroundColor = "black";
    }
    if(tj!=null){
      tj.removeEventListener('click',movement3);
      tj.removeEventListener('click',movement4);
      tj.style.backgroundColor = "black";
    }
   
   
  }
  function movement3() { // jump movement
    this.removeEventListener('click',movement3)
    if(z2<n&&z2>=0){
      td2.removeEventListener('click', movement2);
      td2.style.backgroundColor = "black";
      }
      if(z1>=0&&z1<n){
      td.removeEventListener('click', movement1);
      td.style.backgroundColor = "black";
      }
    if(color=="white"){
      if(z1>=0&&z1<n){
      Ldata.removeEventListener('click', Ldata.grayMove); 
      }
    }
    else if(color=="gray"){
      if(z2<n&&z2>=0){
      Rdata.removeEventListener('click', Rdata.whiteMove); 
      }
    }
    this.style.backgroundColor = 'black';
  
    let temp = z1-1;
    jumpMovement(this,tdb,Ldata,temp,y,color); // should work
   
  }
  function movement4() { // jump movement
    this.removeEventListener('click',movement4);
    if(z2>=0&&z2<n){
      td2.removeEventListener('click', movement2);
      td2.style.backgroundColor = "black";
      }
      if(z1<n&&z1>=0){
      td.removeEventListener('click', movement1);
      td.style.backgroundColor = "black";
      }
    if(color=="gray"){
      Rdata.removeEventListener('click', Rdata.whiteMove); 
    }
    else if(color=="white"){
      Ldata.removeEventListener('click', Ldata.grayMove); 
    }
    this.style.backgroundColor = 'black';

    let temp = z2+1;
    jumpMovement(this,tdb,Rdata,temp,y,color);
    
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
        if(color == 'gray'){// if it can jump increments y accordingly
          yt = yt + 1;
        }
        if(color == 'white'){
          yt = yt - 1;
        }
        tj = document.getElementById(zT+','+yt);
        let tj1 = document.getElementById(zT+'s'+yt);
        if(tj1 == null){ // if no piece is being the piece trying to jump
          if(tj!=null){
          tj.style.backgroundColor = "blue";
          tj.addEventListener('click',movement4);
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
        if(color == 'gray'){ // if it can jump increments y accordingly
          yt = yt + 1;
        }
        if(color == 'white'){
          yt = yt - 1;
        }
        tj = document.getElementById(zT+','+yt);
        let tj1 = document.getElementById(zT+'s'+yt);
        if(tj1 == null){ // if no piece is being the piece trying to jump
          if(tj!=null){
          tj.style.backgroundColor = "blue";
          tj.addEventListener('click',movement3); // allow for jump movement
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
      if(color == 'gray'){ // if it can jump increments y accordingly
        yt = yt + 1;
      }
      if(color == 'white'){
        yt = yt - 1;
      }
      tj = document.getElementById(zT+','+yt);
      let tj1 = document.getElementById(zT+'s'+yt);
      if(tj1 == null){ // if no piece is being the piece trying to jump
        if(tj!=null){
        tj.style.backgroundColor = "blue";
        tj.addEventListener('click',movement3); // allow for jump movement
        }
      }
    }
    
  }
  if(z2<n&&z2>=0){
    td2.addEventListener('click', movement2); // adds regular movement to the other side
    td2.style.backgroundColor = "blue"; 
  }
    
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
        tj = document.getElementById(zT+','+yt);
        let tj1 = document.getElementById(zT+'s'+yt);
        if(tj1 == null){ // if no piece is being the piece trying to jump
          if(tj!=null){
          tj.style.backgroundColor = "blue";
          tj.addEventListener('click',movement4);
          }
        }

      }
      
    }

    td.addEventListener('click', movement1);// adds regular movement to the other side 
    td.style.backgroundColor = "blue";
    
  } else if (existingPieceR == null && existingPieceL == null) { // if no pieces regular movement 
    
   //alert("z2: "+ z2);
  // alert("z1: "+z1);
    if(z2<n&&z2>=0){
    td2.style.backgroundColor = "blue";
    td2.addEventListener('click', movement2);
    }
    if(z1>=0&&z1<n){
      td.addEventListener('click', movement1);
      td.style.backgroundColor = "blue";
    }
    
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
    currentPlayer = "black"; 
    if(yDest ==n-1){
      kingWHite(tdest, xDest, yDest);
      currentPlayer = "black"; 
      tdest.removeEventListener('click', tdest.whiteMove); 
      tdest.whiteMove = function() {
        kingMovement(yDest, xDest,"white");
      }
      tdest.addEventListener('click', tdest.whiteMove);
    }
   else{
    pieceWhite(tdest, xDest, yDest);
    tdest.removeEventListener('click', tdest.whiteMove);
    tdest.whiteMove = function () {
      MovePiece(yDest, xDest, "white");
    };
    tdest.addEventListener('click', tdest.whiteMove);
  }
  } else if (color === "gray") {
   
    currentPlayer = "white"; 
    if(yDest == n-1){
      kingBlack(tdest,xDest,yDest);
      currentPlayer = "white"; 
      tdest.removeEventListener('click', tdest.grayMove); //might be worth swapping for kingmove
      tdest.grayMove = function() {
        kingMovement(yDest, xDest,"gray");
      }
      tdest.addEventListener('click', tdest.grayMove);
    }
    else{
    pieceBlack(tdest, xDest, yDest);
    tdest.removeEventListener('click', tdest.grayMove);
    tdest.grayMove = function () {
      MovePiece(yDest, xDest, "gray");
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
    if(y ==0){
      if(yDest ==0){
        kingWHite(td, x, y);
        currentPlayer = "black"; 
        tdb.removeEventListener('click', tdb.whiteMove); 
        td.whiteMove = function() {
          kingMovement(y, x,"white");
        }
        td.addEventListener('click', td.whiteMove);
      }
    }
    else{
    pieceWhite(td, x, y);
    currentPlayer = "black"; 
    tdb.removeEventListener('click', tdb.whiteMove); 
    td.whiteMove = function() {
      MovePiece(y, x,"white");
    }
    td.addEventListener('click', td.whiteMove);
  }
  }

  if (color == "gray") {
    y = y + 1;
    currentPlayer = "white"; 
    if(y == 9){
      kingBlack(td,x,y);
      currentPlayer = "white"; 
      tdb.removeEventListener('click', tdb.grayMove); //might be worth swapping for kingmove
      td.grayMove = function() {
        kingMovement(y, x,"gray");
      }
      td.addEventListener('click', td.grayMove);
    }
    else{
      pieceBlack(td,x,y);
    tdb.removeEventListener('click', tdb.grayMove); 
    td.grayMove = function() {
      MovePiece(y, x,"gray");
    }
    td.addEventListener('click', td.grayMove);
  }
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
  td.attributes.isking = 0;
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
  td.attributes.isking = 0;
  td.appendChild(svg);

}

function kingWHite(td,x,y){ // add is king set here
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
  svg.appendChild(createKingCrown());
  svg.setAttribute("id",x+'s'+y);
  td.appendChild(svg);
  td.attributes.isking = 1;
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
  circle.setAttribute("fill", "gray");
  svg.appendChild(circle);
  svg.appendChild(createKingCrown());
  svg.setAttribute("id",x+'s'+y);
  td.appendChild(svg);
  td.attributes.isking = 1;
}






function createKingCrown() {
  const crown = document.createElementNS("http://www.w3.org/2000/svg", "path");
  crown.setAttribute("d", "M20 10 L20 5 L25 5 L20 15 L15 5 L20 5 Z");
  crown.setAttribute("fill", "gold");
  return crown;
}

function kingMovement(x, y, color){
  let temp = y+1;
  let y1 = temp;
  let temp1 = x+1;
  let xl = temp1;
  let td = document.getElementById(x+','+y); // origional location
  td.attributes.isking = 1;
  let ttl = document.getElementById(temp1+','+temp) // top left 
  temp1 = x-1;
  let xr = temp1;
  let ttr = document.getElementById(temp1+','+temp); //top right
  temp = y-1;
  let y2 = temp;
  let tdr = document.getElementById(temp1+','+temp); // bottom right
  temp1 = x+1;
  let tdl = document.getElementById(temp1+','+temp); // bottom left



  function movement1() { // moves left and calls finish movement
    // add in remove event listener calls and change color
    kingFinishMovement(this, td, color,x,y, xl,y1);

  }
  function movement2() { // moves left and calls finish movement
 
    kingFinishMovement(this, td, color,x,y, xr,y1);

  }
  function movement3() { // moves left and calls finish movement
 
    kingFinishMovement(this, td, color,x,y, xl,y2);

  }
  function movement4() { // moves left and calls finish movement
 
    kingFinishMovement(this, td, color,x,y, xr,y2);

  }

  alert("xr: "+xr);
  alert("xl: "+xl);
  alert("y1: "+y1);
  alert("y2: "+y2);
  if((xl<n&&xl>=0)&&y1<n-1){
  ttl.style.backgroundColor = "blue";//runs error check logic likely all run error
  ttl.addEventListener('click',movement1);
  }
  if(xr<n && xr>=0&&y1<n&&y1>=0){
  ttr.style.backgroundColor = "blue";
  ttr.addEventListener('click',movement2);
  }
  if(xl>=0 && xl<n&&y2>=0&&y2<n){
  tdr.style.backgroundColor = "blue";
  tdr.addEventListener('click',movement3);
  }
  if(xr<n&&xr>=0&&y2>=0&&y2<n){
  tdl.style.backgroundColor = "blue";
  tdl.addEventListener('click',movement4)
  }




}

function kingFinishMovement(tdb,td,color,x1,y1,x,y){
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

  if (color == "white") {
   // y = y - 1; //places pieces at new lcoation and removes and adds event listeners accordingly
    kingWHite(td, x, y);
    currentPlayer = "black"; 
    tdb.removeEventListener('click', tdb.whiteMove); 
    td.whiteMove = function() {
      kingMovement(y, x,"white");
    }
    td.addEventListener('click', td.whiteMove);
  }

  if (color == "gray") {
  //  y = y + 1;
    kingBlack(td,x,y);
    currentPlayer = "white"; 
    tdb.removeEventListener('click', tdb.grayMove); //might be worth swapping for kingmove
    td.grayMove = function() {
      kingMovement(y, x,"gray");
    }
    td.addEventListener('click', td.grayMove);
  }
}