<?php
require ("Utility.php");
require ("simple_html_dom.php");

function Login($RegId, $Pwd) {
	$useragent = "Mozilla/5.0 (Windows; U; Windows NT 6.1; ru; rv:1.9.2.3) Gecko/20100401 Firefox/4.0 (.NET CLR 3.5.30729)";

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_USERAGENT, $useragent);
	curl_setopt($ch, CURLOPT_URL, "http://203.101.161.84/sic/siclogin.asp");
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_POST, TRUE);
	curl_setopt($ch, CURLOPT_POSTFIELDS, "regid=" . $RegId . "&pwd=" . $Pwd);
	curl_setopt($ch, CURLOPT_COOKIEJAR, $RegId . ".txt");
	$login_output = curl_exec($ch);
	$login_info = curl_getinfo($ch);
	curl_close($ch);

	$output = array("login" => 0);

	if ($login_info["url"] == "http://203.101.161.84/sic/siclogin.asp") {
		$output = array("login" => 1);
	}

	return json_encode($output);
}

function getAttendance($RegId, $Pwd) {
	$useragent = "Mozilla/5.0 (Windows; U; Windows NT 6.1; ru; rv:1.9.2.3) Gecko/20100401 Firefox/4.0 (.NET CLR 3.5.30729)";

	if (Login($RegId, $Pwd)) {
		$ch = curl_init();

		curl_setopt($ch, CURLOPT_USERAGENT, $useragent);
		curl_setopt($ch, CURLOPT_URL, "http://203.101.161.84/sic/attendance.asp");
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_POST, FALSE);
		curl_setopt($ch, CURLOPT_COOKIEFILE, $RegId . ".txt");
		$attendance_output = curl_exec($ch);
		curl_close($ch);

		$semester = "Unknow Semester";
		$attendance = array();

		if ($attendance_output) {
			$html = str_get_html($attendance_output);
			$tables = $html -> find('table[width=790]');
			for ($t = 0; $t < count($tables); $t++) {
				$table = $tables[$t];
				$rows = $table -> find('tr');
				for ($r = 0; $r < count($rows); $r++) {
					$row = $rows[$r];
					if ($r == 0) {
						// semester info
						$semester = trim($row -> children(0) -> plaintext, "  ");
					} else if ($r > 1) {
						$course = trim($row -> children(0) -> plaintext, "  ");
						$session = trim($row -> children(2) -> plaintext, "  ");
						$presents = trim($row -> children(3) -> plaintext, "  ");
						$absents = trim($row -> children(4) -> plaintext, "  ");
						$attendance[count($attendance)] = array("semester" => $semester, "course" => $course, "sessions" => $session, "presents" => $presents, "absents" => $absents);
					}
				}
			}
		}
		return json_encode($attendance);
	} else {
		return 0;
	}
}
?>