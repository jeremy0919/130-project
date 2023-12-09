<?php
include("databaseT.php");

if (isset($_POST["moves"]) && isset($_POST["pieces"]) && isset($_POST["time"]) && isset($_POST["win"]) && isset($_COOKIE['user_id'])) {
    $moves = intval($_POST["moves"]);
    $pieces = intval($_POST["pieces"]);
    $time = intval($_POST["time"]);
    $win = intval($_POST["win"]);
    $tbName = $_COOKIE['user_id'];

    // Insert into user's table
    $insertSql = "INSERT INTO $tbName (`id`, `moves`, `pieces`, `timeTaken`, `Win`) 
                  VALUES (NULL, '$moves', '$pieces', '$time', '$win')";
    mysqli_query($connection, $insertSql);


    $loss = ($win == 0) ? 1 : 0;
    $updateSql = "UPDATE leaderboards SET 
                    gamesPlayed = gamesPlayed + 1, 
                    wins = wins + $win, 
                    losses = losses + $loss, 
                    winRate = CASE WHEN gamesPlayed = 0 THEN 0 ELSE ((wins / gamesPlayed)*100) END, 
                    timePlayed = timePlayed + $time
                  WHERE name = '$tbName'";
    mysqli_query($connection, $updateSql);

    // Close the database connection
    $connection->close();

    exit(); 
}
?>
