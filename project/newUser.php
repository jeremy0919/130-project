<?php

include("databaseT.php");

if (isset($_POST['Sname']) && isset($_POST['password'])) {
    $name = trim($_POST['Sname']);
    $password = trim($_POST['password']);
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $connection->prepare("SELECT * FROM leaderboards WHERE name = ?");
    $stmt->bind_param("s", $name);
    $stmt->execute();

    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo "Account already exists";
    } else {
        // Name not found in the database, do something else
        $sql = "INSERT INTO `leaderboards` (`id`, `name`, `password`, `gamesPlayed`, `wins`, `losses`, `winRate`) 
                VALUES (NULL, ?, ?, '0', '0', '0', '0')";
        $stmt = $connection->prepare($sql);
        $stmt->bind_param("ss", $name, $hashed_password);
        $stmt->execute();
    }

    $stmt->close();
    $connection->close();
}

header('Location: checkers.html');
exit;
?>
