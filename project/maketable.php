<?php
   include("databaseT.php");

$sql = "CREATE TABLE leaderboards (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(20) NOT NULL,
  password VARCHAR(20) NOT NULL,
  gamesPlayed INT NOT NULL,
  wins INT NOT NULL,
  losses INT NOT NULL,
  winRate INT NOT NULL
)";

if ($connection->query($sql) === TRUE) {
    echo "Table leaderboards created successfully";
  } else {
    echo "Error creating table: " . $connection->error;
  }
  $connection->close();
?>