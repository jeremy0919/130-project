<?php
session_start();

if (isset($_POST['selectedImage'])) {
    $_SESSION['selectedImage'] = $_POST['selectedImage'];
    echo 'Session variable updated successfully';
} else {
    $_SESSION['selectedImage'] = "img1.png";
}
?>