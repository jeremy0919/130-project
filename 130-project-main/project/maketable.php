<?php
   include("databaseT.php");
//rework database to include moves and games if needed, create database per player?? 
//javscript now includes nummoves object for playerstats.c1/c2.nummoves
$sql = "CREATE TABLE leaderboards ( 
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(20) NOT NULL,
  password varchar(50) NOT NULL,
  gamesPlayed INT NOT NULL,
  wins INT NOT NULL,
  losses INT NOT NULL,
  winRate INT NOT NULL,
  timePlayed INT NOT NULL
)";

if ($connection->query($sql) === TRUE) {
    echo "Table leaderboards created successfully";
  } else {
    echo "Error creating table: " . $connection->error;
  }


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