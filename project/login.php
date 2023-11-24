<?php // start at log in page, log in page goes to selection of one or two player // start at log in page, log in page goes to selection of one or two player
        // Read the existing JSON file
        include("databaseT.php");  
if (isset($_POST['submitL'])) {
        $name = trim($_POST['username']);
        $password = trim($_POST['password']);



    $stmt = $connection->prepare("SELECT * FROM leaderboards WHERE name = ?");

    // Bind parameters
    $stmt->bind_param("s",  $name);

    // Execute query
    $stmt->execute();

    // Get the result
    $result = $stmt->get_result();
    $data = array();

    // Close statement
    $stmt->close();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }
    if($data["password"] == $password){
        echo json_encode($data);
        header('Location: game.html');
    }
    else{
        echo json_encode(array("msg"=> "Wrong password")); // idk if this is right
        header('Location: login.html');
    }

    $connection->close();
}         
            
?>