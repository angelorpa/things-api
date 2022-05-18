const express = require("express");
// eslint-disable-next-line
const router = express.Router();
const controller = require("./controller");
const { auth, owner, me } = require("../auth");
const { sanatizers } = require("./model");

/*
 * /api/v1/tasks     POST   Create
 * /api/v1/tasks     GET    Read all
 * /api/v1/tasks/:id GET    Read
 * /api/v1/tasks/:id PUT    Update
 * /api/v1/tasks/:id DELETE Delete
 */

router
  .route("/")
  .get(auth, controller.author)
  .post(auth, sanatizers, controller.create);

router.param("id", controller.id);

router
  .route("/:id")
  .get(auth, owner, controller.read)
  .patch(auth, owner, sanatizers, controller.update)
  .put(auth, owner, sanatizers, controller.update)
  .delete(auth, owner, controller.delete);

module.exports = router;
