const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  getUserByMail(mail) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE mail = ?`, [
      mail,
    ]);
  }

  insert(newUser) {
    // eslint-disable-next-line camelcase
    const { mail, hashedPassword, lastname, firstname, phone, isAdmin } = newUser;
    return this.database.query(
      `insert into ${this.table} (mail, hashed_password, lastname, firstname, phone, is_admin) values (?, ?, ?, ?, ?, ?)`,
      // eslint-disable-next-line camelcase
      [mail, hashedPassword, lastname, firstname, phone, isAdmin]
    );
  }

  update(values, valueQuery, id) {
    return this.database.query(
      `update ${this.table} set ${valueQuery} where id = ?`,
      [...values, id]
    );
  }
}

module.exports = UserManager;
