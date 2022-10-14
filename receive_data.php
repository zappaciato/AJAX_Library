<?php
if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') { // check if the request is from AJAX;
    header('Content-Type: application/json'); //it tells the browser to expect json format
    echo json_encode($_POST);
} else {
    header('Content-Type: text/html; charset=utf-8'); //this header will prevent access;
    die('Accecss Denied!');
}

print_r($_GET);

print_r($_POST);
