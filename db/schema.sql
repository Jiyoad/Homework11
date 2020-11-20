DROP DATABASE if EXISTS employee_tracker_DB;

CREATE DATABASE employee_tracker_DB;

USE employee_tracker_DB;

CREATE TABLE department
(
	id int NOT NULL AUTO_INCREMENT,
    name varchar(30) not null,
    PRIMARY KEY (id)
);

CREATE TABLE role
(
	id int NOT NULL AUTO_INCREMENT,
    title varchar(30) not null,
    salary decimal(10, 2),
    department_id int,
    PRIMARY KEY (id),
    foreign key (department_id) references department(id)
);

CREATE TABLE employee
(
	id int NOT NULL AUTO_INCREMENT,
	first_name varchar(30) NOT NULL,
    last_name varchar(30) NOT NULL,
    role_id int not null,
    manager_id int,
	PRIMARY KEY (id),
    foreign key (role_id) references role(id),
    foreign key (manager_id) references employee (id)
);

INSERT INTO department (name)
VALUES  ("Sales"),
        ("Engineering"),
        ("Finance"),
        ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES  ("Salesperson", 45000.00, 1),
        ("Engineer", 50000.00, 2),
        ("Accountant", 55000.00, 3),
        ("Lawyer", 60000.00, 4),
        ("Sales Lead", 65000.00, 1),
        ("Lead Engineer", 70000.00, 2),
        ("Account Manager", 75000.00, 3),
        ("Legal Team Lead", 80000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Joe", "Pohl", 6, null),
        ("Venessa", "Pohl", 1, 1),
        ("Michael", "Moore", 7, null),
        ("Richard", "Dobrzenieki", 3, 3),
        ("Phil", "Sebben", 8, null),
        ("Harvey", "Birdman", 4, 5);

        
        

        