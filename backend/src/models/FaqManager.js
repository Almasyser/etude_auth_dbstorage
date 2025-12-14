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

  delete(faq) {
    return this.database.query(`delete ${this.table} where id = ?`, [faq.id]);
  }
}

module.exports = faqManager;
