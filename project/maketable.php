<?php
   include("databaseT.php");
//rework database to include moves and games if needed, create database per player?? 
//javscript now includes nummoves object for playerstats.c1/c2.nummoves
$sql = "CREATE TABLE leaderboards1 ( 
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(20) NOT NULL,
  password VARCHAR(20) NOT NULL,
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
  $connection->close();
?>