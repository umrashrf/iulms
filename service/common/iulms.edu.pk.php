<?php
require ("Utility.php");
require ("simple_html_dom.php");

function Login($RegId, $Pwd) {
	$useragent = "Mozilla/5.0 (Windows; U; Windows NT 6.1; ru; rv:1.9.2.3) Gecko/20100401 Firefox/4.0 (.NET CLR 3.5.30729)";

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_USERAGENT, $useragent);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_COOKIEJAR, $RegId . ".txt");
	curl_setopt($ch, CURLOPT_URL, "http://iulms.edu.pk/login/index.php");
	curl_setopt($ch, CURLOPT_POST, FALSE);
	$login_output = curl_exec($ch);

	curl_setopt($ch, CURLOPT_URL, "http://iulms.edu.pk/login/index.php");
	curl_setopt($ch, CURLOPT_POST, TRUE);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 0);
	curl_setopt($ch, CURLOPT_POSTFIELDS, "username=" . $RegId . "&password=" . $Pwd);
	curl_setopt($ch, CURLOPT_COOKIEFILE, $RegId . ".txt");
	$login_output = curl_exec($ch);
	$login_info = curl_getinfo($ch);
	curl_close($ch);

	$output = array("login" => 0);

	if (in_array('http_code', $login_info) && $login_info["http_code"] == "303") {
		$output = array("login" => 1);
	}

	return json_encode($output);
}

function getAttendance($RegId, $Pwd) {
	$useragent = "Mozilla/5.0 (Windows; U; Windows NT 6.1; ru; rv:1.9.2.3) Gecko/20100401 Firefox/4.0 (.NET CLR 3.5.30729)";

	if (Login($RegId, $Pwd)) {
		$ch = curl_init();

		curl_setopt($ch, CURLOPT_USERAGENT, $useragent);
		curl_setopt($ch, CURLOPT_URL, "http://iulms.edu.pk/sic/StudentAttendance.php");
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_POST, FALSE);
		curl_setopt($ch, CURLOPT_COOKIEFILE, $RegId . ".txt");
		$attendance_output = curl_exec($ch);

		$attendance = array();

		if ($attendance_output) {
			// parse html and get all ids of courses
			$html = str_get_html($attendance_output);
			$selects = $html -> find('select[id=cmbStudentCourse]');
			for ($s = 0; $s < count($selects); $s++) {
				$select = $selects[$s];
				$options = $select -> find('option');
				for ($o = 0; $o < count($options); $o++) {
					$option = $options[$o];
					curl_setopt($ch, CURLOPT_URL, "http://iulms.edu.pk/sic/SICDataService.php");
					curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 0);
					curl_setopt($ch, CURLOPT_POST, TRUE);
					curl_setopt($ch, CURLOPT_POSTFIELDS, "action=GetCourseInfo&secCourseCode=" . $option -> value);
					$attendance_output = curl_exec($ch);
					$attendance[count($attendance)] = json_decode($attendance_output);
				}
			}
		}

		curl_close($ch);

		return json_encode($attendance);
	} else {
		return 0;
	}
}
?>