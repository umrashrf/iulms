<?php
$rss = "https://www.facebook.com/feeds/page.php?format=atom10&id=140641789392100";

// only for production because there is no cross domain restriction
// header('Location: ' . $rss);

// for development
header('Cache-Control: no-cache, must-revalidate');
header('Content-type: application/xml');

$useragent = "Mozilla/5.0 (Windows; U; Windows NT 6.1; ru; rv:1.9.2.3) Gecko/20100401 Firefox/4.0 (.NET CLR 3.5.30729)";

$ch = curl_init();

curl_setopt($ch, CURLOPT_USERAGENT, $useragent);
curl_setopt($ch, CURLOPT_URL, $rss);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, FALSE);
$output = curl_exec($ch);

echo $output;

curl_close($ch);
?>