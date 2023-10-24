function createTable(){
  
    table = document.createElement('table');

    
    table.style.borderCollapse = "collapse";
    table.style.width = "400px";
    let n = 10;
    let tablebody = document.createElement("tbody");
    table.appendChild(tablebody);

    for(let i =0; i<n;++i){ // table row
      
        let tr = document.createElement("trow");
  
        for(let j =0; j<n; ++j){ // talbe data
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
                  newClick();
                });
            }}
            if(i%2==1){
                if(j%2 ==0){
          
                td.style.backgroundColor ="black";
                td.appendChild(input);
                td.style.height = "40px";
                td.style.width = "40px";
                td.addEventListener('click', function() { 
                  newClick();
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
              td.appendChild(svg);
              td.addEventListener('click', function() { // function for piece movement
                MovePiece(i, j,"gray");
              });
            }
            if(i>=7&&td.style.backgroundColor=="black"){
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
              td.appendChild(svg);
              td.addEventListener('click', function() { // function for piece movement
                MovePiece(i, j,"white");
              });
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
    highlight(x,y)
  }
  if(color == "gray"){
    y = y+1;
    highlight(x,y);
  }
}

function highlight(x,y){ // will highlight associated areas and add on click, will need something in case another piece is clicked to dehilight area
  x=x-1;
  let td = document.getElementById(y+","+x);
  x=x+2;
  let td2 = document.getElementById(y+","+x);
  td.style.backgroundColor ="blue";
  td2.style.backgroundColor = "blue";
 
  //highlight spaces
  //add on click attribute
  //conditional checks for movement here
  //add area for if data is king or not use color
  //remove on click attribute in next function
}

function finishMovement(x,y){ // move piece
  //place pieces in new area 
  //jump mechanics here
  //remove piece from previous area
  //remove on click
}
function newClick(){

}