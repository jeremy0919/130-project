function createTable(){
    //discover why remove event listener isnt working

/*
current notes: x and y are flipped for id making it confusing 
new click function is supposed to go through and change any blue color to black
likely gonna have it then remove event listeners just in case

*/


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
function MovePiece(y, x, color) {
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
  let tdb = document.getElementById(x + "," + y1);
  x = x - 1;
  let z1 = x;
  let td = document.getElementById(x + "," + y);

  var existingPieceL = document.getElementById(z1 + 's' + y);

  x = x + 2;
  let td2 = document.getElementById(x + "," + y);
  
  let z2 = x;

  var existingPieceR = document.getElementById(z2 + 's' + y);
  if (existingPieceR != null && existingPieceL != null) {
    return;
  } else if (existingPieceL != null) {
    td2.style.backgroundColor = "blue";
    td2.addEventListener('click', movement2);
  } else if (existingPieceR != null) {
    td.style.backgroundColor = "blue";
    td.addEventListener('click', movement1);
  } else if (existingPieceR == null && existingPieceL == null) {
    td.style.backgroundColor = "blue";
    td2.style.backgroundColor = "blue";
 //   td.addEventListener('click', movement1);
   // td2.addEventListener('click', movement2);
  function movement1() {
    finishMovement(this, tdb, color, x1, z1, y1);
    td.removeEventListener('click', movement1);
    td.style.backgroundColor = "black";
    td2.style.backgroundColor = "black";
  }

  function movement2() {
    finishMovement(this, tdb, color, x1, z2, y1);
    td2.removeEventListener('click', movement2);
    td.style.backgroundColor = "black";
    td2.style.backgroundColor = "black";
  }

  td.addEventListener('click', movement1);
  td2.addEventListener('click', movement2);
}
}

function finishMovement(td, tdb, color, x1, x, y) {
  var removetab = document.getElementById(x1 + 's' + y);

  if (removetab != null) {
    var parentEl1 = removetab.parentElement;
    parentEl1.removeChild(removetab);
  }

  var existingPiece = document.getElementById(x + 's' + y);
  if (existingPiece != null) {
    var parentEl2 = existingPiece.parentElement;
    parentEl2.removeChild(existingPiece);
  }

  if (color == "white") {
    y = y - 1;
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

/*
might use php to recreate page every move, not sure
*/



function pieceWhite(td,x,y){
  //let td = document.getElementById(y+","+x);
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
 // circle.setAttribute("id",x+'c'+y);
  svg.appendChild(circle);
 // alert("PW x is "+ x+ " y is "+ y)
  svg.setAttribute("id",x+'s'+y);
  td.appendChild(svg);

}
function pieceBlack(td,x,y){
 // let td = document.getElementById(y+","+x);
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
 // circle.setAttribute("id",x+'c'+y);
  svg.appendChild(circle);
  svg.setAttribute("id",x+'s'+y);
  //alert(x+"C"+y);
  td.appendChild(svg);

}
function newClick(n,table){
  /*
  let b = table;
 
  for(let i =0; i<n;++i){
    var trd = b.tr[i];
   // var tdl = tr.getElementsByTagName("td").length;
    
    for(j=0;j<n;j++){
      let td = trd.td[j];
      if(td.backgroundColor =="blue"){
        td.backgroundColor = "black";
      }
    }
  }
*/
}