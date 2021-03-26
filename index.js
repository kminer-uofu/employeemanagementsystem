const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
const inquirer = require("inquirer");
require("console.table");

init();

// Display logo text, load main prompts
function init() {
  const logoText = logo({ name: "Employee Manager" }).render();

  console.log(logoText);

  loadPrompts();
}
// give options for the user to choose what they would like to do

function loadPrompts() {
  inquirer
    .prompt(
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "View all Employees",
          "View all Departments",
          "View all Roles",
          "Add Employee",
          "Add Department",
          "Add Role",
          "Update Employee Role"
        ]
      })
    .then(function (answer) {

      // Call the appropriate function depending on what the user chose
      switch (answer.action) {
        case "View all Employees":
          return viewEmployees();
        case "View all Departments":
          return viewDepartments();
        case "View all Roles":
          return viewRoles();
        case "Add Employee":
          return addEmployee();
        case "Update Employee Role":
          return updateRole();
        case "Add Deparment":
          return addDepartment();
        case "Add Role":
          return addRole();
        default:
          return quit();
      }
    })
}
async function viewEmployees() {
  const employees = await db.findAllEmployees();

  console.log("\n");
  console.table(employees);
  console.log("\n");

  loadPrompts();
}
// this function was taken from the main solution
async function viewDepartments() {
  const employees = await db.findAllDpts();

  // const dptChoices = dpts.map(({ id, name }) => ({
  //   name: name,
  //   value: id
  // }));

  // const { dptId } = await prompt([
  //   {
  //     type: "list",
  //     name: "dptId",
  //     message: "Which department would you like to see employees for?",
  //     choices: dptChoices
  //   }
  // ]);

  // const employees = await db.findAllEmployeesByDepartment(dpts);

  console.log("\n");
  console.table(employees);
  console.log("\n");

  loadPrompts();
}

async function viewManagers() {
  const mgrs = await db.findAllEmployees();

  const mgrChoices = mgrs.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const { mgrId } = await prompt([
    {
      type: "list",
      name: "mgrId",
      message: "Which employee do you want to see their manager?",
      choices: mgrChoices
    }
  ]);

  const employees = await db.findAllEmployeesByManager(mgrId);

  console.log("\n");

  if (employees.length === 0) {
    console.log("The selected employee has no manager");
  } else {
    console.table(emps);
  }

  console.log("/n");
  loadPrompts();
}

async function removeEmployee() {
  const employees = await db.findAllEmployees();

  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const { employeeId } = await prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Which employee do you want to remove?",
      choices: employeeChoices
    }
  ]);

  await db.removeEmployee(employeeId);

  console.log("Removed employee from the database");

  loadPrompts();
}

async function updateEmployeeRole() {
  const employees = await db.findAllEmployees();

  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const { employeeId } = await prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Which employee's role do you want to update?",
      choices: employeeChoices
    }
  ]);

  const roles = await db.findAllRoles();

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }));

  const { roleId } = await prompt([
    {
      type: "list",
      name: "roleId",
      message: "Which role do you want to assign the selected employee?",
      choices: roleChoices
    }
  ]);

  await db.updateEmployeeRole(employeeId, roleId);

  console.log("Updated employee's role");

  loadPrompts();
}

async function updateEmployeeManager() {
  const employees = await db.findAllEmployees();

  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const { employeeId } = await prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Which employee's manager do you want to update?",
      choices: employeeChoices
    }
  ]);

  const managers = await db.findAllPossibleManagers(employeeId);

  const managerChoices = managers.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const { managerId } = await prompt([
    {
      type: "list",
      name: "managerId",
      message:
        "Which employee do you want to set as manager for the selected employee?",
      choices: managerChoices
    }
  ]);

  await db.updateEmployeeManager(employeeId, managerId);

  console.log("Updated employee's manager");

  loadPrompts();
}

async function viewRoles() {
  const roles = await db.findAllRoles();

  console.log("\n");
  console.table(roles);

  loadPrompts();
}

async function addRole() {
  const departments = await db.findAllDepartments();

  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id
  }));

  const role = await prompt([
    {
      name: "title",
      message: "What is the name of the role?"
    },
    {
      name: "salary",
      message: "What is the salary of the role?"
    },
    {
      type: "list",
      name: "department_id",
      message: "Which department does the role belong to?",
      choices: departmentChoices
    }
  ]);

  await db.createRole(role);

  console.log(`Added ${role.title} to the database`);

  loadPrompts();
}

async function removeRole() {
  const roles = await db.findAllRoles();

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }));

  const { roleId } = await prompt([
    {
      type: "list",
      name: "roleId",
      message:
        "Which role do you want to remove? (Warning: This will also remove employees)",
      choices: roleChoices
    }
  ]);

  await db.removeRole(roleId);

  console.log("Removed role from the database");

  loadPrompts();
}

async function viewDepartments() {
  const departments = await db.findAllDepartments();

  console.log("\n");
  console.table(departments);

  loadPrompts();
}

async function addDepartment() {
  const department = await prompt([
    {
      name: "name",
      message: "What is the name of the department?"
    }
  ]);

  await db.createDepartment(department);

  console.log(`Added ${department.name} to the database`);

  loadPrompts();
}

async function removeDepartment() {
  const departments = await db.findAllDepartments();

  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id
  }));

  const { departmentId } = await prompt({
    type: "list",
    name: "departmentId",
    message:
      "Which department would you like to remove? (Warning: This will also remove associated roles and employees)",
    choices: departmentChoices
  });

  await db.removeDepartment(departmentId);

  console.log(`Removed department from the database `);

  loadPrompts();
}

async function addEmployee() {
  const roles = await db.findAllRoles();
  const employees = await db.findAllEmployees();

  const employee = await prompt([
    {
      name: "first_name",
      message: "What is the employee's first name?"
    },
    {
      name: "last_name",
      message: "What is the employee's last name?"
    }
  ]);

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }));

  const { roleId } = await prompt({
    type: "list",
    name: "roleId",
    message: "What is the employee's role?",
    choices: roleChoices
  });

  employee.role_id = roleId;

  const managerChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));
  managerChoices.unshift({ name: "None", value: null });

  const { managerId } = await prompt({
    type: "list",
    name: "managerId",
    message: "Who is the employee's manager?",
    choices: managerChoices
  });

  employee.manager_id = managerId;

  await db.createEmployee(employee);

  console.log(
    `Added ${employee.first_name} ${employee.last_name} to the database`
  );

  loadPrompts();
}

function quit() {
  console.log("Thank you for coming in. Have a great week!");
  process.exit();
}
