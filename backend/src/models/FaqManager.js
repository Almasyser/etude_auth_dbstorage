const AbstractManager = require("./AbstractManager");

class faqManager extends AbstractManager {
  constructor() {
    super({ table: "faq" });
  }

  insert(faq) {
    return this.database.query(
      `insert into ${this.table} (question, answer, author) values (?,?,?)`,
      [faq.question, faq.answer, faq.author]
    );
  }
}

module.exports = faqManager;
