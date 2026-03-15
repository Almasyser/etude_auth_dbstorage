const models = require("../models");
const browse = (req, res) => {
  models.files
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const read = (req, res) => {
  models.files
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
const edit = (req, res) => {
  const files = req.body;
  // TODO validations (length, format...)
  files.id = parseInt(req.params.id, 10);
  models.files
    .update(files)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const add = (req, res) => {
  const files= req.body;
  console.log("@@@@",files);
  models.files
    .insert(files)
    .then(([result]) => {
      const newId  = result.insertId;
      res.location(`/items/${result.insertId}`).status(201).send(newId); 
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const destroy = (req, res) => {
  const id = parseInt(req.params.id,10);
  models.files
    .delete(id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
