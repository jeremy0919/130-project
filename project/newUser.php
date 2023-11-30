<?php
include("databaseT.php");

if (isset($_POST['Sname']) && isset($_POST['password'])) {
    $name = trim($_POST['Sname']);
    $password = trim($_POST['password']);

   

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
        $stmt->bind_param("ss", $name, $password);
        $stmt->execute();
        $stmt->close();

        $userId = $name;
        setcookie('user_id', $userId, time() + (86400 * 30), "/"); // cookie valid for 30 days
        echo($name);
        $sql = "CREATE TABLE $name ( 
            id INT AUTO_INCREMENT PRIMARY KEY,
            moves INT NOT NULL,
            pieces INT NOT NULL,
            timeTaken INT NOT NULL,
            Win INT NOT NULL
          )";
        if ($connection->query($sql) === TRUE) {
            echo "Account Created succesfully";
          } else {
            echo "Error creating account please try again: " . $connection->error;
          }

    }

    $connection->close();
}

header('Location: checkers.html');
exit;
?>
