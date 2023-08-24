const repl = require("repl");
const db = require("./models");

const replServer = repl.start({
  prompt: "job-app-tracker > "
});

for (let modelName in db) {
  replServer.context[modelName] = db[modelName];
}

// a function to take the return value of `findAll()` 
// and convert it to an array of objects
function asArray(collection) {
  return Array.from(collection).map(record => record.get({ plain: true }))
}

function asObject(record) {
  return record.get({ plain: true })
}
replServer.context.asArray = asArray;
replServer.context.asObject = asObject;