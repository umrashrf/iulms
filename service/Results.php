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

$output = array(
	//array("course_name" => "Pak Studies", "grade" => "A")
);

$output = json_encode($output);
echo json_format($output);
?>