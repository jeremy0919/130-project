<?php
// accesses session variables and encodes them for game, uses preset values if colors arent set
session_start();
if(isset($_SESSION["color1"])){
    $color1 = $_SESSION["color1"];
}else{
    $color1 = "gray";
}
if(isset($_SESSION["color2"])){
    $color2 = $_SESSION["color2"];
}else{
    $color2 = "white";
}
if (isset($_SESSION["size"])) {
    $size = (int)$_SESSION["size"];
} else {
    $size = 10;
}
if(isset($_SESSION["bg1"])){
    $bg1 = $_SESSION["bg1"];
}else{
    $bg1 = "red";
}
if(isset($_SESSION["bg2"])){
    $bg2 = $_SESSION["bg2"];
}else{
    $bg2 = "black";
}
if(isset($_SESSION["setTime"])){
    $setTime = $_SESSION["setTime"];
}else{
    $setTime = "1800";
}


$data = array(
    "color1" => $color1,
    "color2" => $color2,
    "size"   => $size,
    "bg1"    => $bg1,
    "bg2"    => $bg2,
    "setTime" =>$setTime
);

echo json_encode($data);
?>