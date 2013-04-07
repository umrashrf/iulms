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

$output = getTranscript($RegId, $Pwd);
$output = json_decode($output, true);

// calculating total credit hours done
$total = 0;
foreach ($output["attemptedCourses"] as $course) {
	if ($course["crsGrade"] != "F" && $course["crsGrade"] != "W") {
		$total += $course["crsHours"];
	}
}
$output["hours"] = $total;

$output = json_encode($output);
echo json_format($output);
?>