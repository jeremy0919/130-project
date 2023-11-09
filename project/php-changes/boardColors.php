<?php
session_start();

$response = array(
    'color1' => $_SESSION['color1'] ?? '',
    'color2' => $_SESSION['color2'] ?? ''
);

header('Content-Type: application/json');
echo json_encode($response);
?>