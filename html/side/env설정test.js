const dotenv = require("dotenv"); // npm i dotenv
dotenv.config(); // 환경실행

const test = process.env.TEST;
console.log(test);
