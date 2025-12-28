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
    const { mail, hashed_password, lastname, firstname, phone, is_admin, role, photo, avatar } = newUser;
    return this.database.query(
      `INSERT INTO ${this.table} (mail, hashed_password, lastname, firstname, phone, is_admin, role, photo, avatar) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [mail, hashed_password, lastname, firstname, phone, is_admin, role, photo, avatar]
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
