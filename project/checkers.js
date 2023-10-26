function createTable(){
  //use data attribute to store piece location
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
            td.appendChild(input);
            td.style.height = "40px";
            td.style.width = "40px";
            }
                if(j%2 == 1){
                  
              td.appendChild(input);
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
                td.appendChild(input);
                td.style.height = "40px";
                td.style.width = "40px";
                td.addEventListener('click', function() { 
                  newClick(n,table);
                });
                }
                if(j%2 == 1){
               
                    td.style.backgroundColor = "red";
                    td.appendChild(input2);
                    td.style.height = "40px";
                    td.style.width = "40px";
                }
            }
            td.setAttribute("id",i + "," + j) // sets id for later use in movement
            if(i<=2&& td.style.backgroundColor=="black"){
           
              td.addEventListener('click', function() { // function for piece movement
           
                MovePiece(i, j,"gray");
              });
              pieceBlack(td,i,j);
            }
            if(i>=7&&td.style.backgroundColor=="black"){
            
              td.addEventListener('click', function() { // function for piece movement
          
                MovePiece(i, j,"white");
              });
              pieceWhite(td,i,j);
            }
            tr.appendChild(td); 
  
        }
        tablebody.appendChild(tr);
     
        
    }
    document.getElementsByClassName("table")[0].appendChild(table);
}
function MovePiece(y,x,color){ // determines y based off of color ie direction

  if(color == "white"){
    y = y-1;
    highlight(x,y,color)
  }
  if(color == "gray"){
    y = y+1;
    highlight(x,y,color);
  }
}

function highlight(x,y,color){ // will highlight associated areas and add on click, will need something in case another piece is clicked to dehilight area
  let x1 = x;
  let y1=y;
  let tdb = document.getElementById(y+","+x)
  x=x-1;
  let td = document.getElementById(y+","+x);
  x=x+2;
  let td2 = document.getElementById(y+","+x);
  td.style.backgroundColor ="blue"; // use css box shadow
  td2.style.backgroundColor = "blue";
  td.addEventListener('click', function() { // function for piece movement
    
    finishMovement(td,tdb,color,x1,y1);
    this.removeEventListener('click', MovePiece);
  });
  td2.addEventListener('click', function() { // function for piece movement
    finishMovement(td2,tdb,color,x1,y1);
    this.removeEventListener('click', MovePiece);
  });
  //highlight spaces
  //add on click attribute
  //conditional checks for movement here
  //add area for if data is king or not use color
  //remove on click attribute in next function
}

function finishMovement(td,tdb,color,x,y){ // move piece
  y = y+1;
  var removetab = document.getElementById(x+'s'+y);
  alert(" fM x is "+ x+ " y is "+ y)
  console.log(removetab)
  if(removetab!=null){
      var parentEl1 = removetab.parentElement;
      console.log(parentEl1)
          parentEl1.removeChild(removetab);
          
      }
    var removtd = document.getElementById(x+','+y);
    removtd.removeEventListener('click', MovePiece);
  if(color== "white"){
    pieceWhite(td,x,y);
    y=y+1;
  }
  if(color == "gray"){
    pieceBlack(td,x,y);
    y=y-1;

    
  }
 // alert(x+"c"+y);

      //piece removal id logic checks out not sure why its not working
  //place pieces in new area 
  //jump mechanics here
  //remove piece from previous area
  //remove on click
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
  circle.setAttribute("id",x+'c'+y);
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
  circle.setAttribute("id",x+'c'+y);
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