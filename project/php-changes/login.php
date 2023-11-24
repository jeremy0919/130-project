<?php // start at log in page, log in page goes to selection of one or two player // start at log in page, log in page goes to selection of one or two player
        // Read the existing JSON file
        
        if (isset($_POST['submitL'])) {
            $json_file = 'database.json';
            $json_data = file_get_contents($json_file);
            $data = json_decode($json_data, true);
            $check =0;
            $name = trim($_POST['username']);
            $password = trim($_POST['password']);
           
            if (isset($data['User']) && is_array($data['User'])) { // can store in session variables to be displayed in game
                foreach ($data['User'] as $key => $user) {
                    if ($user['name'] == $name &&$user['password'] == $password) {
                        echo "{$key} = {$user['name']} <br>";
                        echo "{$key} = {$user['gamesPlayed']} <br>";
                        echo "{$key} = {$user['wins']} <br>";
                        echo "{$key} = {$user['losses']} <br>";
                        echo "{$key} = {$user['winRate']} <br>";
                        $check = 1;
                    }
                }
            }
            if($check == 0){
                echo("user not found");
            }
            if($check==1){
                header('Location: game.html');
            }
        }
        

        ?>