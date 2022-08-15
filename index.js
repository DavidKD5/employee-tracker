const mysql = require("mysql2");
const inquirer = require("inquirer");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pgadmin",
  database: "employee_db",
});

// Main menu questions
const startQues = {
  type: "list",
  name: "mainMenu",
  message: "What would you like to do?",
  choices: [
    "View All Employees",
    "Add Employee",
    "Update Employee Role",
    "View All Roles",
    "Add Role",
    "View All Departments",
    "Add Department",
  ],
};

// functions for each selection in the main menu
function init() {
  inquirer.prompt(startQues).then((response) => {
    if (response.mainMenu === "View All Employees") {
      viewEmployees();
    } else if (response.mainMenu === "Add Employee") {
      addEmployee();
    } else if (response.mainMenu === "Update Employee Role") {
      updateEmployee();
    } else if (response.mainMenu === "View All Roles") {
      viewRoles();
    } else if (response.mainMenu === "Add Role") {
      addRole();
    } else if (response.mainMenu === "View All Departments") {
      viewDepartments();
    } else if (response.mainMenu === "Add Department") {
      addDepartment();
    }
  });
}

// View all employees
function viewEmployees() {
  var query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager
FROM employee
LEFT JOIN role
ON employee.role_id = role.id
LEFT JOIN department ON department.id = role.department_id
LEFT JOIN employee manager ON manager.id = employee.manager_id`;

  db.query(query, (err, res) => {
    console.table(res);
    init();
  });
}

// view all departments
function viewDepartments() {
  var query = `SELECT * FROM department`;

  db.query(query, (err, res) => {
    console.table(res);
    init();
  });
}

// view all roles
function viewRoles() {
  var query = `SELECT role.id, role.title, department.name AS department, role.salary
    FROM role
    LEFT JOIN department ON department.id = role.department_id`;

  db.query(query, (err, res) => {
    console.table(res);
    init();
  });
}

// add new department
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "newDepartment",
        message: "What is the name of the department?",
      },
    ])
    .then((response) => {
      var query = `INSERT INTO department
  (name)
VALUES
  ('${response.newDepartment}')`;

      db.query(query, (err, res) => {
        console.log("department added");
        init();
      });
    });
}

// add new role
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "newRole",
        message: "What is the name of the role?",
      },
      {
        type: "input",
        name: "newSalary",
        message: "What is the salary of the role?",
      },
      {
        type: "list",
        name: "newDepartmentId",
        message: "Which department does the role belong to?",
        choices: ["Sales", "Engineering", "Finance", "Legal"],
      },
    ])
    .then((response) => {
      if (response.newDepartmentId == "Sales") {
        var id = 1;
      } else if (response.newDepartmentId == "Engineering") {
        var id = 2;
      } else if (response.newDepartmentId == "Finance") {
        var id = 3;
      } else if (response.newDepartmentId == "Legal") {
        var id = 4;
      }

      var query = `INSERT INTO role (title, salary, department_id)
VALUES
  ('${response.newRole}', '${response.newSalary}', '${id}')`;

      db.query(query, (err, res) => {
        console.log("role added");
        init();
      });
    });
}

// add new employee
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "newFirstName",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "newLastName",
        message: "What is the employee's last name?",
      },
      {
        type: "list",
        name: "newEmployeeRole",
        message: "What is the employee's role",
        choices: [
          "Sales Lead",
          "Salesperson",
          "Lead Engineer",
          "Software Engineer",
          "Account Manager",
          "Accountant",
          "Legal Team Lead",
        ],
      },
      {
        type: "list",
        name: "newEmployeeManager",
        message: "What is the employee's manager?",
        choices: [
          "None",
          "John Doe",
          "Mike Chan",
          "Ashley Rodriguez",
          "Kevin Tupik",
          "Kunual Singh",
          "Malia Brown",
        ],
      },
    ])
    .then((response) => {
      if (response.newEmployeeManager == "None") {
        var manager = null;
      } else if (response.newEmployeeManager == "John Doe") {
        var manager = 1;
      } else if (response.newEmployeeManager == "Mike Chan") {
        var manager = 2;
      } else if (response.newEmployeeManager == "Ashley Rodriguez") {
        var manager = 3;
      } else if (response.newEmployeeManager == "Kevin Tupik") {
        var manager = 4;
      } else if (response.newEmployeeManager == "Kunual Singh") {
        var manager = 5;
      } else if (response.newEmployeeManager == "Malia Brown") {
        var manager = 6;
      }

      if (response.newEmployeeRole == "None") {
        var employeeRole = null;
      } else if (response.newEmployeeRole == "Sales Lead") {
        var employeeRole = 1;
      } else if (response.newEmployeeRole == "Salesperson") {
        var employeeRole = 2;
      } else if (response.newEmployeeRole == "Lead Engineer") {
        var employeeRole = 3;
      } else if (response.newEmployeeRole == "Software Engineer") {
        var employeeRole = 4;
      } else if (response.newEmployeeRole == "Account Manager") {
        var employeeRole = 5;
      } else if (response.newEmployeeRole == "Accountant") {
        var employeeRole = 6;
      } else if (response.newEmployeeRole == "Legal Team Lead") {
        var employeeRole = 7;
      }

      var query = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES
  ('${response.newFirstName}', '${response.newLastName}', '${employeeRole}', '${manager}')`;

      db.query(query, (err, res) => {
        console.log("employee added");
        init();
      });
    });
}

// update employee role
function updateEmployee() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "updateEmployee",
        message: "Which employee's role do you want to update?",
        choices: [
          "John Doe",
          "Mike Chan",
          "Ashley Rodriguez",
          "Kevin Tupik",
          "Kunal Singh",
          "Malia Brown",
          "Sara Lourd",
          "Tom Allen",
        ],
      },
      {
        type: "list",
        name: "updateRole",
        message: "Which role do you want to assign the selected employee?",
        choices: [
          "Sales Lead",
          "Salesperson",
          "Lead Engineer",
          "Software Engineer",
          "Account Manager",
          "Accountant",
          "Legal Team Lead",
        ],
      },
    ])
    .then((response) => {
      if (response.updateEmployee == "Sara Lourd") {
        var id = 7;
      } else if (response.updateEmployee == "John Doe") {
        var id = 1;
      } else if (response.updateEmployee == "Mike Chan") {
        var id = 2;
      } else if (response.updateEmployee == "Ashley Rodriguez") {
        var id = 3;
      } else if (response.updateEmployee == "Kevin Tupik") {
        var id = 4;
      } else if (response.updateEmployee == "Kunual Singh") {
        var id = 5;
      } else if (response.updateEmployee == "Malia Brown") {
        var id = 6;
      } else if (response.updateEmployee == "Tom Allen") {
        var id = 8;
      }

      if (response.updateRole == "None") {
        var employeeRole = null;
      } else if (response.updateRole == "Sales Lead") {
        var employeeRole = 1;
      } else if (response.updateRole == "Salesperson") {
        var employeeRole = 2;
      } else if (response.updateRole == "Lead Engineer") {
        var employeeRole = 3;
      } else if (response.updateRole == "Software Engineer") {
        var employeeRole = 4;
      } else if (response.updateRole == "Account Manager") {
        var employeeRole = 5;
      } else if (response.updateRole == "Accountant") {
        var employeeRole = 6;
      } else if (response.updateRole == "Legal Team Lead") {
        var employeeRole = 7;
      }

      var query = `UPDATE employee SET role_id = '${employeeRole}' WHERE id = ${id}`;

      db.query(query, (err, res) => {
        console.log("employee updated");
        init();
      });
    });
}

// Initialize application
init();
