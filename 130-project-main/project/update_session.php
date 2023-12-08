<?php
session_start();

if (isset($_POST['selectedImage'])) {
    echo(($_POST['selectedImage']));
    $_SESSION['selectedImage'] = $_POST['selectedImage'];
    echo 'Session variable updated successfully';
} else {
    $_SESSION['selectedImage'] = "img1.png";
    echo("session: ". $_SESSION["selectImage"]);
}
?>