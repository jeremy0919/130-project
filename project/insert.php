<?php
include("databaseT.php"); // should work
if(isset($_POST["moves"])){
    $moves = $_POST["moves"];
}
if(isset($_POST["pieces"])){
    $pieces = $_POST["pieces"];
}
if(isset($_POST["time"])){
    $time = $_POST["time"];
}
if(isset($_POST["win"])){
    $win = $_POST["win"];
}
if((isset($_POST["moves"]))&&(isset($_POST["pieces"]))&&(isset($_POST["time"]))&&(isset($_POST["wins"]))&&(isset($_COOKIE['user_id']))){
$tbName = $_COOKIE['user_id'];
$sql = "INSERT INTO $tbName (`id`, `moves`, `pieces`, `time`, `win`) 
VALUES (NULL, '$moves', '$pieces', '$time', '$win')";
mysqli_query($connection,$sql);
}
$connection->close();

?>