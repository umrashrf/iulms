<?php
require ("common/iulms.edu.pk.php");

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

if (!isset($_POST["to"])) {
	$error = array("error" => "The \"to\" field is required.");
	exit(0);
}

if (!isset($_POST["subject"])) {
	$error = array("error" => "The \"subject\" field is required.");
	exit(0);
}

if (!isset($_POST["message"])) {
	$error = array("error" => "The \"message\" field is required.");
	exit(0);
}

$To = $_POST["to"];
$Subject = $_POST["subject"];
$Message = $_POST["message"];

$output = submitApplication($RegId, $Pwd, $To, $Subject, $Message);
echo json_format($output);
?>