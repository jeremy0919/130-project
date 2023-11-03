var currentPlayer = "white";
var lastClickedx = null;
var lastclickedy = null;
var lastclickedC = null;
var n = 10;
function createTable(){
  /*
  need double jump logic
  likely needs certain edge case handling most dealt with
  need removal of event listeners if different piece is clicked
  need removal of second event listener in the case of two jump options
  for jump remove event listeners try using an array for x values and for y values
  then use a for each loop that sets var = to id and removes all event listeners, wont fix new click but will 
  fix not jumping
  */

  //for double jump add in a function that reutnrs bool into jump movement
  //if can jump other function returns... too much thinking
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
            td.style.height = "40px";
            td.style.width = "40px";
            }
                if(j%2 == 1){
                  
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
  let y1 = y; // call piece clicked here, store data to last piece clicked, if different piece is clicked
  if(currentPlayer == "white"){ // remove event listeners from last piece clicked
  if (color == "white") { // set last piece as global vars, set to null at the end of movement functions
    y = y - 1;
    highlight(x, y, y1, color); //still need to remove event listeners
  }
}
if(currentPlayer == "black"){
  if (color == "gray") {
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
  let cx = x;
  let cy = y; // used to remove event listeners
  let cz = y1;

  let x1 = x;
  var tj = null;
 // alert("base x1: " +x+" y: "+y  );
  let tdb = document.getElementById(x + "," + y1); // gets origional piece location
  x = x - 1;
  let z1 = x;
// alert("td x1: " +x+" y: "+y  );
  let td = document.getElementById(x + "," + y); // gets left board location


  var existingPieceL = document.getElementById(z1 + 's' + y); // gets piece id on left

  x = x + 2;
  //alert("td2 x1: " +x+" y: "+y  );
  let td2 = document.getElementById(x + "," + y);// gets right board location
  
  let z2 = x;
 
  var Rdata = document.getElementById(z2 + ',' + y); // same as td and td2 used for jump function
  var Ldata = document.getElementById(z1 + ',' + y);
var delta1;
var delta2;
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
    if(delta1!=null){
      delta1.removeEventListener('click',movement4);
      delta1.style.backgroundColor = "black";
    } 
    if(delta2!=null){
      delta2.removeEventListener('click',movement4);
      delta2.style.backgroundColor = "black";
    }
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
    if(delta1!=null){
      delta1.removeEventListener('click',movement3);
      delta1.style.backgroundColor = "black";
    } 
    if(delta2!=null){
      delta2.removeEventListener('click',movement3);
      delta2.style.backgroundColor = "black";
    }
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
        delta1 = tj;
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
        delta2 = tj;
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
/*
console.log(td);
//console.log(td2);
if(lastClickedx!=null){ // logic needs improvement
  let color1 = lastclickedC;
  let temp1 = lastclickedy;
  let temp2 = lastClickedx+1;
  let temp3 = lastClickedx-1;

  
  let reset1 = document.getElementById(temp2 + ',' + temp1);

 //console.log(reset1.getEventListeners);
  if(reset1!=null){
   // reset1.removeEventListener('click', reset1.grayMove);
    //reset1.removeEventListener('click', reset1.whiteMove);
    reset1.removeEventListener('click', movement1);
    reset1.removeEventListener('click', movement2);
    reset1.style.backgroundColor = "black";// doesnt Remove event listener
  }

  let reset2 = document.getElementById(temp3 + ',' + temp1);
 
  if(reset2!=null){
  //  reset2.removeEventListener('click', reset2.grayMove);
    //reset2.removeEventListener('click', reset2.whiteMove);
    reset2.removeEventListener('click', movement1);
    reset2.removeEventListener('click', movement2);
    reset2.style.backgroundColor = "black";
  }
  lastClickedx = null;
  lastclickedC = null;
  lastclickedy = null;
//  highlight(cx, cy, cz, color);
  return;
}
else{
  lastClickedx = cx;
  lastclickedy = cy;
  lastclickedC = color;
}
*/
}

function jumpMovement(tdest, td, tj, x, y, color) {
  // Remove event listeners before removing child elements
  console.log("jump Movement");
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
  console.log(tdest);
  // Add the current piece to tdest
  let xDest = x;
  let yDest = y;
  if (color === "white") {
    yDest -= 1;
  } else if (color === "gray") {
    yDest += 1;
  }

  if (color === "white") {
  
    if(yDest ==0&&tdest.attributes.isking!=1){
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
    if(canDoubleJump(tdest,xDest,yDest,color)){
      console.log("canDoubleJumpWhiteMove")
      dobuleJump(xDest,yDest,color);
    }
    else{
      console.log("else WhiteMove")
    tdest.whiteMove = function () {
      MovePiece(yDest, xDest, "white");
    };
    tdest.addEventListener('click', tdest.whiteMove);
    currentPlayer = "black"; 
  }
  }
  } else if (color === "gray") {
   
   
    if(yDest == n&&tdest.attributes.isking!=1){
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
    if(canDoubleJump(tdest,xDest,yDest,color)){
      console.log("canDOubleJumpGrayMove")
      dobuleJump(xDest,yDest,color);
      
    }
    else{
      currentPlayer = "white"; 
      console.log("else grayMove")
      console.log(tdest);
      console.log(yDest);
      console.log(xDest);
    tdest.grayMove = function () {
      MovePiece(yDest, xDest, "gray");
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

  // Remove the jump destination's background color
  tdest.style.backgroundColor = 'black';

  // Update the background color of td and tj
  td.style.backgroundColor = 'black';
  tj.style.backgroundColor = 'black';
}

function canDoubleJump(tdest,x,y,color){
  let bool = false;
  let x1=0;
  let x2=0;
  let y2=0
  let y1=0;
  if(color == "white"){
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

  if(color == "gray"){
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
  return bool;
}

function dobuleJump(x,y,color){
  console.log("doubleJump");
  var tj = null;
  var tr = null;
  var tl = null;
  var tj2 = null;
  
  var td = document.getElementById(x+","+y);
  console.log(td);
  var x1=0;
  var y1=0;
  var x2=0;
  var y2 =0;
  function moveN(){
    console.log("moven");
    this.removeEventListener('click',moveN);
    this.style.backgroundColor = "black";
    console.log(tj);
    if(tj!=null){
      tj.removeEventListener('click',moveJ1);
      tj.style.backgroundColor = "black";
  }
  if(tj2!=null){
    tj2.removeEventListener('click',moveJ2);
    tj2.style.backgroundColor = "black";
    }
    if(color == "gray"){
      currentPlayer = "white"
    //  tdb.removeEventListener('click', tdb.blackMove); 
      td.blackMove = function() {
        MovePiece(y, x,"gray");
      }
      td.addEventListener('click', td.blackMove);
    }
    if(color == "white"){
      currentPlayer = "black";
   //   tdb.removeEventListener('click', tdb.whiteMove); 
      td.whiteMove = function() {
        MovePiece(y, x,"white");
      }
      td.addEventListener('click', td.whiteMove);
    }
  }
  function moveJ1(){
  console.log("movj");
  console.log(tr);
    //console.log(tj);
    this.removeEventListener('click',moveJ1);
    this.style.backgroundColor = "black";
    if(tj2!=null){
    tj2.removeEventListener('click',moveJ2);
    tj2.style.backgroundColor = "black";
    }
    td.removeEventListener('click',moveN);
    td.style.backgroundColor = "black";
    jumpMovement(this,td,tr,x1,y1,color);
  }
  function moveJ2(){
    console.log("movj");
    console.log(tl);
     
      this.removeEventListener('click',moveJ);
      this.style.backgroundColor = "black";
      if(tj!=null){
      tj.removeEventListener('click',moveJ1);
      tj.style.backgroundColor = "black";
  }
      td.removeEventListener('click',moveN);
      td.style.backgroundColor = "black";
      jumpMovement(this,td,tl,x2,y2,color);
    }
  if(color == "white"){
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
            tj.style.backgroundColor = "blue";
            tj.addEventListener('click',moveJ2);
          }
        }
      }
    }
  }
}

  if(color == "gray"){
    x1 = x+1
    y1 = y+1;
    
    tr = document.getElementById(x1+","+y1);
    console.log(tr);
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
     console.log(tr);
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
          if(tj!=null){
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

  if (color == "white") {
    y = y - 1; //places pieces at new lcoation and removes and adds event listeners accordingly
    if(y ==0){
      if(yDest ==0&&td.attributes.isking!=1){
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
    if(y == 9&&td.attributes.isking!=1){
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

function kingMovement(y, x, color){ //needs jump functionality
  console.log("kingMovement")
  let temp = y-1;
  let y1 = temp;
  let temp1 = x-1;
  let xl = temp1;
  let td = document.getElementById(x+','+y); // origional location
  console.log(td);
  td.attributes.isking = 1;
  let ttl = document.getElementById(temp1+','+temp) // top left 
  console.log(ttl);
  var existingPieceTL = document.getElementById(temp1 + 's' + temp); // gets piece id on left
  var tj = null;
  temp1 = x+1;
  let xr = temp1;
  let ttr = document.getElementById(temp1+','+temp); //top right
  console.log(ttr);
  var existingPieceTR = document.getElementById(temp1 + 's' + temp); // gets piece id on left

  temp = y+1;
  let y2 = temp;
  let tdr = document.getElementById(temp1+','+temp); // bottom right
  var existingPieceBR = document.getElementById(temp1 + 's' + temp); // gets piece id on left
  console.log(tdr);
  temp1 = x-1;
  let tdl = document.getElementById(temp1+','+temp); // bottom left
  console.log(tdl);
  var existingPieceBL = document.getElementById(temp1 + 's' + temp); // gets piece id on left
  var Yval =0;
  var Xval =0;

  console.log("endkingMovement")

  function movement1() { // moves left and calls finish movement
    // add in remove event listener calls and change color
    kingFinishMovement(this, td, color,x,y, xl,y1);
    if((xl<n&&xl>=0)&&y1<n-1){
      ttl.style.backgroundColor = "black";//runs error check logic likely all run error
      ttl.removeEventListener('click',movement1);
      }
      if(xr<n && xr>=0&&y1<n&&y1>=0){
      ttr.style.backgroundColor = "black";
      ttr.removeEventListener('click',movement2);
      }
      if(xl>=0 && xl<n&&y2>=0&&y2<n){
        tdl.style.backgroundColor = "black";
        tdl.removeEventListener('click',movement3);
        }
        if(xr<n&&xr>=0&&y2>=0&&y2<n){
        tdr.style.backgroundColor = "black";
        tdr.removeEventListener('click',movement4)
        }
        console.log(tj);
        if(tj!=null){
          tj.removeEventListener('click',movement5)
          tj.removeEventListener('click',movement6)
          tj.removeEventListener('click',movement7)
          tj.removeEventListener('click',movement8)
        }
  }
  function movement2() { // moves left and calls finish movement
 
    kingFinishMovement(this, td, color,x,y, xr,y1);
    if((xl<n&&xl>=0)&&y1<n-1){
      ttl.style.backgroundColor = "black";//runs error check logic likely all run error
      ttl.removeEventListener('click',movement1);
      }
      if(xr<n && xr>=0&&y1<n&&y1>=0){
      ttr.style.backgroundColor = "black";
      ttr.removeEventListener('click',movement2);
      }
      if(xl>=0 && xl<n&&y2>=0&&y2<n){
        tdl.style.backgroundColor = "black";
        tdl.removeEventListener('click',movement3);
        }
        if(xr<n&&xr>=0&&y2>=0&&y2<n){
        tdr.style.backgroundColor = "black";
        tdr.removeEventListener('click',movement4)
        }
        console.log("mov2:" + tj);
        if(tj!=null){
          tj.removeEventListener('click',movement5)
          tj.removeEventListener('click',movement6)
          tj.removeEventListener('click',movement7)
          tj.removeEventListener('click',movement8)
        }
  }
  function movement3() { // moves left and calls finish movement
 
    kingFinishMovement(this, td, color,x,y, xl,y2);
    if((xl<n&&xl>=0)&&y1<n-1){
      ttl.style.backgroundColor = "black";//runs error check logic likely all run error
      ttl.removeEventListener('click',movement1);
      }
      if(xr<n && xr>=0&&y1<n&&y1>=0){
      ttr.style.backgroundColor = "black";
      ttr.removeEventListener('click',movement2);
      }
      if(xl>=0 && xl<n&&y2>=0&&y2<n){
        tdl.style.backgroundColor = "black";
        tdl.removeEventListener('click',movement3);
        }
        if(xr<n&&xr>=0&&y2>=0&&y2<n){
        tdr.style.backgroundColor = "black";
        tdr.removeEventListener('click',movement4)
        }
        console.log("mov3:" + tj);
        if(tj!=null){
          tj.removeEventListener('click',movement5)
          tj.removeEventListener('click',movement6)
          tj.removeEventListener('click',movement7)
          tj.removeEventListener('click',movement8)
        }
  }
  function movement4() { // moves left and calls finish movement
 
    kingFinishMovement(this, td, color,x,y, xr,y2);
    if((xl<n&&xl>=0)&&y1<n-1){
      ttl.style.backgroundColor = "black";
      ttl.removeEventListener('click',movement1);
      }
      if(xr<n && xr>=0&&y1<n&&y1>=0){
      ttr.style.backgroundColor = "black";
      ttr.removeEventListener('click',movement2);
      }
      if(xl>=0 && xl<n&&y2>=0&&y2<n){
      tdl.style.backgroundColor = "black";
      tdl.removeEventListener('click',movement3);
      }
      if(xr<n&&xr>=0&&y2>=0&&y2<n){
      tdr.style.backgroundColor = "black";
      tdr.removeEventListener('click',movement4)
      }
      console.log("mov4:" + tj);
      if(tj!=null){
        tj.removeEventListener('click',movement5)
        tj.removeEventListener('click',movement6)
        tj.removeEventListener('click',movement7)
        tj.removeEventListener('click',movement8)
      }
  }
  function movement5(){ // doesn't remove event listener
    alert("movement5");
    if(this!=null){
      this.removeEventListener('click',movement5)
      this.removeEventListener('click',movement6)
      this.removeEventListener('click',movement7)
      this.removeEventListener('click',movement8)
    }
    if((xl<n&&xl>=0)&&y1<n-1){
      ttl.style.backgroundColor = "black";//runs error check logic likely all run error
      ttl.removeEventListener('click',movement1);
      }
      if(xr<n && xr>=0&&y1<n&&y1>=0){
      ttr.style.backgroundColor = "black";
      ttr.removeEventListener('click',movement2);
      }
      if(xl>=0 && xl<n&&y2>=0&&y2<n){
        tdl.style.backgroundColor = "black";
        tdl.removeEventListener('click',movement3);
        }
        if(xr<n&&xr>=0&&y2>=0&&y2<n){
        tdr.style.backgroundColor = "black";
        tdr.removeEventListener('click',movement4)
        }
   
    jumpMovementKing(this,td,ttr,Xval,Yval,color); // check inputs on king
    
  }
  function movement6(){
    alert("movement6");
    if(this!=null){
      this.removeEventListener('click',movement5)
      this.removeEventListener('click',movement6)
      this.removeEventListener('click',movement7)
      this.removeEventListener('click',movement8)
    }
    if((xl<n&&xl>=0)&&y1<n-1){
      ttl.style.backgroundColor = "black";//runs error check logic likely all run error
      ttl.removeEventListener('click',movement1);
      }
      if(xr<n && xr>=0&&y1<n&&y1>=0){
      ttr.style.backgroundColor = "black";
      ttr.removeEventListener('click',movement2);
      }
      if(xl>=0 && xl<n&&y2>=0&&y2<n){
        tdl.style.backgroundColor = "black";
        tdl.removeEventListener('click',movement3);
        }
        if(xr<n&&xr>=0&&y2>=0&&y2<n){
        tdr.style.backgroundColor = "black";
        tdr.removeEventListener('click',movement4)
        }
        jumpMovementKing(this,td,ttl,Xval,Yval,color);
    
  }
  function movement7(){
    alert("movement7");
    if(this!=null){
      this.removeEventListener('click',movement5)
      this.removeEventListener('click',movement6)
      this.removeEventListener('click',movement7)
      this.removeEventListener('click',movement8)
    }
    if((xl<n&&xl>=0)&&y1<n-1){
      ttl.style.backgroundColor = "black";//runs error check logic likely all run error
      ttl.removeEventListener('click',movement1);
      }
      if(xr<n && xr>=0&&y1<n&&y1>=0){
      ttr.style.backgroundColor = "black";
      ttr.removeEventListener('click',movement2);
      }
      if(xl>=0 && xl<n&&y2>=0&&y2<n){
        tdl.style.backgroundColor = "black";
        tdl.removeEventListener('click',movement3);
        }
        if(xr<n&&xr>=0&&y2>=0&&y2<n){
        tdr.style.backgroundColor = "black";
        tdr.removeEventListener('click',movement4)
        }
        jumpMovementKing(this,td,tdl,Xval,Yval,color);
    
  }
  function movement8(){
    alert("movement8");
    if(this!=null){
      this.removeEventListener('click',movement5)
      this.removeEventListener('click',movement6)
      this.removeEventListener('click',movement7)
      this.removeEventListener('click',movement8)
    }
    if((xl<n&&xl>=0)&&y1<n-1){
      ttl.style.backgroundColor = "black";
      ttl.removeEventListener('click',movement1);
      }
      if(xr<n && xr>=0&&y1<n&&y1>=0){
      ttr.style.backgroundColor = "black";
      ttr.removeEventListener('click',movement2);
      }
      if(xl>=0 && xl<n&&y2>=0&&y2<n){
        tdl.style.backgroundColor = "black";
        tdl.removeEventListener('click',movement3);
        }
        if(xr<n&&xr>=0&&y2>=0&&y2<n){
        tdr.style.backgroundColor = "black";
        tdr.removeEventListener('click',movement4)
        }
        jumpMovementKing(this,td,tdr,Xval,Yval,color);
    
  }


  if((xl<n&&xl>=0)&&y1<n-1){
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


//add movements 4-8 for jump movement, copy and paste of previous jump movement but doubled



if (existingPieceTR != null && existingPieceTL != null) { // needs removing of second jump square and event listener
  if (childElement1) { // checks if piece on the left is the same color to see if jump is needed
    console.log("topRightBoth: " )
    console.log(ttr);
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
        tj.style.backgroundColor = "blue";
        tj.addEventListener('click',movement5);
        }
      }
    }
    }
  if (childElement2) { // checks if piece on the left is the same color to see if jump is needed
    console.log("topLeftBoth: ")
    console.log(ttl);
    let circleElement = childElement2.firstChild;
    let circleColor = circleElement.getAttribute('fill');
    if(circleColor != color){
      let zT = xl-1;
      let yt = y1-1;
      tj = document.getElementById(zT+','+yt);
      let tj1 = document.getElementById(zT+'s'+yt);
      if(tj1 == null){ // if no piece is being the piece trying to jump
        if(tj!=null){
          Xval = zT;
          Yval = yt;
        tj.style.backgroundColor = "blue";
        tj.addEventListener('click',movement6);
        }
      }
    }
    }
  }
  else if (existingPieceTR != null) { // needs removing of second jump square and event listener
    if (childElement1) { // checks if piece on the left is the same color to see if jump is needed
      console.log("topRight: ")
      console.log(ttr);
      let circleElement = childElement1.firstChild;
      let circleColor = circleElement.getAttribute('fill');
      if(circleColor != color){
        let zT = xr+1;
        let yt = y1-1;
        tj = document.getElementById(zT+','+yt);
        console.log(tj);
        let tj1 = document.getElementById(zT+'s'+yt);
        if(tj1 == null){ // if no piece is being the piece trying to jump
          if(tj!=null){
            Xval = zT;
            Yval = yt;
        //    alert("yt: " + yt +"<br>" + "zt: " +zT);
          tj.style.backgroundColor = "blue";
          tj.addEventListener('click',movement5);
          }
        }
      }
      }
      if((xl<n&&xl>=0)&&y1<n-1){
        console.log(ttl);
        ttl.style.backgroundColor = "blue";
        ttl.addEventListener('click',movement1);
      }
    }
    else if( existingPieceTL!=null){
      console.log("topLeft");
      console.log(ttl );
        if (childElement2) { // checks if piece on the left is the same color to see if jump is needed
          let circleElement = childElement2.firstChild;
          let circleColor = circleElement.getAttribute('fill');
          if(circleColor != color){
            let zT = xl-1;
            let yt = y1-1;
            tj = document.getElementById(zT+','+yt);
            let tj1 = document.getElementById(zT+'s'+yt);
            if(tj1 == null){ // if no piece is being the piece trying to jump
              if(tj!=null){
                Xval = zT;
                Yval = yt;
                alert("yt: " + yt +"<br>" + "zt: " +zT);
              tj.style.backgroundColor = "blue";
              tj.addEventListener('click',movement6);
              }
            }
          }
          }
          if(xr<n && xr>=0&&y1<n&&y1>=0){
            ttr.style.backgroundColor = "blue";
            ttr.addEventListener('click',movement2);
            }
        }
if(existingPieceBL!=null&&existingPieceBR!=null){
    if (childElement3) { // checks if piece on the left is the same color to see if jump is needed
      let circleElement = childElement3.firstChild;
      let circleColor = circleElement.getAttribute('fill');
      if(circleColor != color){
        let zT = xr+1;
        let yt = y2+1;
        tj = document.getElementById(zT+','+yt);
        let tj1 = document.getElementById(zT+'s'+yt);
        if(tj1 == null){ // if no piece is being the piece trying to jump
          if(tj!=null){
            Xval = zT;
            Yval = yt;
          //  alert("yt: " + yt +"<br>" + "zt: " +zT);
          tj.style.backgroundColor = "blue";
          tj.addEventListener('click',movement7);
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
          tj = document.getElementById(zT+','+yt);
          let tj1 = document.getElementById(zT+'s'+yt);
          if(tj1 == null){ // if no piece is being the piece trying to jump
            if(tj!=null){
              Xval = zT;
              Yval = yt;
            //  alert("yt: " + yt +"<br>" + "zt: " +zT);
            tj.style.backgroundColor = "blue";
            tj.addEventListener('click',movement8);
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
        tj = document.getElementById(zT+','+yt);
        let tj1 = document.getElementById(zT+'s'+yt);
        if(tj1 == null){ // if no piece is being the piece trying to jump
          if(tj!=null){
            Xval = zT;
            Yval = yt;
         //   alert("yt: " + yt +"<br>" + "zt: " +zT);
          tj.style.backgroundColor = "blue";
          tj.addEventListener('click',movement7);
          }
        }
      }
      }
      if(tdr!=null){
        tdr.style.backgroundColor = "blue";
        tdr.addEventListener('click',movement4)
        }

}
      else if(existingPieceBR!=null){
    if (childElement3) { // checks if piece on the left is the same color to see if jump is needed
      let circleElement = childElement3.firstChild;
      let circleColor = circleElement.getAttribute('fill');
      if(circleColor != color){
        let zT = xr+1;
        let yt = y2+1;
        tj = document.getElementById(zT+','+yt);
        let tj1 = document.getElementById(zT+'s'+yt);
        if(tj1 == null){ // if no piece is being the piece trying to jump
          if(tj!=null){
            Xval = zT;
            Yval = yt;
             alert("yt: " + yt +"<br>" + "zt: " +zT);
          tj.style.backgroundColor = "blue";
          tj.addEventListener('click',movement8);
          }
        }
      }
      }
        if(tdl!=null){
          tdl.style.backgroundColor = "blue";
          tdl.addEventListener('click',movement3);
          }
    }
if(existingPieceBL==null&&existingPieceBR==null){
  console.log("bottompiece");
  if(tdl!=null){
    tdl.style.backgroundColor = "blue";
    tdl.addEventListener('click',movement3);
    var childElement3 = tdl.firstChild; 
    }
    if(tdr!=null){
    tdr.style.backgroundColor = "blue";
    tdr.addEventListener('click',movement4)
    var childElement4 = tdr.firstChild; 
    }
}
if (existingPieceTR== null && existingPieceTL== null) {
  console.log("topPiece");
  if(ttl!=null){
    ttl.style.backgroundColor = "blue";
    ttl.addEventListener('click',movement1);
    var childElement1 = ttl.firstChild; 
    }
    if(ttr!=null){
    ttr.style.backgroundColor = "blue";
    ttr.addEventListener('click',movement2);
    var childElement2 = ttr.firstChild; 
    }
}
else if(existingPieceBL==null&&existingPieceBR==null&&existingPieceTL==null&&existingPieceTR==null){
    console.log("allpieces")
      if(ttl!=null){
        ttl.style.backgroundColor = "blue";
        ttl.addEventListener('click',movement1);
        var childElement1 = ttl.firstChild; 
        }
        if(ttr!=null){
        ttr.style.backgroundColor = "blue";
        ttr.addEventListener('click',movement2);
        var childElement2 = ttr.firstChild; 
        }
        if(tdl!=null){
        tdl.style.backgroundColor = "blue";
        tdl.addEventListener('click',movement3);
        var childElement3 = tdl.firstChild; 
        }
        if(tdr!=null){
        tdr.style.backgroundColor = "blue";
        tdr.addEventListener('click',movement4)
        var childElement4 = tdr.firstChild; 
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
function jumpMovementKing(tdest, td, tj, x, y, color) {
  // Remove event listeners before removing child elements
  if (color === "white") {
    tj.removeEventListener('click', tj.grayMove); // removes event listener of piece being jumped
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
    currentPlayer = "black"; 

      kingWHite(tdest, xDest, yDest);
      currentPlayer = "black"; 
      tdest.removeEventListener('click', tdest.whiteMove); 
      tdest.whiteMove = function() {
        kingMovement(yDest, xDest,"white");
      }
      tdest.addEventListener('click', tdest.whiteMove);
  
  
  } else if (color === "gray") {
   
    currentPlayer = "white"; 
  
    kingBlack(tdest, xDest, yDest);
    tdest.removeEventListener('click', tdest.grayMove);
    tdest.grayMove = function () {
      kingMovement(yDest, xDest, "gray");
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
