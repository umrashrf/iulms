<?php
require ("common/iulms.edu.pk.php");
require ("common/config.inc.php");
require ("common/Database.php");

header('Cache-Control: no-cache, must-revalidate');
header('Content-type: application/json');

// first we need student degree info

$db = new Database(DB_SERVER, DB_USER, DB_PASS, DB_DATABASE);
$db->connect();
$exam_schedule = $db->fetch_all_array("SELECT * FROM exam_schedule");
$db->close();

$output = json_encode($exam_schedule);
echo json_format($output);
?>