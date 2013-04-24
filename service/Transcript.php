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

$output = getTranscript($RegId, $Pwd);
$output = json_decode($output, true);

// calculating total credit hours done
$hours = 0;
foreach ($output["attemptedCourses"] as $course) {
	if ($course["crsGrade"] != "F" && $course["crsGrade"] != "W") {
		$hours += $course["crsHours"];
	}
}
$output["hours"] = $hours;

// calculating CGPA
$cgpa = 0;
foreach ($output["attemptedCourses"] as $course) {
	if ($course["crsGrade"] != "F" && $course["crsGrade"] != "W") {
		$cgpa += ($course["gpa"] * $course["crsHours"]);
	}
}
$output["cgpa_custom"] = ($cgpa / $hours);


$output = json_encode($output);
echo json_format($output);
?>