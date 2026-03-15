
const AbstractManager = require("./AbstractManager");

class upLoadManager extends AbstractManager {
  constructor() {
    super({ table: "files" });
  }

  insert(files) {
    console.log("####",files);
    
    return this.database.query(
      // `insert into ${this.table} (name, path) values (?, ?)`,
      // [files.name, files.path]
    );
  }
}

module.exports = upLoadManager;