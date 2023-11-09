<?php
if(isset($_POST["submitN"]) && $_POST["submitN"] == ""){
   $name = trim($_POST['username']);
   $password = trim($_POST['password']);
echo $name;
if($check=0){
$new_username = [
    
    "name"=>$name,
    "password"=>$password,
    "gamesPlayed"=>0,
    "wins"=> 0,
    "losses"=>0,
    "winRate"=> 0
];
$data['User'][] = $new_username;

// Encode the updated data back to JSON
$updated_json = json_encode($data, JSON_PRETTY_PRINT);

// Write the updated JSON data back to the file
file_put_contents($json_file, $updated_json);
}
}
?>