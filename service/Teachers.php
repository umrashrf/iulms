<?php
require ("common/iulms.edu.pk.php");
require ("common/config.inc.php");
require ("common/Database.php");

header('Cache-Control: no-cache, must-revalidate');
header('Content-type: application/json');

$db = new Database(DB_SERVER, DB_USER, DB_PASS, DB_DATABASE);
$db->connect();
$teachers = $db->fetch_all_array("SELECT * FROM teachers");

$output = array();
$entity_table = "teachers";
	
foreach ($teachers as $teacher) {
	$entity_id = $teacher["id"];
	$ratings = $db->fetch_all_array("SELECT * FROM ratings " .
									"WHERE entity_table = '$entity_table' AND entity_id = '$entity_id'");
	$ratings_output = array();
	foreach ($ratings as $rating) {
		$ratings_output[count($ratings_output)] = $rating;
	}
	$teacher["ratings"] = $ratings_output;
	$output[count($output)] = $teacher;	
}

$db->close();

$output = json_encode($output);
echo json_format($output);
?>