<?php

// Lets time how long it takes to create our js file
// Sift through online players, get current data, and update accordingly

$map_data = array();

$player_files = scandir('players/');

foreach($player_files as $player_file) {
  if (strstr($player_file, '.json')) {
    $player_json = file_get_contents('players/'.$player_file);
    $player = json_decode($player_json);
    // Kick player (and remove file) if last update was more than 60 secs (?)
    if ((time() - $player->update) > 60) {
      unlink('players/'.$player->id.'.json');
    }
    else {
      $map_data[$player->id] = $player;
    }
  }
}

$curr_player = new stdClass;
$curr_player->id = $_POST['player_id'];
$curr_player->x_coor = $_POST['player_x'];
$curr_player->y_coor = $_POST['player_y'];
$curr_player->update = time();

// For each player logged on, they get their own json file called player_id.json
$fp = fopen('players/'.$curr_player->id.'.json', 'w');
fwrite($fp, json_encode($curr_player));
fclose($fp);

$map_data[$curr_player->id] = $curr_player;

echo json_encode($map_data);

?>
