
const AbstractManager = require("./AbstractManager");

class upLoadManager extends AbstractManager {
  constructor() {
    super({ table: "files" });
  }

  insert(files) {
    const {name, path} = files;
    console.log("####",name, path);
    return this.database.query(
      `INSERT INTO ${this.table} (name, path) VALUES (?,?)`,
      [files.name, files.path]
    );
  }
}

module.exports = upLoadManager;