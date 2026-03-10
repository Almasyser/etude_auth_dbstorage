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
    
    console.log("---------------------------------------------------------");
    console.log(mail,typeof(mail));
    console.log(hashed_password,typeof(hashed_password));
    console.log(lastname, typeof(lastname));
    console.log(firstname, typeof(firstname));
    console.log(phone, typeof(phone));
    console.log(is_admin, typeof(is_admin));
    console.log(role, typeof(role));
    console.log(photo, typeof(photo));
    console.log(avatar, typeof(avatar));
   
    return this.database.query(
      `INSERT INTO ${this.table} 
      (mail, hashed_password, lastname, firstname, phone, is_admin, role, photo, avatar) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
