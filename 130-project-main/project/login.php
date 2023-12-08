<?php
include("databaseT.php");
echo("here");
if (isset($_POST['submitL'])) {
    $name = trim($_POST['username']);
    $password = trim($_POST['password']);
    echo($name.''.$password.'');
   
    $stmt = $connection->prepare("SELECT * FROM leaderboards WHERE name = ?");
    $stmt->bind_param("s", $name);
    $stmt->execute();

    $result = $stmt->get_result();
    $data = array();


    $stmt->close();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

   
        if ($password == $data[0]['password'])   {
            $userId = $name;
            setcookie('user_id', $userId, time() + (86400 * 30), "/"); // cookie valid for 30 days
    
            echo json_encode($data);
            $connection->close();
            header('Location: index.html');
            exit;
        } else {
            echo json_encode(array("msg" => "Wrong password"));
            $connection->close();
            header('Location: login.html');
            exit;
        }
    } else {
        echo json_encode(array("msg" => "Account not found"));
        $connection->close();
        header('Location: login.html');
        exit;
    }

   
}
?>
