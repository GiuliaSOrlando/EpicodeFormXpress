const faker = require("faker");
let database = { users: [] };
const threshold = 40;

for (let i = 0; i < threshold; i++) {
  database.users.push({
    username: faker.internet.userName(),
    password: faker.internet.password(),
  });
}

console.log(JSON.stringify(database));
