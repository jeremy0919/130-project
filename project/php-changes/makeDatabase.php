<?php

if(isset($_POST["makeDatabase"])){
    echo("doing things");
$db_server_name = "localhost";
$db_username = "root";
$db_password = "";
$db_name = "pokemon1"; 

// Try to establish a connection
$connection = new mysqli($db_server_name, $db_username, $db_password);

// Check connection
if ($connection ->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Create database
$sql = "CREATE DATABASE pokemon1";
if ($connection ->query($sql) === TRUE) {
  echo "Database created successfully";
} else {
  echo "Error creating database: " . $connection ->error;
}

$connection ->close();
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

        <input type="submit" name="makeDatabase" value="make database and table">
    </form>
</body>
</html>