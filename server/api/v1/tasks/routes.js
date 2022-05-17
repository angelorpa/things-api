const express = require("express");
// eslint-disable-next-line
const router = express.Router();
const controller = require("./controller");
const { sanatizers } = require("./model");

/*
 * /api/v1/tasks     POST   Create
 * /api/v1/tasks     GET    Read all
 * /api/v1/tasks/:id GET    Read
 * /api/v1/tasks/:id PUT    Update
 * /api/v1/tasks/:id DELETE Delete
 */

router.route("/").get(controller.all).post(sanatizers, controller.create);

router.param("id", controller.id);

router
  .route("/:id")
  .get(controller.read)
  .patch(sanatizers, controller.update)
  .put(sanatizers, controller.update)
  .delete(controller.delete);

module.exports = router;
