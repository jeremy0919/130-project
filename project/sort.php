<?php
header('Content-Type: application/json');
include("databaseT.php");
// Check connection


function getLeaderboard($orderBy, $orderType) {
    global $connection;

    $order = ($orderType == 'most') ? 'DESC' : 'ASC';

    if ($orderBy === 'mostGames' || $orderBy === 'leastGames' || $orderBy === 'mostTime' || $orderBy === 'leastTime') {
      
        $sql = "SELECT * FROM leaderboards ORDER BY $orderBy $order";
    } else {
        $sql = "SELECT * FROM leaderboards ORDER BY $orderBy $order";
    }

    $result = $connection->query($sql);

    $leaderboardData = [];

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $leaderboardData[] = $row;
        }
    }

    return json_encode($leaderboardData);
}

// Display the leaderboard based on the button clicked
if (isset($_GET['leaderboard']) && isset($_GET['orderType'])) {
    $orderBy = $_GET['leaderboard'];
    $orderType = $_GET['orderType'];

    $jsonResult = getLeaderboard($orderBy, $orderType);
    
    // Check for JSON errors
    if (json_decode($jsonResult) === null) {
        // Log the error
        error_log("Error in JSON response: " . json_last_error_msg());
    }

    echo $jsonResult;
}

$connection->close();
?>