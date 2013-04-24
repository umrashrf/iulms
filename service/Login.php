<?php
require("common/config.php");

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

if (array_key_exists($RegId, $users) && $users[$RegId] == $Pwd) {
	require ("common/demo.iulms.edu.pk.php");
} else {
	require ("common/iulms.edu.pk.php");
}

$output = Login($RegId, $Pwd);
echo json_format($output);
?>