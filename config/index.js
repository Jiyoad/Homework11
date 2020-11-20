const connection = require('./connection.js');

class Database {
    constructor(connection) {
        this.connection = connection;
    }
    viewAllEmployees() {
        return this.connection.query(
            // Selecting the employee table and chaining the role
            // department tables through the left join
            `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
            FROM employee
            LEFT JOIN role ON employee.role_id = role.id
            LEFT JOIN department ON role.department_id = department.id
            LEFT JOIN employee manager ON manager.id = employee.manager_id; 
            `
        );
    };

    viewAllDepartments() {
        return this.connection.query(
            // Selecting the department table and chaining the role
            // department tables through the left join
            `SELECT * FROM department;`
        )
    };

    viewManagers() {
        return this.connection.query(
            // Selecting the department table and chaining the role
            // department tables through the left join
            `SELECT first_name, last_name, role.title 
            FROM employee 
            LEFT JOIN role ON employee.role_id = role.id 
            WHERE manager_id IS NULL;`
        );
    };


    insertEmployee(employee) {
        return this.connection.query(
            `INSERT INTO employee SET ?`,
            employee
        );
    };

    allEmployees() {
        return this.connection.query("SELECT * FROM employee");
    };

    addEmployees(first_name, last_name, role_id, manager_id) {
        return this.connection.query("INSERT INTO employee SET ?", {
            first_name: first_name,
            last_name: last_name,
            role_id: role_id,
            manager_id: manager_id
        });
    };

    allRoles() {
        return this.connection.query("SELECT id, title FROM role");
    };

    updateEmployeeRole(role_id, id) {
        return this.connection.query(
          `UPDATE employee
            SET role_id = ? 
            WHERE id = ?;`,
          [role_id, id]
        );
    };

    updateEmployeeRole(role_id, id) {
        return this.connection.query(
            `UPDATE employee SET role_id = ? WHERE id = ?;`,
            [role_id, id]
        );
    };

    deleteEmployee(id){
        return this.connection.query(
            `DELETE FROM employee WHERE id = ?;`,
            [id]
            );
    };

    employeeByDept(departmentId) {
        return this.connection.query(
            `Select employee.id, employee.first_name, employee.last_name, role.title
            FROM employee
            LEFT JOIN role ON employee.role_id = role.id
            LEFT JOIN department on role.department_id = department.id WHERE department.id = ?`,
            departmentId
        )
    };
}


module.exports = new Database(connection);