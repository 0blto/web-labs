<?php
session_start();

if (isset($_SESSION['last_x']) && isset($_SESSION['last_y']) && isset($_SESSION['last_r'])) {
    $data = array('x' => $_SESSION['last_x'], 'y' => $_SESSION['last_y'], 'r' => $_SESSION['last_r']);
    echo json_encode($data);
} else {
    echo '';
}