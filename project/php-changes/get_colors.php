<?php
session_start();

$response = array(
    'bg1' => $_SESSION['bg1'] ?? '',
    'bg2' => $_SESSION['bg2'] ?? ''
);

header('Content-Type: application/json');
echo json_encode($response);
?>