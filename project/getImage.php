<?php
session_start();

if (isset($_SESSION['selectedImage'])) {
    $selectedImage = $_SESSION['selectedImage'];
    $data = array(
        "image" => $selectedImage
   
    );
    
  
} else {
    $data = array(
        "image" =>   "img1.png"
   
    );
  
}
echo json_encode($data);
?>