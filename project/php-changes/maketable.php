<?php
   include("databaseT.php");

$sql = "CREATE TABLE Pokedex4 (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(20) NOT NULL,
  type VARCHAR(20) NOT NULL,
  ShinyColor VARCHAR(20) NOT NULL,
  stage INT NOT NULL,
  CanEvolve BIT NOT NULL,
  size VARCHAR(20) NOT NULL,
  weakTo VARCHAR(20) NOT NULL,
  image BLOB
)";

if ($connection->query($sql) === TRUE) {
    echo "Table Pokedex1 created successfully";
  } else {
    echo "Error creating table: " . $connection->error;
  }
  $connection->close();
?>