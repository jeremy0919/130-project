Run project folder in Xampp
Open game.html
Game.html handles singleplayer, game1.html handles multiplayer. It will also restart any existing game.
Newgame will start a new game depending on if singleplayer or multiplayer
Giveup returns the amount of moves taken, the amount of pieces remaining on your board, and the amount of time remaining in the game
About us gives contact page, Jump into game returns back to the main game page, help/rules shows the rules, leaderboards opens a leaderboard page, login opens login page where you can either create an account or login with existing, main page is a menu with different settings.

Notes:
    To create database and leaderboards table run makeDatabase.php
        - if error returns for table creation within makeDatabase.php run makeTable.php
            -if error returns for filling table run fillLeaderboards.php
    If not logged in return history in leaderboard will output no history
        If games have been played when not logged in history will output those game stats but leaderboards will not
    