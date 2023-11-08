<?php
session_start();

if (isset($_POST['color1']) && isset($_POST['color2'])) {
    $_SESSION['color1'] = $_POST['color1'];
    $_SESSION['color2'] = $_POST['color2'];
    echo($$_POST['color1']);
}
else{
    echo("failed"); // might need to run through xamp
}
?>