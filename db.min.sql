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