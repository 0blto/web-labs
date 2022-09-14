<?php
session_start();

$time_start = microtime(true);

$x = $_POST['x'];
$y = $_POST['y'];
$r = $_POST['r'];

function checkX($x) {
    return is_numeric($x);
}

function checkY($y) {
    return $y < 3 && $y > -5 || is_numeric($y);
}

function checkR($r) {
    return is_numeric($r);
}

function checkSquare($x, $y, $r) {
    return $x >= 0 && $y <= 0 && $x <= $r && $y >= -$r;
}

function checkLinear($x, $y, $r) {
    return $x <= 0 && $y >= 0 && $y <= $x / 2 + $r / 2;  
}

function checkFirstCircle($x, $y, $r) {
    return $x >= 0 && $y >= 0 && ($x * $x) + ($y * $y) <= ($r * $r);
}

function result($x, $y, $r) {
    return checkFirstCircle($x, $y, $r) || checkLinear($x, $y, $r) || checkSquare($x, $y, $r);
}

$offset = $_POST['offset'];

$current_time = time();

$result = checkY($y) && checkX($x) && checkR($r) ? (result($x, $y, $r) ? 'Попадание' : 'Промах') : 'error';

$time_end = microtime(true);

$scripttime = number_format($time_end - $time_start, 6, ',', '');

$response = array('x' => $x, 'y' => $y, 'r' => $r, 'now' => date('d-m-y h:i a', $current_time - $offset * 60), 'scripttime' => $scripttime, 'result' => $result);

array_push($_SESSION['table'], $response);

echo '<tr>';
echo '<td>' . $response['now'] . '</td>';
echo '<td>' . $response['scripttime'] . '</td>';
echo '<td>' . $response['x'] . '</td>';
echo '<td>' . $response['y'] . '</td>';
echo '<td>' . $response['r'] . '</td>';
echo '<td>' . $response['result'] . '</td>' . '</tr>';
?>