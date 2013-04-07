<?php
require ("Utility.php");
require ("simple_html_dom.php");

/**
 * It logins the user with his/her reg. id and password. after login save the session cookie in a file named with user reg id
 * @param RegId student IULMS registration id
 * @param Pwd student IULMS password
 */
function Login($RegId, $Pwd) {
	$useragent = "Mozilla/5.0 (Windows; U; Windows NT 6.1; ru; rv:1.9.2.3) Gecko/20100401 Firefox/4.0 (.NET CLR 3.5.30729)";

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, "http://iulms.edu.pk/login/index.php");
	curl_setopt($ch, CURLOPT_USERAGENT, $useragent);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_COOKIEJAR, realpath('.') . "/cookies/" . $RegId . ".txt");
	curl_setopt($ch, CURLOPT_POST, TRUE);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 0);
	curl_setopt($ch, CURLOPT_POSTFIELDS, "username=$RegId&password=$Pwd");
	$login_output = curl_exec($ch);
	$login_info = curl_getinfo($ch);
	curl_close($ch);

	$output = array();

	if (in_array('http_code', $login_info) && $login_info["http_code"] == "303") {
		$output = array("success" => "true");
	}

	return json_encode($output);
}

/**
 * It gets user info after getting user login via Login function
 * @param RegId student IULMS registration id
 * @param Pwd student IULMS password 
 */
function getProfile($RegId, $Pwd) {
	$useragent = "Mozilla/5.0 (Windows; U; Windows NT 6.1; ru; rv:1.9.2.3) Gecko/20100401 Firefox/4.0 (.NET CLR 3.5.30729)";

	if (Login($RegId, $Pwd)) {
		$ch = curl_init();

		curl_setopt($ch, CURLOPT_USERAGENT, $useragent);
		curl_setopt($ch, CURLOPT_URL, "http://iulms.edu.pk/user/edit.php?cancelemailchange=1");
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_POST, FALSE);
		curl_setopt($ch, CURLOPT_COOKIEFILE, realpath('.') . "/cookies/" . $RegId . ".txt");
		$profile_output = curl_exec($ch);

		curl_close($ch);

		$profile_info = array();

		if ($profile_output) {
			// parse html and get all ids and text of application subjects
			$html = str_get_html($profile_output);
			
			$names = $html -> find('div[class="felement fstatic"]');
			if (count($names) > 0) {
				$fname = $names[0]->plaintext;		
			} else {
				$fname = "";
			}
			if (count($names) > 1) {
				$lname = $names[1]->plaintext;		
			} else {
				$lname = "";
			}
			$email = $html -> find('input[name=email]');
			if (count($email) > 0) {
				$email = $email[0]->value;		
			} else {
				$email = "";
			}
			$profile_info = array("reg_id" => $RegId, "first_name" => $fname, "last_name" => $lname, "email" => $email);
		}

		return json_encode($profile_info);
	} else {
		return 0;
	}
}

/**
 * It gets user attendance after getting user login via Login function
 * @param RegId student IULMS registration id
 * @param Pwd student IULMS password 
 */
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
		curl_setopt($ch, CURLOPT_COOKIEFILE, realpath('.') . "/cookies/" . $RegId . ".txt");
		$attendance_output = curl_exec($ch);

		$attendance = array();
		
		$semester = "Semester " . date('Y');

		if ($attendance_output) {
			// parse html and get all ids of courses
			$html = str_get_html($attendance_output);
			$courses = $html -> find('table.attendance-table tr.attendanceRow td.attendanceRowCourse');
			foreach ($courses as $course) {
				$found = preg_match('/^([\w\s]+)\((\d+)\)$/', $course->plaintext, $matches);
				if ($found) {
					$course_name = $matches[1];
					$course_id = $matches[2];
					
					curl_setopt($ch, CURLOPT_URL, "http://iulms.edu.pk/sic/SICDataService.php");
					curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 0);
					curl_setopt($ch, CURLOPT_POST, TRUE);
					curl_setopt($ch, CURLOPT_POSTFIELDS, "action=GetStudentAttendaceDetails&secCourseCode=" . $course_id);
					
					$attendance_output = curl_exec($ch);
					$sessions = 0;
					$presents = 0;
					$absents = 0;
					
					foreach (json_decode($attendance_output) as $a) {
						$sessions++;
						if ($a == "P") {
							$presents++;
						} elseif ($a == "A") {
							$absents++;
						}
					}
					
					$attendance[count($attendance)] = array(
						"semester" => $semester, 
						"course_id" => $course_id,
						"course_name" => $course_name, 
						"sessions" => $sessions,
						"presents" => $presents,
						"absents" => $absents
					);
				}
			}
		}

		curl_close($ch);

		return json_encode($attendance);
	} else {
		return 0;
	}
}

