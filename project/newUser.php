<?php

include("databaseT.php");

    
if( isset($_POST['Sname'] )&& isset($_POST['password'])){ // somethings buggy
   $name = trim($_POST['Sname']);
   $password = trim($_POST['password']);
    $stmt = $connection->prepare("SELECT * FROM leaderboards WHERE name = ?");
    $stmt->bind_param("s", $name);
    $stmt->execute();
    
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        Echo("account already exits");
    } else {
        // Name not found in the database, do something else
            $sql = "INSERT INTO `leaderboards` (`id`, `name`, `password`, `gamesPlayed`, `wins`, `losses`, `winRate`) 
            VALUES (NULL, '$name','$password','0','0','0','0')";
            mysqli_query($connection,$sql);
        
        }
    
    $stmt->close();
    $connection->close();
    }
    header('Location: checkers.html');
?>