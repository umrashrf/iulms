<?php
require ("common/iulms.edu.pk.php");
require ("common/config.inc.php");
require ("common/Database.php");

header('Cache-Control: no-cache, must-revalidate');
header('Content-type: application/json');

// https://www.facebook.com/feeds/page.php?format=rss20&id=140641789392100

$db = new Database(DB_SERVER, DB_USER, DB_PASS, DB_DATABASE);
$db->connect();
$news = $db->fetch_all_array("SELECT * FROM news ORDER BY posted_dt DESC");
$db->close();

$output = array();

foreach ($news as $new) {
	$output[count($output)] = $new;	
}

$output = json_encode($output);
echo json_format($output);
?>