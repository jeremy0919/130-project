<?php
include("databaseT.php");


$sql = "SELECT * FROM leaderboards1";
$result = $connection->query($sql);

$data = array();
$temp =0;
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
        /*
        $temp++;
        if($temp>5){
            break;
        }
        */
    }
}
echo json_encode($data);

$connection->close();


?>