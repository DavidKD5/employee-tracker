const mysql = require("mysql2");

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

var query = `SELECT role.id, role.title, department.name AS department, role.salary 
FROM role
LEFT JOIN department ON department.id = role.department_id`;

db.query(query, (err, res) => {
  console.table(res);
});

// const startQues = {
//   type: "list",
//   name: "mainMenu",
//   message: "What would you like to do?",
//   choices: [
//     "View All Employees",
//     "Add Employee",
//     "Update Employee Role",
//     "View All Roles",
//     "Add Role",
//     "View All Departments",
//     "Add Department",
//   ],
// };

// function init() {
//   inquirer.prompt(startQues).then((response) => {

//     if (response.mainMenu === "View All Employees") {
//       viewEmployees();
//     }
//   });
// }

// THIS PART IS DONE ----------------------------------------------------------------------

// function viewEmployees() {
//   var query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager
// FROM employee
// LEFT JOIN role
// ON employee.role_id = role.id
// LEFT JOIN department ON department.id = role.department_id
// LEFT JOIN employee manager ON manager.id = employee.manager_id`;

//   db.query(query, (err, res) => {
//     console.table(res);
//   });
// }

// ------------------------------------------------------------------------------------------------------

// THIS PART IS DONE ----------------------------------------------------------------------

// function viewDepartments() {
//   var query = `SELECT * FROM department`;

//   db.query(query, (err, res) => {
//     console.table(res);
//   });
// }

// ------------------------------------------------------------------------------------------------------

// THIS PART IS DONE ----------------------------------------------------------------------

// function viewRoles() {
//   var query = `SELECT role.id, role.title, department.name AS department, role.salary
//     FROM role
//     LEFT JOIN department ON department.id = role.department_id`;

//   db.query(query, (err, res) => {
//     console.table(res);
//   });
// }

// ------------------------------------------------------------------------------------------------------
