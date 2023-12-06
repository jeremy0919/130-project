<?php
//consolidated into one file that makes database table and fills it, if any fails there are seperate files to make and fill table
if(isset($_POST["makeDatabase"])){
    echo("doing things");
$db_server_name = "localhost";
$db_username = "root";
$db_password = "";
$db_name = "Checkers"; 

// Try to establish a connection
$connection = new mysqli($db_server_name, $db_username, $db_password);

// Check connection
if ($connection ->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Create database
$sql = "CREATE DATABASE Checkers";
if ($connection ->query($sql) === TRUE) {
  echo "Database created successfully";
} else {
  echo "Error creating database: " . $connection ->error;
}

//table seection

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
  header("index.html");
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="makeDatabase.php" method="post" >

        <input type="submit" name="makeDatabase" value="make database">
    </form>
</body>
</html>