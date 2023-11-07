var currentPlayer = "white";
var lastClickedx = null;
var lastclickedy = null;
var lastclickedC = null;
var lastclickID1 = null;
var lastclickID2 = null;
var lastclickID3 = null;
var lastclickID4 = null;
var n = 10;
blackPieces = n*3/2;
whitePieces = n*3/2;
function createTable(){
  /*
  just needs removal of king event listeners when another click is called
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
  let td = document.getElementById(x+','+y);
  if(lastClickedx!=x||lastclickedy!=y&&lastclickedC==color){
    console.log("lastClicked")
      if(lastclickID1!=null){
      lastclickID1.style.backgroundColor = "black";
      lastclickID1.removeEventListener('click', lastclickID1.jmove);
      }
      if(lastclickID2!=null){
      lastclickID2.style.backgroundColor = "black";
      lastclickID2.removeEventListener('click', lastclickID2.jmove);
      }
      if(lastclickID3!=null){
        lastclickID3.style.backgroundColor = "black";
        lastclickID3.removeEventListener('click', lastclickID3.jmove);
      }
      if(lastclickID4!=null){
        lastclickID4.style.backgroundColor = "black";
        lastclickID4.removeEventListener('click', lastclickID4.jmove);
      }
    lastClickedx = x;
    lastclickedy = y;
    lastclickedC = color;
    MovePiece(y,x,color);
  }
  else{
  let king = td.attributes.isking;
  if(king == 0){
  let y1 = y; // call piece clicked here, store data to last piece clicked, if different piece is clicked
  if(currentPlayer == "white"){ // remove event listeners from last piece clicked
  if (color == "white") { // set last piece as global vars, set to null at the end of movement functions
    y = y - 1;
    highlight(x, y, y1, color); //still need to remove event listeners
  }
}
if(currentPlayer == "gray"){
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
  lastClickedx = x;
  lastclickedy = y;
  lastclickedC = color;
}

function highlight(x, y, y1, color) {
  let x1 = x;
  var tj = null;
  var tj2 = null;
  let tdb = document.getElementById(x + "," + y1); // gets origional piece location
  x = x - 1;
  let z1 = x;
  let td = document.getElementById(x + "," + y); // gets left board location


  var existingPieceL = document.getElementById(z1 + 's' + y); // gets piece id on left

  x = x + 2;
  //alert("td2 x1: " +x+" y: "+y  );
  let td2 = document.getElementById(x + "," + y);// gets right board location
  lastclickID1 = td;
  lastclickID2 = td2;
  let z2 = x;
 
  var Rdata = document.getElementById(z2 + ',' + y); 
  var Ldata = document.getElementById(z1 + ',' + y);
  function movement1() { // moves left and calls finish movement
    if(tj2!=null){
      tj2.removeEventListener('click', tj2.jmove);
      tj2.style.backgroundColor = "black";
    } 
    if(z2>=0&&z2<n){
      td2.removeEventListener('click', td2.jmove);
      td2.style.backgroundColor = "black";
      }
      if(z1<n&&z1>=0){
      td.removeEventListener('click', td.jmove);
      td.style.backgroundColor = "black";
      }
    if(tj!=null){
      tj.removeEventListener('click', tj.jmove);
      tj.style.backgroundColor = "black";
    }
    finishMovement(td, tdb, color, x1, z1, y1);
  }

  function movement2() {// moves right and calls finish movement
    if(tj2!=null){
      tj2.removeEventListener('click', tj2.jmove);
      tj2.style.backgroundColor = "black";
    } 
    if(z2<n&&z2>=0){
    td2.removeEventListener('click', td2.jmove);
    td2.style.backgroundColor = "black";
    }
    if(z1>=0&&z1<n){
    td.removeEventListener('click', td.jmove);
    td.style.backgroundColor = "black";
    }
    if(tj!=null){
      tj.removeEventListener('click', tj.jmove);
      tj.style.backgroundColor = "black";
    }
   
    finishMovement(td2, tdb, color, x1, z2, y1);
  }
  function movement3() { // jump movement
    lastclickID3 = tj;
    if(tj!=null){
      tj.removeEventListener('click', tj.jmove);
      tj.style.backgroundColor = "black";
    } 
    if(tj2!=null){
      tj2.removeEventListener('click', tj2.jmove);
      tj2.style.backgroundColor = "black";
    } 
    if(td2!=null){
      td2.removeEventListener('click', td2.jmove);
      td2.style.backgroundColor = "black";
      }
      if(td!=null){
      td.removeEventListener('click', td.jmove);
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
    tj.style.backgroundColor = 'black';
  
    let temp = z1-1;
    if (color === "white") {
      y -= 1;
    } else if (color === "gray") {
      y += 1;
    }
    jumpMovement(tj,tdb,Ldata,temp,y,color); // should work
   
  }
  function movement4() { // jump movement
   
    if(tj!=null){
      tj.removeEventListener('click', tj.jmove);
      tj.style.backgroundColor = "black";
    } 

    if(tj2!=null){
      tj2.removeEventListener('click', tj2.jmove);
      tj2.style.backgroundColor = "black";
    } 
    if(td2!=null){
      td2.removeEventListener('click', td2.jmove);
      td2.style.backgroundColor = "black";
      }
      if(td!=null){
      td.removeEventListener('click', td.jmove);
      td.style.backgroundColor = "black";
      }
    if(color=="gray"){
      if(Rdata!=null){
      Rdata.removeEventListener('click', Rdata.whiteMove); 
      }
    }
    else if(color=="white"){
      if(Ldata!=null){
      Ldata.removeEventListener('click', Ldata.grayMove); 
      }
    }
    tj.style.backgroundColor = 'black';

    let temp = z2+1;
    if (color === "white") {
      y -= 1;
    } else if (color === "gray") {
      y += 1;
    }
    jumpMovement(tj,tdb,Rdata,temp,y,color);
    
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
       // delta1 = tj;
        tj2 = document.getElementById(zT+','+yt);
        lastclickID4 = document.getElementById(zT+','+yt);
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
        if(color == 'gray'){ // if it can jump increments y accordingly
          yt = yt + 1;
        }
        if(color == 'white'){
          yt = yt - 1;
        }
        lastclickID3 = document.getElementById(zT+','+yt);
        tj = document.getElementById(zT+','+yt);
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
      if(color == 'gray'){ // if it can jump increments y accordingly
        yt = yt + 1;
      }
      if(color == 'white'){
        yt = yt - 1;
      }
      lastclickID3 = document.getElementById(zT+','+yt);
      tj = document.getElementById(zT+','+yt);
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
        if(color == 'gray'){// if it can jump increments y accordingly
          yt = yt + 1;
        }
        if(color == 'white'){
          yt = yt - 1;
        }
        lastclickID4 = document.getElementById(zT+','+yt);
        tj2 = document.getElementById(zT+','+yt);
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
    
   //alert("z2: "+ z2);
  // alert("z1: "+z1);
    if(z2<n&&z2>=0){
    td2.style.backgroundColor = "blue";
    td2.jmove = function(){
    movement2();
    }
    td2.addEventListener('click', td2.jmove);
  
    }
    if(z1>=0&&z1<n){
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

  if (color === "white") {
    tj.removeEventListener('click', tj.grayMove);
    tj.removeEventListener('click', tj.jmove);
  } else if (color === "gray") {
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

  if (color === "white") {
  
    if(yDest ==0){
      kingWHite(tdest, xDest, yDest);
      blackPieces = blackPieces-1;
      currentPlayer = "gray"; 
      tdest.removeEventListener('click', tdest.whiteMove); 
      tdest.removeEventListener('click', tdest.jmove); 
      tdest.whiteMove = function() {
        kingMovement(yDest, xDest,"white");
      }
      tdest.addEventListener('click', tdest.whiteMove);

  }
   else{
    pieceWhite(tdest, xDest, yDest);
    blackPieces = blackPieces-1;
    tdest.removeEventListener('click', tdest.whiteMove);
    tdest.removeEventListener('click', tdest.jmove); 
    if(canDoubleJump(tdest,xDest,yDest,color)){

      dobuleJump(xDest,yDest,color);
    }
    else{

    tdest.whiteMove = function () {
      MovePiece(yDest, xDest, "white");
    };
    tdest.addEventListener('click', tdest.whiteMove);
    currentPlayer = "gray"; 
  }
  }
  } else if (color === "gray") {
   
   
    if(yDest == n-1){
      kingBlack(tdest,xDest,yDest);
      whitePieces = whitePieces-1;
      currentPlayer = "white"; 
      tdest.removeEventListener('click', tdest.grayMove); 
      tdest.removeEventListener('click', tdest.jmove); 
      tdest.grayMove = function() {
        kingMovement(yDest, xDest,"gray");
      }
      tdest.addEventListener('click', tdest.grayMove);
    }
    else{
    pieceBlack(tdest, xDest, yDest);
    whitePieces = whitePieces-1;
    tdest.removeEventListener('click', tdest.grayMove);
    tdest.removeEventListener('click', tdest.jmove); 
    if(canDoubleJump(tdest,xDest,yDest,color)){

      dobuleJump(xDest,yDest,color);
      
    }
    else{
      currentPlayer = "white"; 
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
  tj.removeEventListener('click', tdest.jmove); 
  td.removeEventListener('click', tdest.jmove); 
  // Remove the jump destination's background color
  if(canDoubleJump(tdest,xDest,yDest,color)==false){
  tdest.style.backgroundColor = 'black';
  }

  // Update the background color of td and tj
  td.style.backgroundColor = 'black';
  tj.style.backgroundColor = 'black';
  Wincondtion();
}

function canDoubleJump(tdest,x,y,color){
  let bool = false;
  let x1=0;
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
    this.style.backgroundColor = "black";
  
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
      currentPlayer = "gray";
   //   tdb.removeEventListener('click', tdb.whiteMove); 
      td.whiteMove = function() {
        MovePiece(y, x,"white");
      }
      td.addEventListener('click', td.whiteMove);
    }
  }
  function moveJ1(){

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
     
      this.removeEventListener('click',moveJ2);
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
            tj2.style.backgroundColor = "blue";
            tj2.addEventListener('click',moveJ2);
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

  if (color == "white") {
    y = y - 1; //places pieces at new lcoation and removes and adds event listeners accordingly
      if(y ==0){
        kingWHite(td, x, y);
        currentPlayer = "gray"; 
        tdb.removeEventListener('click', tdb.whiteMove); 
        td.removeEventListener("click",td.jmove);
        td.whiteMove = function() {
          kingMovement(y, x,"white");
        }
        td.addEventListener('click', td.whiteMove);
      }
    else{
    pieceWhite(td, x, y);
    currentPlayer = "gray"; 
    tdb.removeEventListener('click', tdb.whiteMove); 
    td.removeEventListener("click",td.jmove);
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
      td.removeEventListener("click",td.jmove);
      td.grayMove = function() {
        kingMovement(y, x,"gray");
      }
      td.addEventListener('click', td.grayMove);
    }
    else{
      pieceBlack(td,x,y);
    tdb.removeEventListener('click', tdb.grayMove); 
    td.removeEventListener("click",td.jmove);
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

  if(color!=currentPlayer){
    return;
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
  var tj5 =null;
  var tj6= null;
  var tj7 = null;
  var tj8 = null;
  var tj9 = null;
  var tj10 = null;
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

 

  function movement1() { // moves left and calls finish movement
    // add in remove event listener calls and change color
    kingFinishMovement(this, td, color,x,y, xl,y1);
    if(ttl!=null){
      ttl.style.backgroundColor = "black";//runs error check logic likely all run error
      ttl.removeEventListener('click',movement1);
      }
      if(ttr!=null){
      ttr.style.backgroundColor = "black";
      ttr.removeEventListener('click',movement2);
      }
      if(tdl!=null){
        tdl.style.backgroundColor = "black";
        tdl.removeEventListener('click',movement3);
        }
        if(tdr!=null){
        tdr.style.backgroundColor = "black";
        tdr.removeEventListener('click',movement4);
        }
     
        if(tj!=null){
          tj.removeEventListener("click",movement6);
          tj.style.backgroundColor = "black";
        }
        if(tj4!=null){
          tj4.removeEventListener("click",movement6);
          tj4.style.backgroundColor = "black";
        }
        if(tj5!=null){
          tj5.removeEventListener("click",movement5);
          tj5.style.backgroundColor = "black";
        }
        if(tj6!=null){
          tj6.removeEventListener("click",movement6);
          tj6.style.backgroundColor = "black";
        }
        if(tj7!=null){
          tj7.removeEventListener("click",movement7);
          tj7.style.backgroundColor = "black";
        }
        if(tj8!=null){
          tj8.removeEventListener("click",movement8);
          tj8.style.backgroundColor = "black";
        }
        if(tj9 !=null){
          tj9.removeEventListener("click",movement7);
          tj9.style.backgroundColor = "black";
        }
        if(tj10!=null){
          tj10.removeEventListener("click",movement8);
          tj10.style.backgroundColor = "black";
        }
  }
  function movement2() { // moves left and calls finish movement
 
    kingFinishMovement(this, td, color,x,y, xr,y1);
    if(ttl!=null){
      ttl.style.backgroundColor = "black";//runs error check logic likely all run error
      ttl.removeEventListener('click',movement1);
      }
      if(ttr!=null){
      ttr.style.backgroundColor = "black";
      ttr.removeEventListener('click',movement2);
      }
      if(tdl!=null){
        tdl.style.backgroundColor = "black";
        tdl.removeEventListener('click',movement3);
        }
        if(tdr!=null){
        tdr.style.backgroundColor = "black";
        tdr.removeEventListener('click',movement4)
        }
       
        if(tj!=null){
          tj.removeEventListener("click",movement6);
          tj.style.backgroundColor = "black";
        }
        if(tj4!=null){
          tj4.removeEventListener("click",movement6);
          tj4.style.backgroundColor = "black";
        }
        if(tj5!=null){
          tj5.removeEventListener("click",movement5);
          tj5.style.backgroundColor = "black";
        }
        if(tj6!=null){
          tj6.removeEventListener("click",movement6);
          tj6.style.backgroundColor = "black";
        }
        if(tj7!=null){
          tj7.removeEventListener("click",movement7);
          tj7.style.backgroundColor = "black";
        }
        if(tj8!=null){
          tj8.removeEventListener("click",movement8);
          tj8.style.backgroundColor = "black";
        }
        if(tj9 !=null){
          tj9.removeEventListener("click",movement7);
          tj9.style.backgroundColor = "black";
        }
        if(tj10!=null){
          tj10.removeEventListener("click",movement8);
          tj10.style.backgroundColor = "black";
        }
  }
  function movement3() { // moves left and calls finish movement
 
    kingFinishMovement(this, td, color,x,y, xl,y2);
    if(ttl!=null){
      ttl.style.backgroundColor = "black";//runs error check logic likely all run error
      ttl.removeEventListener('click',movement1);
      }
      if(ttr!=null){
      ttr.style.backgroundColor = "black";
      ttr.removeEventListener('click',movement2);
      }
      if(tdl!=null){
        tdl.style.backgroundColor = "black";
        tdl.removeEventListener('click',movement3);
        }
        if(tdr!=null){
        tdr.style.backgroundColor = "black";
        tdr.removeEventListener('click',movement4)
        }
       
        if(tj!=null){
          tj.removeEventListener("click",movement6);
          tj.style.backgroundColor = "black";
        }
        if(tj4!=null){
          tj4.removeEventListener("click",movement6);
          tj4.style.backgroundColor = "black";
        }
        if(tj5!=null){
          tj5.removeEventListener("click",movement5);
          tj5.style.backgroundColor = "black";
        }
        if(tj6!=null){
          tj6.removeEventListener("click",movement6);
          tj6.style.backgroundColor = "black";
        }
        if(tj7!=null){
          tj7.removeEventListener("click",movement7);
          tj7.style.backgroundColor = "black";
        }
        if(tj8!=null){
          tj8.removeEventListener("click",movement8);
          tj8.style.backgroundColor = "black";
        }
        if(tj9 !=null){
          tj9.removeEventListener("click",movement7);
          tj9.style.backgroundColor = "black";
        }
        if(tj10!=null){
          tj10.removeEventListener("click",movement8);
          tj10.style.backgroundColor = "black";
        }
  }
  function movement4() { // moves left and calls finish movement
 
    kingFinishMovement(this, td, color,x,y, xr,y2);
    if(ttl!=null){
      ttl.style.backgroundColor = "black";//runs error check logic likely all run error
      ttl.removeEventListener('click',movement1);
      }
      if(ttr!=null){
      ttr.style.backgroundColor = "black";
      ttr.removeEventListener('click',movement2);
      }
      if(tdl!=null){
        tdl.style.backgroundColor = "black";
        tdl.removeEventListener('click',movement3);
        }
        if(tdr!=null){
        tdr.style.backgroundColor = "black";
        tdr.removeEventListener('click',movement4)
        }
     
      if(tj!=null){
        tj.removeEventListener("click",movement6);
        tj.style.backgroundColor = "black";
      }
      if(tj4!=null){
        tj4.removeEventListener("click",movement6);
        tj4.style.backgroundColor = "black";
      }
      if(tj5!=null){
        tj5.removeEventListener("click",movement5);
        tj5.style.backgroundColor = "black";
      }
      if(tj6!=null){
        tj6.removeEventListener("click",movement6);
        tj6.style.backgroundColor = "black";
      }
      if(tj7!=null){
        tj7.removeEventListener("click",movement7);
        tj7.style.backgroundColor = "black";
      }
      if(tj8!=null){
        tj8.removeEventListener("click",movement8);
        tj8.style.backgroundColor = "black";
      }
      if(tj9 !=null){
        tj9.removeEventListener("click",movement7);
        tj9.style.backgroundColor = "black";
      }
      if(tj10!=null){
        tj10.removeEventListener("click",movement8);
        tj10.style.backgroundColor = "black";
      }
  }
  function movement5(){ // mad broken 
  //  alert("movement5");
    if(tj!=null){
      tj.removeEventListener("click",movement6);
      tj.style.backgroundColor = "black";
    }
    if(tj4!=null){
      tj4.removeEventListener("click",movement6);
      tj4.style.backgroundColor = "black";
    }
    if(tj5!=null){
      tj5.removeEventListener("click",movement5);
      tj5.style.backgroundColor = "black";
    }
    if(tj6!=null){
      tj6.removeEventListener("click",movement6);
      tj6.style.backgroundColor = "black";
    }
    if(tj7!=null){
      tj7.removeEventListener("click",movement7);
      tj7.style.backgroundColor = "black";
    }
    if(tj8!=null){
      tj8.removeEventListener("click",movement8);
      tj8.style.backgroundColor = "black";
    }
    if(tj9 !=null){
      tj9.removeEventListener("click",movement7);
      tj9.style.backgroundColor = "black";
    }
    if(tj10!=null){
      tj10.removeEventListener("click",movement8);
      tj10.style.backgroundColor = "black";
    }
    if(ttl!=null){
      ttl.style.backgroundColor = "black";//runs error check logic likely all run error
      ttl.removeEventListener('click',movement1);
      }
      if(ttr!=null){
      ttr.style.backgroundColor = "black";
      ttr.removeEventListener('click',movement2);
      }
      if(tdl!=null){
        tdl.style.backgroundColor = "black";
        tdl.removeEventListener('click',movement3);
        }
        if(tdr!=null){
        tdr.style.backgroundColor = "black";
        tdr.removeEventListener('click',movement4)
        }
   
    jumpMovementKing(this,td,ttr,Xval,Yval,color); // check inputs on king
    
  }
  function movement6(){ // works
 //   alert("movement6");
    if(tj!=null){
      tj.removeEventListener("click",movement6);
      tj.style.backgroundColor = "black";
    }
    if(tj4!=null){
      tj4.removeEventListener("click",movement6);
      tj4.style.backgroundColor = "black";
    }
    if(tj5!=null){
      tj5.removeEventListener("click",movement5);
      tj5.style.backgroundColor = "black";
    }
    if(tj6!=null){
      tj6.removeEventListener("click",movement6);
      tj6.style.backgroundColor = "black";
    }
    if(tj7!=null){
      tj7.removeEventListener("click",movement7);
      tj7.style.backgroundColor = "black";
    }
    if(tj8!=null){
      tj8.removeEventListener("click",movement8);
      tj8.style.backgroundColor = "black";
    }
    if(tj9 !=null){
      tj9.removeEventListener("click",movement7);
      tj9.style.backgroundColor = "black";
    }
    if(tj10!=null){
      tj10.removeEventListener("click",movement8);
      tj10.style.backgroundColor = "black";
    }
    if(ttl!=null){
      ttl.style.backgroundColor = "black";//runs error check logic likely all run error
      ttl.removeEventListener('click',movement1);
      }
      if(ttr!=null){
      ttr.style.backgroundColor = "black";
      ttr.removeEventListener('click',movement2);
      }
      if(tdl!=null){
        tdl.style.backgroundColor = "black";
        tdl.removeEventListener('click',movement3);
        }
        if(tdr!=null){
        tdr.style.backgroundColor = "black";
        tdr.removeEventListener('click',movement4)
        }
        jumpMovementKing(this,td,ttl,Xval,Yval,color);
    
  }
  function movement7(){
//    alert("movement7");
    if(tj!=null){
      tj.removeEventListener("click",movement6);
      tj.style.backgroundColor = "black";
    }
    if(tj4!=null){
      tj4.removeEventListener("click",movement6);
      tj4.style.backgroundColor = "black";
    }
    if(tj5!=null){
      tj5.removeEventListener("click",movement5);
      tj5.style.backgroundColor = "black";
    }
    if(tj6!=null){
      tj6.removeEventListener("click",movement6);
      tj6.style.backgroundColor = "black";
    }
    if(tj7!=null){
      tj7.removeEventListener("click",movement7);
      tj7.style.backgroundColor = "black";
    }
    if(tj8!=null){
      tj8.removeEventListener("click",movement8);
      tj8.style.backgroundColor = "black";
    }
    if(tj9 !=null){
      tj9.removeEventListener("click",movement7);
      tj9.style.backgroundColor = "black";
    }
    if(tj10!=null){
      tj10.removeEventListener("click",movement8);
      tj10.style.backgroundColor = "black";
    }
    if(ttl!=null){
      ttl.style.backgroundColor = "black";//runs error check logic likely all run error
      ttl.removeEventListener('click',movement1);
      }
      if(ttr!=null){
      ttr.style.backgroundColor = "black";
      ttr.removeEventListener('click',movement2);
      }
      if(tdl!=null){
        tdl.style.backgroundColor = "black";
        tdl.removeEventListener('click',movement3);
        }
        if(tdr!=null){
        tdr.style.backgroundColor = "black";
        tdr.removeEventListener('click',movement4)
        }
        jumpMovementKing(this,td,tdl,Xval,Yval,color);
    
  }
  function movement8(){
 //   alert("movement8");
    if(tj!=null){
      tj.removeEventListener("click",movement6);
      tj.style.backgroundColor = "black";
    }
    if(tj4!=null){
      tj4.removeEventListener("click",movement6);
      tj4.style.backgroundColor = "black";
    }
    if(tj5!=null){
      tj5.removeEventListener("click",movement5);
      tj5.style.backgroundColor = "black";
    }
    if(tj6!=null){
      tj6.removeEventListener("click",movement6);
      tj6.style.backgroundColor = "black";
    }
    if(tj7!=null){
      tj7.removeEventListener("click",movement7);
      tj7.style.backgroundColor = "black";
    }
    if(tj8!=null){
      tj8.removeEventListener("click",movement8);
      tj8.style.backgroundColor = "black";
    }
    if(tj9 !=null){
      tj9.removeEventListener("click",movement7);
      tj9.style.backgroundColor = "black";
    }
    if(tj10!=null){
      tj10.removeEventListener("click",movement8);
      tj10.style.backgroundColor = "black";
    }
    if(ttl!=null){
      ttl.style.backgroundColor = "black";//runs error check logic likely all run error
      ttl.removeEventListener('click',movement1);
      }
      if(ttr!=null){
      ttr.style.backgroundColor = "black";
      ttr.removeEventListener('click',movement2);
      }
      if(tdl!=null){
        tdl.style.backgroundColor = "black";
        tdl.removeEventListener('click',movement3);
        }
        if(tdr!=null){
        tdr.style.backgroundColor = "black";
        tdr.removeEventListener('click',movement4)
        }
        jumpMovementKing(this,td,tdr,Xval,Yval,color);
    
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
        tj.style.backgroundColor = "blue";
        tj.addEventListener('click',movement5);
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
        tj4.style.backgroundColor = "blue";
        tj4.addEventListener('click',movement6);
        }
      }
    }
    }
  }
  else if (existingPieceTR != null) { // needs removing of second jump square and event listener
    if (childElement1) { // checks if piece on the left is the same color to see if jump is needed
   //   console.log("topRight: ")
   //   console.log(ttr);
      let circleElement = childElement1.firstChild;
      let circleColor = circleElement.getAttribute('fill');
      if(circleColor != color){
        let zT = xr+1;
        let yt = y1-1;
        tj5 = document.getElementById(zT+','+yt);
      //  console.log(tj);
        let tj1 = document.getElementById(zT+'s'+yt);
        if(tj1 == null){ // if no piece is being the piece trying to jump
          if(tj5!=null){
            Xval = zT;
            Yval = yt;
        //    alert("yt: " + yt +"<br>" + "zt: " +zT);
          tj5.style.backgroundColor = "blue";
          tj5.addEventListener('click',movement5);
          }
        }
      }
      }
      if((xl<n&&xl>=0)&&y1<n-1){
     //   console.log(ttl);
        ttl.style.backgroundColor = "blue";
        ttl.addEventListener('click',movement1);
      }
    }
    else if( existingPieceTL!=null){
    //  console.log("topLeft");
   //   console.log(ttl );
        if (childElement2) { // checks if piece on the left is the same color to see if jump is needed
          let circleElement = childElement2.firstChild;
          let circleColor = circleElement.getAttribute('fill');
          if(circleColor != color){
            let zT = xl-1;
            let yt = y1-1;
            tj6 = document.getElementById(zT+','+yt);
            let tj1 = document.getElementById(zT+'s'+yt);
            if(tj1 == null){ // if no piece is being the piece trying to jump
              if(tj6!=null){
                Xval = zT;
                Yval = yt;
                alert("yt: " + yt +"<br>" + "zt: " +zT);
              tj6.style.backgroundColor = "blue";
              tj6.addEventListener('click',movement6);
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
        tj7 = document.getElementById(zT+','+yt);
        let tj1 = document.getElementById(zT+'s'+yt);
        if(tj1 == null){ // if no piece is being the piece trying to jump
          if(tj7!=null){
            Xval = zT;
            Yval = yt;
          //  alert("yt: " + yt +"<br>" + "zt: " +zT);
          tj7.style.backgroundColor = "blue";
          tj7.addEventListener('click',movement7);
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
              Yval = yt;
            //  alert("yt: " + yt +"<br>" + "zt: " +zT);
            tj8.style.backgroundColor = "blue";
            tj8.addEventListener('click',movement8);
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
        tj9 = document.getElementById(zT+','+yt);
        let tj1 = document.getElementById(zT+'s'+yt);
        if(tj1 == null){ // if no piece is being the piece trying to jump
          if(tj9!=null){
            Xval = zT;
            Yval = yt;
         //   alert("yt: " + yt +"<br>" + "zt: " +zT);
          tj9.style.backgroundColor = "blue";
          tj9.addEventListener('click',movement7);
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
        tj10 = document.getElementById(zT+','+yt);
        let tj1 = document.getElementById(zT+'s'+yt);
        if(tj1 == null){ // if no piece is being the piece trying to jump
          if(tj10!=null){
            Xval = zT;
            Yval = yt;
          //   alert("yt: " + yt +"<br>" + "zt: " +zT);
          tj10.style.backgroundColor = "blue";
          tj10.addEventListener('click',movement8);
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
//  console.log("bottompiece");
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
//  console.log("topPiece");
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
   // console.log("allpieces")
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
  console.log("kingdoubleJump");
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
  console.log(td);
  var x1=0;
  var y1=0;
  var x2=0;
  var y2 =0;
  var x3=0;
  var y3=0;
  var x4=0;
  var y4 =0;
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
    if(tj4!=null){
      tj4.removeEventListener('click',moveJ4);
      tj4.style.backgroundColor = "black";
      }
      if(tj3!=null){
        tj3.removeEventListener('click',moveJ3);
        tj3.style.backgroundColor = "black";
        }
    if(color == "gray"){
      currentPlayer = "white"
      td.blackMove = function() {
        kingMovement(y, x,"gray");
      }
      td.addEventListener('click', td.blackMove);
    }
    if(color == "white"){
      currentPlayer = "gray";
      td.whiteMove = function() {
        kingMovement(y, x,"white");
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
    if(tj4!=null){
      tj4.removeEventListener('click',moveJ2);
      tj4.style.backgroundColor = "black";
      }
      if(tj!=null){
        tj.removeEventListener('click',moveJ2);
        tj.style.backgroundColor = "black";
        }
        if(tj3!=null){
          tj3.removeEventListener('click',moveJ2);
          tj3.style.backgroundColor = "black";
          }
    td.removeEventListener('click',moveN);
    td.style.backgroundColor = "black";
    jumpMovementKing(this,td,tr,x1,y1,color);
  }
  function moveJ2(){
    console.log("movj");
    console.log(tl);
     
      this.removeEventListener('click',moveJ2);
      this.style.backgroundColor = "black";
      if(tj!=null){
      tj.removeEventListener('click',moveJ1);
      tj.style.backgroundColor = "black";
  }
    if(tj!=null){
      tj4.removeEventListener('click',moveJ4);
      tj4.style.backgroundColor = "black";
      }
      if(tj3!=null){
        tj3.removeEventListener('click',moveJ3);
        tj3.style.backgroundColor = "black";
        }
      td.removeEventListener('click',moveN);
      td.style.backgroundColor = "black";
      jumpMovementKing(this,td,tl,x2,y2,color);
    }
    function moveJ3(){
      console.log("movj");
      console.log(tr);
        //console.log(tj);
        this.removeEventListener('click',moveJ3);
        this.style.backgroundColor = "black";
        if(tj2!=null){
          tj2.removeEventListener('click',moveJ2);
          tj2.style.backgroundColor = "black";
          }
          if(tj!=null){
            tj.removeEventListener('click',moveJ1);
            tj.style.backgroundColor = "black";
            }
            if(tj4!=null){
              tj4.removeEventListener('click',moveJ4);
              tj4.style.backgroundColor = "black";
              }
        td.removeEventListener('click',moveN);
        td.style.backgroundColor = "black";
        jumpMovementKing(this,td,br,x3,y3,color);
      }
      function moveJ4(){
        console.log("movj");
        console.log(tr);
          //console.log(tj);
          this.removeEventListener('click',moveJ4) ;
          this.style.backgroundColor = "black";
          if(tj2!=null){
          tj2.removeEventListener('click',moveJ2);
          tj2.style.backgroundColor = "black";
          }
          if(tj!=null){
            tj.removeEventListener('click',moveJ1);
            tj.style.backgroundColor = "black";
            }
            if(tj3!=null){
              tj3.removeEventListener('click',moveJ3);
              tj3.style.backgroundColor = "black";
              }
          td.removeEventListener('click',moveN);
          td.style.backgroundColor = "black";
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
    console.log(br);
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
     console.log(bl);
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
    kingWHite(tdest, xDest, yDest);
    tdest.removeEventListener('click', tdest.whiteMove); 
    if(canKingDoubleJump(tdest,xDest,yDest,color)){
      console.log("canDoubleJumpWhiteMove")
      kingdobuleJump(xDest,yDest,color);
    }
    else{
    currentPlayer = "gray"; 
      
      tdest.whiteMove = function() {
        kingMovement(yDest, xDest,"white");
      }
      tdest.addEventListener('click', tdest.whiteMove);
    }
  
  } else if (color === "gray") {
    kingBlack(tdest, xDest, yDest);
    tdest.removeEventListener('click', tdest.grayMove);
    if(canKingDoubleJump(tdest,xDest,yDest,color)){
      console.log("canDoubleJumpblackMove")
      kingdobuleJump(xDest,yDest,color);
    }
    else{
    currentPlayer = "white"; 
  
    
    tdest.grayMove = function () {
      kingMovement(yDest, xDest, "gray");
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
    tdest.style.backgroundColor = 'black';
    }

  // Update the background color of td and tj
  td.style.backgroundColor = 'black';
  tj.style.backgroundColor = 'black';
}


function Wincondtion(){
  if(blackPieces <= 0){
    alert("white wins")
  }
  if(whitePieces <= 0){
    alert("black wins")
  }

}