<?php 

//Author: Zachary Obeid
//CECS-545 Project One

date_default_timezone_set('America/Los_Angeles');

try {
    $servername = '127.0.0.1';
    $username = 'root';
    $password = '';

    $handler = new PDO("mysql:host=$servername;", $username, $password);
    $handler->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if($handler) {
        echo "connection succesful";
    } else {
        echo "connection failed";
    }

} catch(PDOException $e) {
    echo "Error\n";
    echo $e->getMessage();
    die(); 

} finally {
    $handler = null; 
}





?>