/**
 * It gets user schedule after getting user login via Login function
 * @param RegId student IULMS registration id
 * @param Pwd student IULMS password 
 */
function getSemesterSchedule($RegId, $Pwd) {
	$useragent = "Mozilla/5.0 (Windows; U; Windows NT 6.1; ru; rv:1.9.2.3) Gecko/20100401 Firefox/4.0 (.NET CLR 3.5.30729)";

	if (Login($RegId, $Pwd)) {
		$ch = curl_init();

		curl_setopt($ch, CURLOPT_USERAGENT, $useragent);
		curl_setopt($ch, CURLOPT_URL, "http://iulms.edu.pk/sic/StudentAttendance.php");
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_POST, FALSE);
		curl_setopt($ch, CURLOPT_COOKIEFILE, realpath('.') . "/cookies/" . $RegId . ".txt");
		$attendance_output = curl_exec($ch);

		$schedule = array();

		if ($attendance_output) {
			// parse html and get all ids of courses
			$html = str_get_html($attendance_output);
			$courses = $html -> find('table.attendance-table tr.attendanceRow td.attendanceRowCourse');
			foreach ($courses as $course) {
				$found = preg_match('/^([\w\s]+)\((\d+)\)$/', $course->plaintext, $matches);
				if ($found) {
					$course_id = $matches[2];
					
					curl_setopt($ch, CURLOPT_URL, "http://iulms.edu.pk/sic/SICDataService.php");
					curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 0);
					curl_setopt($ch, CURLOPT_POST, TRUE);
					curl_setopt($ch, CURLOPT_POSTFIELDS, "action=GetCourseInfo&secCourseCode=" . $course_id);
					$schedule_output = curl_exec($ch);
					$schedule[count($schedule)] = json_decode($schedule_output);
				}
			}			
		}

		curl_close($ch);

		return json_encode($schedule);
	} else {
		return 0;
	}
}

/**
 * It gets user transcript after getting user login via Login function
 * @param RegId student IULMS registration id
 * @param Pwd student IULMS password 
 */
function getTranscript($RegId, $Pwd) {
	$useragent = "Mozilla/5.0 (Windows; U; Windows NT 6.1; ru; rv:1.9.2.3) Gecko/20100401 Firefox/4.0 (.NET CLR 3.5.30729)";

	if (Login($RegId, $Pwd)) {
		$ch = curl_init();

		curl_setopt($ch, CURLOPT_USERAGENT, $useragent);
		curl_setopt($ch, CURLOPT_URL, "http://iulms.edu.pk/sic/Transcript.php");
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_POST, FALSE);
		curl_setopt($ch, CURLOPT_COOKIEFILE, realpath('.') . "/cookies/" . $RegId . ".txt");
		$transcript_output = curl_exec($ch);

		$transcript = array();

		if ($transcript_output) {
			// parse html and get all ids of degrees
			$html = str_get_html($transcript_output);
			$selects = $html -> find('select[id=cmbDegree]');
			for ($s = 0; $s < count($selects); $s++) {
				$select = $selects[$s];
				$options = $select -> find('option');
				for ($o = 0; $o < count($options); $o++) {
					$option = $options[$o];
					curl_setopt($ch, CURLOPT_URL, "http://iulms.edu.pk/sic/SICDataService.php");
					curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 0);
					curl_setopt($ch, CURLOPT_POST, TRUE);
					curl_setopt($ch, CURLOPT_POSTFIELDS, "action=GetTranscript&degreeId=" . $option -> value);
					$transcript_output = curl_exec($ch);
					$result = json_decode($transcript_output, true);
					$result["degree"] = array("slug" => $option -> value, "name" => $option -> plaintext);
					$transcript[count($transcript)] = $result;
				}
			}
		}

		curl_close($ch);

		return json_encode($transcript[0]);
	} else {
		return 0;
	}
}

/**
 * It gets user submitted applications after getting user login via Login function
 * @param RegId student IULMS registration id
 * @param Pwd student IULMS password 
 */
