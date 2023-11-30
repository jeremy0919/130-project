<?php
include("databaseT.php");


$sql = "SELECT * FROM leaderboards";
$result = $connection->query($sql);

$data = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
 
    }
}
echo json_encode($data);

$connection->close();


?>