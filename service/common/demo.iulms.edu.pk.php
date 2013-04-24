<?php
require ("Utility.php");
require ("simple_html_dom.php");

/**
 * It logins the user with his/her reg. id and password. after login save the session cookie in a file named with user reg id
 * @param RegId student IULMS registration id
 * @param Pwd student IULMS password
 */
function Login($RegId, $Pwd) {
	return json_encode(array("success" => "true"));
}

/**
 * It gets user info after getting user login via Login function
 * @param RegId student IULMS registration id
 * @param Pwd student IULMS password 
 */
function getProfile($RegId, $Pwd) {
	$profile_info = array(
		"reg_id" => "10512", 
		"first_name" => "Umair", 
		"last_name" => "Ashraf", 
		"email" => "umr.ashrf@gmail.com"
	);
	return json_encode($profile_info);
}

/**
 * It gets user attendance after getting user login via Login function
 * @param RegId student IULMS registration id
 * @param Pwd student IULMS password 
 */
function getAttendance($RegId, $Pwd) {
	$attendance = array(
		array(
			"semester" => "Spring 2013", 
			"course_id" => "123456789",
			"course_name" => "Computer Programming", 
			"sessions" => "10",
			"presents" => "8",
			"absents" => "2"
		)
	);
	return json_encode($attendance);
}

/**
 * It gets user schedule after getting user login via Login function
 * @param RegId student IULMS registration id
 * @param Pwd student IULMS password 
 */
function getSemesterSchedule($RegId, $Pwd) {
	$schedule = array(
		array(
			"secCourseCode" => "98765",
			"courseId" => "123456789",
			"courseName" => "Computer Programming",
			"facultyName" => "Basit Hasan",
			"day" => "WED",
			"time" => "3 PM - 6 PM",
			"hours" => "3",
			"location" => "LAB-4",
			"today" => date("d-m-Y"),
			"sessionNo" => "10"
		)
	);
	return json_encode($schedule);
}

/**
 * It gets user transcript after getting user login via Login function
 * @param RegId student IULMS registration id
 * @param Pwd student IULMS password 
 */
function getTranscript($RegId, $Pwd) {
	$transcript = array(
		"attemptedCourses" => array(
			array(
				"crsCode" => "987654321",
				"crsTitle" => "E-Business",
				"crsHours" => "3",
				"crsGrade" => "C",
				"semNo" => "1",
				"semName" => "Spring 2012",
				"gpa" => "2.0"
			)
		),
		"degree" => array(
			"slug" => "bs_cs",
			"name" => "Bachelors of Computer Science"
		),
		"cgpa" => "2.0"
	);
	return json_encode($transcript);
}

/**
 * It gets user submitted applications after getting user login via Login function
 * @param RegId student IULMS registration id
 * @param Pwd student IULMS password 
 */
function getApplications($RegId, $Pwd) {
}

/**
 * It gets application subjects after getting user login via Login function
 * @param RegId student IULMS registration id
 * @param Pwd student IULMS password 
 */
function getApplicationSubjects($RegId, $Pwd) {
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
}
?>