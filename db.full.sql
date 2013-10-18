DROP DATABASE IF EXISTS iulms;
CREATE DATABASE iulms;
use "iulms";

CREATE TABLE users (
    user_id VARCHAR(11) NOT NULL PRIMARY KEY,
    password VARCHAR(20) NOT NULL,
    first_login TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NOT NULL,
    last_login_status VARCHAR(25) NOT NULL, -- success | failure
    active INT NOT NULL DEFAULT 1
);

CREATE TABLE profile (
    user_id VARCHAR(11) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    last_updated TIMESTAMP NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE news (
    headline VARCHAR(250) NOT NULL,
    source_url VARCHAR(1000) NOT NULL,
    publish_date TIMESTAMP NOT NULL
);

CREATE TABLE schedule (
    user_id VARCHAR(11) NOT NULL,
    semester VARCHAR(50) NOT NULL,
    course_id VARCHAR(50),
    course_name VARCHAR(100) NOT NULL,
    faculty_id VARCHAR(50),
    faculty_name VARCHAR(100),
    room VARCHAR(50),
    time VARCHAR(50),
    day VARCHAR(50),
    FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE attendance (
    user_id VARCHAR(11) NOT NULL,
    semester VARCHAR(50) NOT NULL,
    course_id VARCHAR(50),
    course_name VARCHAR(100) NOT NULL,
    sessions INT NOT NULL DEFAULT 0,
    presents INT NOT NULL DEFAULT 0,
    absents INT NOT NULL DEFAULT 0,
    last_updated TIMESTAMP NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE transcript (
    id BIGINT NOT NULL PRIMARY KEY,
    user_id VARCHAR(11) NOT NULL,
    degree_name VARCHAR(100) NOT NULL,
    degree_slug VARCHAR(100),
    complete_cgpa FLOAT(3, 2) UNSIGNED ZEROFILL,
    positive_cgpa FLOAT(3, 2) UNSIGNED ZEROFILL,
    FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE transcript_courses (
    tid BIGINT NOT NULL,
    semester VARCHAR(50) NOT NULL,
    course_id VARCHAR(50),
    course_name VARCHAR(100) NOT NULL,
    gpa FLOAT(3, 2) NOT NULL,
    grade VARCHAR(2) NOT NULL,
    hours INT NOT NULL,
    FOREIGN KEY(tid) REFERENCES transcript(id) ON DELETE CASCADE
);