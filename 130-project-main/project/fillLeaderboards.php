<?php
include("databaseT.php");

$sql = "INSERT INTO `leaderboards` (`id`, `name`,`password`,  `gamesPlayed`, `wins`, `losses`, `winRate`, `timePlayed`) 
VALUES (NULL, 'john', 'password', '349', '173', '176', '49', '10470')";
mysqli_query($connection, $sql);

$sql = "INSERT INTO `leaderboards` (`id`, `name`,`password`,  `gamesPlayed`, `wins`, `losses`, `winRate`, `timePlayed`) 
VALUES (NULL, 'magnus', 'password',  '213', '48', '265', '23', '6758')";
mysqli_query($connection, $sql);

$sql = "INSERT INTO `leaderboards` (`id`, `name`,`password`, `gamesPlayed`, `wins`, `losses`, `winRate`, `timePlayed`) 
VALUES (NULL, 'juliet','password',  '735', '298', '437', '40', '22739')";
mysqli_query($connection, $sql);

$sql = "INSERT INTO `leaderboards` (`id`, `name`, `password`, `gamesPlayed`, `wins`, `losses`, `winRate`, `timePlayed`) 
VALUES (NULL, 'isabella', 'password', '329', '100', '229', '30', '8932')";
mysqli_query($connection, $sql);

$sql = "INSERT INTO `leaderboards` (`id`, `name`,`password`,  `gamesPlayed`, `wins`, `losses`, `winRate`, `timePlayed`) 
VALUES (NULL, 'anthony','password',  '12', '11', '1', '92', '600')";
mysqli_query($connection, $sql);

$connection->close();
header('location: index.html');
?>
