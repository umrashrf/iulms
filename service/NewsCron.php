<?php 

require ("common/config.inc.php");
require ("common/Database.php");

$db = new Database(DB_SERVER, DB_USER, DB_PASS, DB_DATABASE);
$db->connect();
$recent_date = $db->fetch_all_array("SELECT MAX(posted_dt) FROM news");
$db->close();

// bring data from RSS

?>