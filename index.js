const mysql = require("mysql2");
const inquirer = require("inquirer");

const db = mysql.createConnection(
  {
    host: "localhost",
    // Your MySQL username,
    user: "root",
    // Your MySQL password
    password: "pgadmin",
    database: "employee_db",
  },
  console.log("connected to the matrix")
);

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

function init() {
  inquirer.prompt(startQues).then((response) => {
    if (response.mainMenu === "View All Employees") {
      viewEmployees();
    } else if (response.mainMenu === "Add Employee") {
      addEmployee();
    } else if (response.mainMenu === "Update Employee Role") {
      viewEmployees();
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

function viewEmployees() {
  var query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager
FROM employee
LEFT JOIN role
ON employee.role_id = role.id
LEFT JOIN department ON department.id = role.department_id
LEFT JOIN employee manager ON manager.id = employee.manager_id`;

  db.query(query, (err, res) => {
    console.table(res);
  });

  init();
}

function viewDepartments() {
  var query = `SELECT * FROM department`;

  db.query(query, (err, res) => {
    console.table(res);
  });

  init();
}

function viewRoles() {
  var query = `SELECT role.id, role.title, department.name AS department, role.salary
    FROM role
    LEFT JOIN department ON department.id = role.department_id`;

  db.query(query, (err, res) => {
    console.table(res);
  });

  init();
}

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
  ('${response.newDepartment}'),`;

      db.query(query, (err, res) => {
        console.log("department added");
      });
    });
  init();
}

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
  ('${response.newRole}', '${response.newSalary}', '${id}'),`;

      db.query(query, (err, res) => {
        console.log("role added");
      });
    });
  init();
}

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
        var employeeRole = 6;
      }

      var query = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES
  ('${response.newFirstName}', '${response.newLastName}', '${employeeRole}', '${manager}'),`;

      db.query(query, (err, res) => {
        console.log("employee added");
      });
    });
  init();
}
init();
