const { prompt } = require("inquirer");
const inquirer = require("inquirer");
const Database = require("./config");

async function runSearch() {
  inquirer.prompt({
    name: "choice",
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View All Employees",
      "View All Departments",
      "View All Employees by Manager",
      "Add Employee",
      "Remove Employee",
      "Update Employee Role",
      "Quit"
    ]
  })
    .then(function (answer) {
      switch (answer.choice) {
        case "View All Employees":
          return viewEmployees();

        case "View All Departments":
          return viewDepartments();

        case "View All Employees by Manager":
          return viewManagers();

        case "Add Employee":
          return addEmployee();

        case "Remove Employee":
          return removeEmployee();

        case "Update Employee Role":
          return updateRole();

        case "Quit":
          Database.connection.end();
          break;

        default:
          Database.connection.end();
          break;
      }
    });
}

async function viewEmployees() {
  const employees = await Database.viewAllEmployees();
  console.table(employees);
  runSearch();
}

async function viewManagers() {
  const managers = await Database.viewManagers();
  console.table(managers);

  runSearch();
}

async function viewDepartments() {
  const departments = await Database.viewAllDepartments();
  console.table(departments);
  runSearch();
}
//--------------------------ADD EMPLOYEE--------------------------\\
async function addEmployee() {
  const roles = await Database.allRoles();

  const allRoles = roles.map(save => {
    return save.title;
  });

  const employee = await Database.allEmployees();

  const allEmployees = employee.map(save => {
    return save.first_name.concat(" " + save.last_name);
  });

  allEmployees.push("null");

  const user = await inquirer.prompt([
    { name: "firstName", type: "input", message: "What is the employee's first name?" },
    { name: "lastName", type: "input", message: "What is the employee's last name?" },
    { name: "role", type: "list", message: "What is the employee's role?", choices: allRoles },
    { name: "manager", type: "list", message: "What is their manager's name?", choices: allEmployees }
  ]);
  let managerId;
  if (user.manager !== "null") {
    const manager = employee.find(
      resultEntry => user.manager === `${resultEntry.first_name} ${resultEntry.last_name}`
    );
    managerId = manager.id;
  }
  const role = roles.find(
    resultEntry => resultEntry.title === user.role
  );
  const roleId = role.id;
  await Database.addEmployees(user.firstName, user.lastName, roleId, managerId);

  console.log(`Added ${user.firstName}!`)
  runSearch();
}
//--------------------------UPDATE ROLE TITLE--------------------------\\
async function updateRole(){
  const employee = await Database.allEmployees();

  const allEmployees = employee.map(save => {
    return save.first_name.concat(" " + save.last_name);
  });
const roles = await Database.allRoles();
const allRoles = roles.map(save => {
    return save.title;
});
const answer = await inquirer.prompt([
  { name: "name",
    type: "list",
    message: "Which employee would you like to update?",
    choices: allEmployees},
  { name: "role",
    type: "list",
    message: "What is the employee's updated role?",
    choices: allRoles}
]);

const employeeChoice = employee.find(
  response =>
    answer.name === `${response.first_name} ${response.last_name}`
);

const employeeId = employeeChoice.id;

const roleRecord = roles.find(
  response => response.title === answer.role
);
const roleId = roleRecord.id;

await Database.updateEmployeeRole(roleId, employeeId);

console.log(`Updated ${answer.name}'s position.`);
runSearch();
}

async function removeEmployee(){
  const employee = await Database.allEmployees();

  const allEmployees = employee.map(save => {
    return save.first_name.concat(" " + save.last_name);
  });
  const answer = await inquirer.prompt([
    { name: "name",
      type: "list",
      message: "Which employee would you like to update?",
      choices: allEmployees}
  ]);
  const employeeChoice = employee.find(
    response =>
      answer.name === `${response.first_name} ${response.last_name}`
  );
  const employeeId = employeeChoice.id;
  
  await Database.deleteEmployee(employeeId);
  console.log(`Removed ${answer.name} from the database.`);
  runSearch();
}

runSearch();
