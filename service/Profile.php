<?php
require ("common/iulms.edu.pk.php");
require ("common/config.inc.php");
require ("common/Database.php");

header('Cache-Control: no-cache, must-revalidate');
header('Content-type: application/json');

$RegId = "";
$Pwd = "";

if (isset($_REQUEST["id"])) {
	$RegId = $_REQUEST["id"];
}

if (isset($_REQUEST["pwd"])) {
	$Pwd = $_REQUEST["pwd"];
}

$output = getProfile($RegId, $Pwd);
/*
$output_values = json_decode($output);

$email = $output_values->email;
$fname = $output_values->first_name;
$lname = $output_values->last_name;

$db = new Database(DB_SERVER, DB_USER, DB_PASS, DB_DATABASE);
$db->connect();
$db->query("INSERT INTO students (email, id, fname, lname)" .  
								"VALUES ($email, $RegId, $fname, $lname)");
$db->close();*/


echo json_format($output);
?>