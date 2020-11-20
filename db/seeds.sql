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
        ("Venessa", "Pohl", 1, null),
        ("Michael", "Moore", 7, null),
        ("Richard", "Dobrzenieki", 3, 3),
        ("Phil", "Sebben", 8, null),
        ("Harvey", "Birdman", 4, 5);