function getApplications($RegId, $Pwd) {
	$useragent = "Mozilla/5.0 (Windows; U; Windows NT 6.1; ru; rv:1.9.2.3) Gecko/20100401 Firefox/4.0 (.NET CLR 3.5.30729)";

	if (Login($RegId, $Pwd)) {
		$ch = curl_init();

		curl_setopt($ch, CURLOPT_USERAGENT, $useragent);
		curl_setopt($ch, CURLOPT_URL, "http://iulms.edu.pk/sic/Applications.php");
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_POST, FALSE);
		curl_setopt($ch, CURLOPT_COOKIEFILE, realpath('.') . "/cookies/" . $RegId . ".txt");
		$application_output = curl_exec($ch);

		$application_subjects = array();

		if ($application_output) {
			// parse html and get all ids and text of application subjects
			$html = str_get_html($application_output);
			$selects = $html -> find('select[name=subject]');
			for ($s = 0; $s < count($selects); $s++) {
				$select = $selects[$s];
				$options = $select -> find('option');
				for ($o = 0; $o < count($options); $o++) {
					$option = $options[$o];
					$application_subjects[count($application_subjects)] = array($option->value => $option->plaintext);
				}
			}
		}

		curl_close($ch);

		return json_encode($application_subjects);
	} else {
		return 0;
	}
}

/**
 * It gets application subjects after getting user login via Login function
 * @param RegId student IULMS registration id
 * @param Pwd student IULMS password 
 */
function getApplicationSubjects($RegId, $Pwd) {
	$useragent = "Mozilla/5.0 (Windows; U; Windows NT 6.1; ru; rv:1.9.2.3) Gecko/20100401 Firefox/4.0 (.NET CLR 3.5.30729)";

	if (Login($RegId, $Pwd)) {
		$ch = curl_init();

		curl_setopt($ch, CURLOPT_USERAGENT, $useragent);
		curl_setopt($ch, CURLOPT_URL, "http://iulms.edu.pk/sic/Applications.php");
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_POST, FALSE);
		curl_setopt($ch, CURLOPT_COOKIEFILE, realpath('.') . "/cookies/" . $RegId . ".txt");
		$application_output = curl_exec($ch);

		$application_subjects = array();

		if ($application_output) {
			// parse html and get all ids and text of application subjects
			$html = str_get_html($application_output);
			$selects = $html -> find('select[name=subject]');
			for ($s = 0; $s < count($selects); $s++) {
				$select = $selects[$s];
				$options = $select -> find('option');
				for ($o = 0; $o < count($options); $o++) {
					$option = $options[$o];
					$application_subjects[count($application_subjects)] = array("text" => $option->plaintext, "value" => $option->value);
				}
			}
		}

		curl_close($ch);

		return json_encode($application_subjects);
	} else {
		return 0;
	}
}

/**
 * It submits application on behalf of user after getting user login via Login function
 * @param RegId student IULMS registration id
 * @param Pwd student IULMS password 
 * @param To the recipient of the application
 * @param Subject the subject of the application
 * @param Message the message to send to the recipient
 */
function submitApplication($RegId, $Pwd, $To, $Subject, $Message) {
	$useragent = "Mozilla/5.0 (Windows; U; Windows NT 6.1; ru; rv:1.9.2.3) Gecko/20100401 Firefox/4.0 (.NET CLR 3.5.30729)";

	if (Login($RegId, $Pwd)) {
		$ch = curl_init();

		curl_setopt($ch, CURLOPT_USERAGENT, $useragent);
		curl_setopt($ch, CURLOPT_URL, "http://iulms.edu.pk/sic/Applications.php");
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_POST, TRUE);
		curl_setopt($ch, CURLOPT_COOKIEFILE, realpath('.') . "/cookies/" . $RegId . ".txt");
		curl_setopt($ch, CURLOPT_POSTFIELDS, "username=$RegId&password=$Pwd&to=$To&subject=$Subject&message=$Message&NewApplicationSubmit=Submit Application");
		$application_output = curl_exec($ch);

		$application_subjects = array();

		if ($application_output) {
			// parse html and get all ids and text of application subjects
			$html = str_get_html($application_output);
			$selects = $html -> find('select[name=subject]');
			for ($s = 0; $s < count($selects); $s++) {
				$select = $selects[$s];
				$options = $select -> find('option');
				for ($o = 0; $o < count($options); $o++) {
					$option = $options[$o];
					$application_subjects[count($application_subjects)] = array($option->value => $option->plaintext);
				}
			}
		}

		curl_close($ch);

		return json_encode($application_subjects);
	} else {
		return 0;
	}
}
?>