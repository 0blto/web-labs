<?php
session_start();
if (!isset($_SESSION['table'])) {
    $_SESSION['table'] = array();
    echo '';
} else {
    foreach ($_SESSION['table'] as $res) {
        echo '<tr>';
        echo '<td>' . $res['now'] . '</td>';
        echo '<td>' . $res['scripttime'] . '</td>';
        echo '<td>' . $res['x'] . '</td>';
        echo '<td>' . $res['y'] . '</td>';
        echo '<td>' . $res['r'] . '</td>';
        echo '<td>' . $res['result'] . '</td>' . '</tr>';
    }
}