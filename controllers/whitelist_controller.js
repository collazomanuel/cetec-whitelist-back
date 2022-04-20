var BaseDeDatos = require("../dao/BaseDeDatos.js");

let baseDeDatos = new BaseDeDatos();


const get_whitelist = async (req, res, next) => {
    const whitelist = await baseDeDatos.get_whitelist();

    try {
        res.send(whitelist);
    } catch (error) {
        res.status(500).send(error);
    }
}

const get_user = async (req, res, next) => {

  try {
      const user = await baseDeDatos.get_user(req.query.email);
      res.send(user);
  } catch (error) {
      res.status(500).send(error);
  }
}

const add_user = async (req, res, next) => {

  try {
      const user = await baseDeDatos.add_user(req.query.name, req.query.surname, req.query.email)
      res.send(user);
  } catch (error) {
      res.status(500).send(error);
  }
}

const put_user = async (req, res, next) => {

  try {
      const user = await baseDeDatos.edit_user(req.params.id, req.query.name, req.query.surname, req.query.email);
      res.send(user);
  } catch (error) {
      res.status(500).send(error);
  }
}

const delete_user = async (req, res, next) => {
/*
  try {
      const user = await baseDeDatos.delete_user(req.params.id);

      if (!user) {
          res.status(404).send("No user found");
          return
      }
      res.status(200).send(user);
  } catch (error) {
      res.status(500).send(error);
  }
*/

  try {
      const user = await baseDeDatos.delete_user(req.params.id);
      res.send(user);
  } catch (error) {
      res.status(500).send(error);
  }
}

module.exports = {
  get_whitelist,
  get_user,
  add_user,
  put_user,
  delete_user
};
