<?php
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

if ($RegId == "demo" && $Pwd == "demo") {
	require ("common/demo.iulms.edu.pk.php");
} else {
	require ("common/iulms.edu.pk.php");
}

$output = getProfile($RegId, $Pwd);
echo json_format($output);
?>