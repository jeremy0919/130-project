<?php
session_start();
// sets session variables for game 


if(isset ($_POST["color1"])){
    $_SESSION["color1"] = $_POST["color1"];
}
else{
    $_SESSION["color1"] = "gray";
}
if(isset ($_POST["color2"])){
    $_SESSION["color2"] = $_POST["color2"];
}
else{
    $_SESSION["color2"] = "white";
}
if(isset ($_POST["size"])){
    $_SESSION["size"]  = $_POST["size"];
}
else{
    $_SESSION["size"]  = "8";
}
if(isset ($_POST["bg1"])){
     $_SESSION["bg1"]  = $_POST["bg1"];
}
else{
    $_SESSION["bg1"] = "red";
}
if(isset ($_POST["bg2"])){
    $_SESSION["bg2"]  = $_POST["bg2"];
}
else{
    $_SESSION["bg2"] = "black";
}
if(isset ($_POST["setTime"])){
    $_SESSION["setTime"]  = $_POST["setTime"];
}
else{
    $_SESSION["setTime"] = "18000";
}
if(isset ($_POST["multiplayer"]) && isset( $_POST["singeplayer"])){
    header('Location: game.html');
}
if(!isset($_POST["multiplayer"]) && !isset( $_POST["singeplayer"])){
    header('Location: game.html');
}
if(isset ($_POST["multiplayer"])){
    header('Location: game1.html');
}
if(isset ($_POST["singleplayer"])){
    header('Location: game.html');
}
?>