<?php
header("Access-Control-Allow-Origin: *"); // CORS
header("Access-Control-Allow-Headers: *"); // CORS
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json; charset=utf-8");
include "lib/DB.php"; // DB 클래스
include "lib/Request.php";
include "lib/Member.php";
include "lib/File.php";
include "lib/Board.php";
include "lib/News.php";

//$inputData = file_get_contents("PHP://input");
//$in = json_decode($inputData, true);
$in = $_POST ?? [];
$success = false;
$returnData = [];
$message = "";