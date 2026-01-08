const models = require("../models");

const authenticationCheck = (req, res, next) => {
  const { mail } = req.body;
  models.user
    .getUserByMail(mail)
    .then(([users]) => {
      if (users[0] != null) {
        [req.user] = users;
        next();
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};
const read = (req, res) => {
  models.user
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const browse = (req, res) => {
  models.user
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const addUser = (req, res) => {
  const newUser = req.body;
  models.user
    .insert(newUser)
    .then(([result]) => {
      const newId  = result.insertId;
      res.send(newId);
      if (result.affectedRows !== 0) {
        res.status(204);
        console.log("user created with sucess",newId);
      } else {
        res.status(404).send("User not created");
      }
    })
    .catch(() => {
      res.status(500).send("Error while creating user");
    });
};

const modifyUser = (req, res) => {
  const { id } = req.params;
  const keys = Object.keys(req.body);
  const values = Object.values(req.body);
  const valueQuery = keys.map((key) => `${key} = ?`).join(", ");
  models.user
    .update(values, valueQuery, id)
    .then(([result]) => {
      if (result.affectedRows !== 0) {
        res.sendStatus(204);
      } else {
        res.status(404).send("User not found...");
      }
    })
    .catch(() => {
      res.status(500).send("Error while updating user");
    });
};

const destroyUser = (req, res) => {
  console.log(req.params);
  models.user
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
        console.log("user deleted");
        
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  authenticationCheck,
  addUser,
  modifyUser,
  destroyUser,
  browse,
  read,
};
