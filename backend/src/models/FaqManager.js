const AbstractManager = require("./AbstractManager");

class faqManager extends AbstractManager {
  constructor() {
    super({ table: "faq" });
  }

  insert(faq) {
    return this.database.query(
      `insert into ${this.table} (question, answer) values (?,?)`,
      [faq.question, faq.answer]
    );
  }
}

module.exports = faqManager;
