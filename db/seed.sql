use employees;

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Tom', 'Cruise', 1, NULL),
    ('Jackie', 'Chan', 2, 1),
    ('Jennifer', 'Anniston', 3, NULL),
    ('Kevin', 'Costner', 4, 3),
    ('Johnny', 'Johnson', 5, 1),
    ('Mark', 'Blumquist', 6, 2),
    ('Brian', 'Turner', 7, NULL),
    ('Arron', 'Anderson', 8, 7);
